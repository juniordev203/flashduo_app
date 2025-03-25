<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
        <NuxtLink to="/exam">
          <div class="flex gap-2 items-center text-gray-400">
            <X class="w-6 h-6" />
          </div>
        </NuxtLink>
      </template>
      <template v-slot:default> </template>
      <template v-slot:right>
        <button
          @click="confirmSubmit"
          class="px-4 py-2 text-center text-sm font-medium text-gray-50 bg-red-500 rounded"
        >
          Nộp bài
        </button>
      </template>
    </AtomHeaderSafe>
    <div class="h-full w-full overflow-hidden p-4 flex flex-col gap-6">
      <!-- header -->
      <ExamHeader
        :timeRemaining="examStore.timeRemaining"
        :examInfo="examStore.currentExam"
        @toggle-section="toggleSection"
      />
      <div class="flex flex-col gap-2 h-full">
        <div
          class="flex-1 flex flex-col justify-between bg-white shadow-sm rounded-lg"
        >
          <!-- section -->
          <div class="px-1 py-2 flex-1 border-blue-300 border-2 rounded">
            <!-- listening -->
            <ListeningSection
              v-if="examStore.currentSection === QuestionSectionEnum.Listening"
              :questions="examStore.listeningQuestion"
              :currentIndex="getListeningIndex()"
              :answers="examStore.answers"
              @save-answer="saveAnswer"
              @change-question="setCurrentQuestion"
            />
            <!-- reading -->
            <ReadingSection
              v-if="examStore.currentSection === QuestionSectionEnum.Reading"
              :questions="examStore.readingQuestion"
              :currentIndex="getReadingIndex()"
              :answers="examStore.answers"
              @save-answer="saveAnswer"
              @change-question="setCurrentQuestion"
            />
          </div>
          <!-- control -->
          <div class="p-2 h-12 bg-slate-50 flex justify-between">
            <button
              @click="previousQuestion"
              class="flex items-center px-4 py-2 border border-gray-300 shadow text-sm font-medium rounded text-gray-700 bg-white transition-transform duration-150 active:scale-95 touch-manipulation"
              :disabled="examStore.currentQuestionIndex === 0"
            >
              <ChevronLeft class="w-5 h-5" /> Câu trước
            </button>

            <button
              @click="nextQuestion"
              class="flex items-center px-4 py-2 border border-gray-300 shadow text-sm font-medium rounded text-gray-700 bg-white transition-transform duration-150 active:scale-95 touch-manipulation"
              :disabled="
                examStore.currentQuestionIndex ===
                (examStore.currentExam?.totalQuestions || 0) - 1
              "
            >
              Câu tiếp theo <ChevronRight class="w-5 h-5" />
            </button>
          </div>
        </div>
        <!-- question list -->
        <div class="h-22 bg-white shadow-sm rounded-lg">
          <div class="p-4 flex flex-col gap-2">
            <h3 class="text-lg font-medium text-gray-900">Danh sách câu hỏi</h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="index in totalQuestionListening"
                :key="index -1"
                @click="setCurrentQuestion(index - 1)"
                class="w-10 h-10 flex items-center justify-center text-sm rounded-md"
                :class="getQuestionButtonClass(index - 1)"
              >
                {{ index }}
              </button>

              <button
                v-for="index in totalQuestionReading"
                :key="index - 1"
                @click="setCurrentQuestion(index - 1 + totalQuestionListening)"
                class="w-10 h-10 flex items-center justify-center text-sm rounded-md"
                :class="
                  getQuestionButtonClass(index - 1 + totalQuestionListening)
                "
              >
                {{ index + totalQuestionListening }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useExamStore } from "~/stores/exam";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ChevronLeft, ChevronRight, X } from "lucide-vue-next";
import ListeningSection from "~/components/exam/ListeningSection.vue";
import ReadingSection from "~/components/exam/ReadingSection.vue";
import { QuestionSectionEnum } from "~/constants/enum";

definePageMeta({
  layout: "app-none",
});

