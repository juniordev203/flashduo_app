import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { type ExamResponse, type Question } from "~/auto_api/models";
import { QuestionSectionEnum } from "~/constants/enum";
import type { Exam, ExamState } from "~/types/exam.types";

export const useExamStore = defineStore("exam", () => {
  const currentExam = ref<ExamResponse | null>(null);
  const currentSection = ref<QuestionSectionEnum>(
    QuestionSectionEnum.Listening
  );
  const currentPart = ref<number>(1);
  const timeRemaining = ref(7200);
  const answers = ref<Record<number, string>>({});
  const currentQuestionIndex = ref(0);
  const examSubmitted = ref(false);

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

  const setSection = (Reading?: QuestionSectionEnum) => {
    currentSection.value =
      currentSection.value === QuestionSectionEnum.Listening
        ? QuestionSectionEnum.Reading
        : QuestionSectionEnum.Listening;
  };

  const updateTime = () => {
    timeRemaining.value -= 1;
  };

  const saveAnswer = (questionId: number, answer: string) => {
    answers.value[questionId] = answer;
  };

  const setQuestionIndex = (index: number) => {
    currentQuestionIndex.value = index;
  };

  const submitExam = () => {
    examSubmitted.value = true;
    return {
      answers: answers.value,
      examId: currentExam.value?.id,
      timeUsed: 7200 - timeRemaining.value,
    };
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
    answers,
    currentQuestionIndex,
    examSubmitted,
    readingQuestion,
    listeningQuestion,
    fetchExam,
    setSection,
    updateTime,
    saveAnswer,
    setQuestionIndex,
    submitExam,
  };
});
