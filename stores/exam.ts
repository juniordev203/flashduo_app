import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ExamQuestionResponse, ExamResponse, Question } from '~/auto_api/models'
import type { Exam, ExamState } from '~/types/exam.types'

enum QuestionPart {
  Part1 = 1,
  Part2 = 2,
  Part3 = 3,
  Part4 = 4,
  Part5 = 5,
  Part6 = 6,
  Part7 = 7
}
const examStructure = {
  Listening: {
    name: 'Listening',
    parts: [QuestionPart.Part1, QuestionPart.Part2, QuestionPart.Part3, QuestionPart.Part4]
  },
  Reading: {
    name: 'Reading',
    parts: [QuestionPart.Part5, QuestionPart.Part6, QuestionPart.Part7]
  }
}

export const useExamStore = defineStore('exam', () => {
  const currentExam = ref<ExamResponse | null>(null)
  const currentSection = ref<'listening' | 'reading'>('listening')
  const currentPart = ref<number>(1)
  const timeRemaining = ref(7200) // 120 phút = 7200 giây
  const answers = ref<Record<number, string>>({})
  const currentQuestionIndex = ref(0)
  const examSubmitted = ref(false)

  const listeningQuestion = computed<Question[]>(() => {
    return (
      currentExam.value?.examQuestion
        ?.map(q => q.question) // Lấy đúng `question`
        .filter(q => q && q.part && q.part <= QuestionPart.Part4) as Question[] // Lọc và ép kiểu
    ) || []
  })
  
  const readingQuestion = computed<Question[]>(() => {
    return (
      currentExam.value?.examQuestion
        ?.map(q => q.question) // Lấy đúng `question`
        .filter(q => q && q.part && q.part >= QuestionPart.Part5) as Question[] // Lọc và ép kiểu
    ) || []
  })
  


  const fetchExam = async (examId: number) => {
    if (!examId || isNaN(examId)) {
        console.error('❌ fetchExam nhận examId không hợp lệ:', examId);
        return;
    }
    try {
        const response = await examApiUtil.apiExamExamStartExamIdGet(examId);
        if (response.data.examQuestion) {
            resetExamState();
            currentExam.value = response.data;
        } else {
            console.error('❌ Không tìm thấy bài thi', response.data);
        }
    } catch (error) {
        console.error('❌ Lỗi API:', error);
    }
};


  function setSection(section: 'listening' | 'reading') {
    currentSection.value = section
  }

  function updateTime() {
    timeRemaining.value -= 1
  }

  function saveAnswer(questionId: number, answer: string) {
    answers.value[questionId] = answer
  }

  function setQuestionIndex(index: number) {
    currentQuestionIndex.value = index
  }

  function submitExam() {
    if (!currentExam.value?.id) {
      console.error('Cannot submit exam: examId is missing')
      return null
    }
  
    examSubmitted.value = true
    return {
      answers: answers.value,
      examId: currentExam.value.id,
      timeUsed: 7200 - timeRemaining.value
    }
  }
   
  function resetExamState() {
    currentSection.value = 'listening'
    currentPart.value = 1
    timeRemaining.value = 7200
    answers.value = {}
    currentQuestionIndex.value = 0
    examSubmitted.value = false
  }

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
    submitExam
  }
})