const examStore = useExamStore();
const route = useRoute();
const router = useRouter();
const timerInterval = ref<number | null>(null);
const examId = Number(route.params.id);
const totalQuestion = computed(
  () => examStore.currentExam?.totalQuestions ?? 0
);
const totalQuestionListening = ref(0);
const totalQuestionReading = ref(0);
watchEffect(() => {
    totalQuestionListening.value = Math.ceil(totalQuestion.value / 2);
    totalQuestionReading.value = totalQuestion.value - totalQuestionListening.value;
}) 

onMounted(async () => {
  if (!isNaN(examId) && examId) {
    await examStore.fetchExam(examId);
  } else {
    console.error("Không gọi fetchExam vì examId không hợp lệ:", examId);
  }
  startTimer();
});

onBeforeUnmount(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
});

const startTimer = () => {
  timerInterval.value = window.setInterval(() => {
    if (examStore.timeRemaining > 0) {
      examStore.updateTime();
    } else {
      examStore.submitExam();
      if (timerInterval.value) {
        clearInterval(timerInterval.value);
      }
    }
  }, 1000);
};

const getListeningIndex = () => {
  const halfTotal = Math.ceil(totalQuestion.value / 2);
  return Math.min(examStore.currentQuestionIndex, halfTotal - 1);
};

const getReadingIndex = () => {
  const halfTotal = Math.ceil(totalQuestion.value / 2);
  return examStore.currentQuestionIndex >= halfTotal
    ? examStore.currentQuestionIndex - halfTotal
    : 0;
};

const nextQuestion = () => {
  if (examStore.currentQuestionIndex < totalQuestion.value - 1) {
    examStore.setQuestionIndex(examStore.currentQuestionIndex + 1);
    if (
      examStore.currentQuestionIndex === Math.ceil(totalQuestion.value / 2) &&
      examStore.currentSection === QuestionSectionEnum.Listening
    ) {
      examStore.setSection(QuestionSectionEnum.Reading);
    }
  }
};

const previousQuestion = () => {
  if (examStore.currentQuestionIndex > 0) {
    examStore.setQuestionIndex(examStore.currentQuestionIndex - 1);
    if (
      examStore.currentQuestionIndex === Math.ceil(totalQuestion.value / 2) - 1 &&
      examStore.currentSection === QuestionSectionEnum.Reading
    ) {
      examStore.setSection(QuestionSectionEnum.Listening);
    }
  }
};
const setCurrentQuestion = (index: number) => {
  examStore.setQuestionIndex(index);
  const halfTotal = Math.ceil(totalQuestion.value / 2);
  if (index < halfTotal) {
    examStore.setSection(QuestionSectionEnum.Listening);
  } else {
    examStore.setSection(QuestionSectionEnum.Reading);
  }
};
const toggleSection = () => {
  const halfTotal = Math.ceil(totalQuestion.value / 2);
  if (examStore.currentSection === QuestionSectionEnum.Listening) {
    examStore.setSection(QuestionSectionEnum.Reading);
    examStore.setQuestionIndex(halfTotal);
  } else {
    examStore.setSection(QuestionSectionEnum.Listening);
    examStore.setQuestionIndex(0);
  }
};

const saveAnswer = ({
  questionId,
  answer,
}: {
  questionId: number;
  answer: string;
}) => {
  examStore.answers[questionId] = answer;
  console.log(examStore.answers);
};

const getQuestionButtonClass = (index: number) => {
  if (index === examStore.currentQuestionIndex) {
    return "bg-blue-300 text-white";
  }
  let questionId;
  const halfTotal = Math.ceil(totalQuestion.value / 2);
  if (index < halfTotal) {
    questionId = examStore.listeningQuestion[index]?.id;
  } else {
    const readingIndex = index - halfTotal;
    questionId = examStore.readingQuestion[readingIndex]?.id;
  }
  if (questionId !== undefined && examStore.answers[questionId] !== undefined) {
    return "bg-green-300 text-white";
  }
  return "bg-gray-100 text-gray-700";
};

const confirmSubmit = () => {
  if (confirm("Bạn có chắc chắn muốn nộp bài không?")) {
    const result = examStore.submitExam();
    router.push(`/result/${examStore.currentExam?.id}`);
  }
};
</script>

<style scoped></style>
