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
              :section="1"
              :currentIndex="getListeningIndex()"
              :answers="examStore.answers"
              @save-answer="saveAnswer"
              @change-question="setCurrentQuestion"
            />
            <!-- reading -->
            <ReadingSection
              v-if="examStore.currentSection === QuestionSectionEnum.Reading"
              :questions="examStore.readingQuestion"
              :section="2"
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
import { useMyBaseStore } from "~/stores/base.store"
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ChevronLeft, ChevronRight, X } from "lucide-vue-next";
import ListeningSection from "~/components/exam/ListeningSection.vue";
import ReadingSection from "~/components/exam/ReadingSection.vue";
import { QuestionSectionEnum } from "~/constants/enum";
import { Storage } from '@capacitor/storage';

definePageMeta({
  layout: "app-none",
});

const examStore = useExamStore();
const userInfo = useMyBaseStore();
const route = useRoute();
const router = useRouter();
const timerInterval = ref<number | null>(null);
const examId = Number(route.params.id);
const userId = computed(() => userInfo.$state.userInfo?.id ?? 0);
const userExamId = computed(() => examStore.userExamId);
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
  try {
    if (!examId || Number.isNaN(Number(examId))) {
      console.error("Không gọi fetchExam vì examId không hợp lệ:", examId);
      return;
    }
    if (!userId.value || Number.isNaN(Number(userId.value)) || !examId || Number.isNaN(Number(examId))) {
      console.error("Không gọi postUserExam vì examId không hợp lệ:",userId, examId);
      return;
    }
    await examStore.postUserExam(userId.value, examId);
    await examStore.fetchExam(examId);
    startTimer();
  } catch (error) {
    console.error("Lỗi khi khởi tạo bài thi:", error);
  }
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
      confirmSubmit();
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
  return questionId !== undefined && examStore.answers[questionId] !== undefined
    ? "bg-green-300 text-white"
    : "bg-gray-100 text-gray-700";
};

const saveAnswer = async ({
  questionId,
  section,
  answer,
}: {
  questionId: number;
  section: number,
  answer: string;
}) => {
  examStore.answers[questionId] = answer;
  await Storage.set({ 
    key: `answer_${questionId}`,
    value: JSON.stringify({ section, answer }),
   });
   console.log("Câu trả lời đã lưu: ", questionId, section, answer);
};
const confirmSubmit = async () => {
  console.log("userExamId trong component: ", userExamId.value)
  if (confirm("Bạn có chắc chắn muốn nộp bài không?")) {
    if (!userExamId.value) {
      console.error("Không tìm thấy userId");
      return
    }
    console.log("✅ Gọi submitExam với userExamId:", userExamId.value, "và userId:", userId.value);
    await examStore.submitExam(userExamId.value, userId.value);
    router.push(`/exam/${examId}/result`);
  }
};
</script>

<style scoped></style>
