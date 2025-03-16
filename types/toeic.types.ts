export interface ToeicQuestion {
  id: string;
  part: number; // Part 1-7
  questionNumber: number;
  questionText?: string;
  image?: string; // URL hình ảnh cho Part 1
  audio?: string; // URL audio cho Part 1-4
  passage?: string; // Đoạn văn cho Part 5-7
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
}

export interface ToeicTest {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // Thời gian làm bài (phút)
  questions: ToeicQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface ToeicTestAttempt {
  id: string;
  userId: string;
  testId: string;
  answers: {
    questionId: string;
    selectedAnswer: 'A' | 'B' | 'C' | 'D';
  }[];
  score: {
    listening: number;
    reading: number;
    total: number;
  };
  startedAt: string;
  completedAt?: string;
  timeSpent: number; // Thời gian làm bài (giây)
}

export interface CreateTestAttemptRequest {
  testId: string;
}

export interface SubmitAnswerRequest {
  attemptId: string;
  questionId: string;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
}

export interface CompleteTestRequest {
  attemptId: string;
} 