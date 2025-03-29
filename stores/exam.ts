import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { ExamStatus, type AnswerChoiceRequest, type ExamResponse, type Question, type UserExamBaseRequest } from "~/auto_api/models";
import { QuestionSectionEnum } from "~/constants/enum";
import { Storage } from '@capacitor/storage';

export const useExamStore = defineStore("exam", () => {
  const currentExam = ref<ExamResponse | null>(null);
  const currentSection = ref<QuestionSectionEnum>(
    QuestionSectionEnum.Listening
  );
  const currentPart = ref<number>(1);
  const timeRemaining = ref(7200);
  const currentQuestionIndex = ref(0);
  const examSubmitted = ref(false);
  const answers = ref<Record<number, string>>({});
  const userExamId = ref<number | null>(null);

  const saveAnswer = async (questionId: number, section: number, optionLabel: string) => {
    answers.value[questionId] = optionLabel;
    const answerData = JSON.stringify({ section, optionLabel });
    await Storage.set({
      key: `answer_${questionId}`,
      value: answerData,
    })
  }
  const getAnswer = async (questionId: number) => {
    if (answers.value[questionId]) return answers.value[questionId]
    const result = await Storage.get({ key: `answer_${questionId}` })
    if (result.value) {
      const { optionLabel } = JSON.parse(result.value);
      return optionLabel;
    }
    return "";
  }

  const listeningQuestion = computed<Question[]>(() => {
    return (
      (currentExam.value?.examQuestion
        ?.map((q) => q.question)
        .filter(
          (q) => q && (q.section as number) === QuestionSectionEnum.Listening
        ) as Question[]) || []
    );
  });

  const readingQuestion = computed<Question[]>(() => {
    return (
      (currentExam.value?.examQuestion
        ?.map((q) => q.question)
        .filter(
          (q) => q && (q.section as number) === QuestionSectionEnum.Reading
        ) as Question[]) || []
    );
  });

  //call api get data exam
  const fetchExam = async (examId: number) => {
    if (!examId || isNaN(examId)) {
      console.error("❌ fetchExam nhận examId không hợp lệ:", examId);
      return;
    }
    try {
      const response = await examApiUtil.apiExamExamStartExamIdGet(examId);
      if (response.data.examQuestion) {
        resetExamState();
        currentExam.value = response.data;
      } else {
        console.error("❌ Không tìm thấy bài thi", response.data);
      }
    } catch (error) {
      console.error("❌ Lỗi API:", error);
    }
  };

  const postUserExam = async (userId: number, examId: number) => {
    try {
      if (!userId || !examId) {
        console.warn("Thiếu userId hoặc examId, không thể tạo bài thi!");
        return;
      }
      const request: UserExamBaseRequest = {
        userId: userId,
        examId: examId,
        status: ExamStatus.NUMBER_1,
      };
      const response = await examApiUtil.apiExamUserExamStartPost(request);
      if (response && typeof response.data === "number") {
        console.log("Bài thi được tạo thành công, ID:", response.data);
        userExamId.value = response.data;
        return response.data;
      } else {
        console.warn("Response không phải số:", response);
      }
    } catch (error) {
      console.error("Lỗi khi tạo bài thi cho người dùng", error);
    }
  };


  const setSection = (section: QuestionSectionEnum) => {
    currentSection.value = section;
  };
  const toggleSection = () => {
    currentSection.value =
      currentSection.value === QuestionSectionEnum.Listening
        ? QuestionSectionEnum.Reading
        : QuestionSectionEnum.Listening;
  };
  const updateTime = () => {
    timeRemaining.value -= 1;
  };

  const setQuestionIndex = (index: number) => {
    currentQuestionIndex.value = index;
  };

  const submitExam = async (userExamId: number, userId: number) => {
    try {
      examSubmitted.value = true;
      const answerChoice: AnswerChoiceRequest[] = [];
      console.log("dữ liệu khai báo: ", answerChoice);
      // Kết hợp câu hỏi từ cả hai phần
      const allQuestions = [...listeningQuestion.value, ...readingQuestion.value];
      // Lấy tất cả các câu trả lời từ Storage
      for (const question of allQuestions) {
        try {
          const result = await Storage.get({ key: `answer_${question.id}` });
          let optionLabel = ""; // Mặc định rỗng nếu không có dữ liệu
          let section = question.section; // Sử dụng section từ câu hỏi nếu không có trong kết quả
      
          if (result.value) {
            console.log("📌 result trước khi parse: ", result.value);
            
            try {
              const parsedResult = JSON.parse(result.value);
              
              // Sử dụng nullish coalescing để lấy giá trị
              section = parsedResult.section ?? question.section; 
              optionLabel = parsedResult.answer ?? ""; 
      
              console.log("section, optionLabel sau khi parse: ", section, optionLabel);
            } catch (parseError) {
              console.error("Lỗi khi parse JSON:", parseError);
              // Tiếp tục sử dụng giá trị mặc định đã thiết lập ở trên
            }
          } else {
            console.log(`⚠️ Câu ${question.id} không có dữ liệu, gửi lên với optionLabel rỗng.`);
          }
          
          // Thêm câu trả lời vào mảng answerChoice
          answerChoice.push({ 
            questionId: question.id, 
            section: section, 
            optionLabel: optionLabel 
          });
        } catch (storageError) {
          console.error(`Lỗi khi đọc Storage cho câu hỏi ${question.id}:`, storageError);
          // Thêm câu trả lời trống nếu có lỗi
          answerChoice.push({ 
            questionId: question.id, 
            section: question.section, 
            optionLabel: "" 
          });
        }
      }
      
      // Kiểm tra userExamId
      if (!userExamId) {
        throw new Error("userExamId is null or undefined");
      }
      
      // Gửi dữ liệu lên server
      console.log("dữ liệu chuẩn bị đẩy lên server: ", answerChoice);
      await examApiUtil.apiExamUserAnswerUserExamIdPost(userExamId, {
        userId,
        answerChoice,
      });
      
      console.log("Đáp án đã gửi thành công, xoá Storage");
      // Xóa dữ liệu từ Storage sau khi gửi thành công
      for (const question of allQuestions) {
        try {
          await Storage.remove({ key: `answer_${question.id}` });
        } catch (removeError) {
          console.error(`Lỗi khi xóa Storage cho câu hỏi ${question.id}:`, removeError);
        }
      }
    } catch (error) {
      console.error("Lỗi khi nộp bài: ", error);
      // Đặt lại trạng thái examSubmitted nếu có lỗi
      examSubmitted.value = false;
      throw error; 
    }
  };

  const resetExamState = () => {
    currentSection.value = QuestionSectionEnum.Listening;
    currentPart.value = 1;
    timeRemaining.value = 7200;
    answers.value = {};
    currentQuestionIndex.value = 0;
    examSubmitted.value = false;
  };

  return {
    currentExam,
    currentSection,
    timeRemaining,
    currentQuestionIndex,
    examSubmitted,
    readingQuestion,
    listeningQuestion,
    answers,
    userExamId,
    setSection,
    fetchExam,
    toggleSection,
    updateTime,
    setQuestionIndex,
    saveAnswer,
    getAnswer,
    submitExam,
    postUserExam,
  };
});
