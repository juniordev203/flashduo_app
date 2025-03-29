import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { ExamStatus, type AnswerChoiceRequest, type ExamResponse, type Question, type UserExamBaseRequest } from "~/auto_api/models";
import { QuestionSectionEnum } from "~/constants/enum";
import { Storage } from '@capacitor/storage';

export const useExamStore = defineStore("exam", () => {
  const userInfo = useMyBaseStore();
  const userId = computed(() => userInfo.$state.userInfo?.id);
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
  // const postUserExam = async () => {
  //   try {
  //     if (!userId.value || !currentExam.value?.id) {
  //       console.warn("Thiếu userId hoặc examId, không thể tạo bài thi!");
  //       return;
  //     }
  //     const request: UserExamBaseRequest = {
  //       userId: userId.value,
  //       examId: currentExam.value?.id,
  //       status: ExamStatus.NUMBER_1,
  //     }
  //     const response = await examApiUtil.apiExamUserExamStartPost(request);
  //     if (typeof response === "number") {
  //       console.log("Bài thi được tạo thành công", response);
  //       userExamId.value = response;
  //       return response;
  //     } else {
  //       console.warn("Lỗi khi tạo bài thi cho người dùng");
  //     } 
  //   } catch (error) {
  //     console.error("Lỗi khi tạo bài thi cho người dùng", error);
  //   }
  // }

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

  const submitExam = async (examId: number, userId: number) => {
    examSubmitted.value = true;
    const answerChoice: AnswerChoiceRequest[] = [];

    for (const question of [...listeningQuestion.value, ...readingQuestion.value]) {
      const result = await Storage.get({ key: `answer_${question.id}` });
      if (result.value) {
        const { section, optionLabel } = JSON.parse(result.value);
        answerChoice.push({
          questionId: question.id,
          section,
          optionLabel,
        });
      }
    }
    try {
      if (userExamId.value != null) {
        await examApiUtil.apiExamUserAnswerUserExamIdPost(userExamId.value, {
          userId,
          answerChoice,
        });
      }
    } catch (error) {
      console.log("Lỗi khi nộp bài: ", error);
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
    setSection,
    fetchExam,
    toggleSection,
    updateTime,
    setQuestionIndex,
    saveAnswer,
    getAnswer,
    submitExam,
    // postUserExam,
  };
});
