export interface Question {
    id: number
    text: string
    options: Option[]
    audio?: string
    image?: string
    passage?: string
  }
  
  export interface Option {
    label: string
    value: string
  }
  
  export interface Exam {
    id: number
    title: string
    type: string
    duration: number
    questions: Question[]
  }
  
  export interface ExamState {
    currentExam: Exam | null
    currentSection: 'listening' | 'reading'
    timeRemaining: number
    answers: Record<number, string>
    currentQuestionIndex: number
    examSubmitted: boolean
  }