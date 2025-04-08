<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <!-- Header -->
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
        <NuxtLink to="/exam">
          <div class="flex gap-2 items-center text-black">
            <ChevronLeft class="w-6 h-6" />
            <p class="text-lg">Quay lại</p>
          </div>
        </NuxtLink>
      </template>
    </AtomHeaderSafe>
    <div class="h-full w-full overflow-auto">
      <div v-if="examDetail" class="max-w-3xl mx-auto p-4">
        <!-- Exam Header -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-4">
          <h1 class="text-2xl font-bold text-blue-600 mb-4 text-center">
            {{ examDetail.examName }}
          </h1>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="flex items-center gap-2">
              <Clock class="text-blue-500" :size="20" />
              <div>
                <p class="text-sm text-gray-600">Thời gian</p>
                <p class="font-semibold">120 phút</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <FileQuestion class="text-green-500" :size="20" />
              <div>
                <p class="text-sm text-gray-600">Số câu hỏi</p>
                <p class="font-semibold">{{ examDetail.totalQuestions }} câu</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Exam Structure -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-4">
          <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <LayoutList class="text-blue-500" />
            Cấu trúc bài thi
          </h2>
          <div class="space-y-4">
            <div class="border-l-4 border-blue-500 pl-4">
              <h3 class="font-medium">Phần 1: Listening (75 phút)</h3>
              <ul class="mt-2 space-y-2 text-gray-600">
                <li>• Part 1: Mô tả tranh (6 câu)</li>
                <li>• Part 2: Hỏi – đáp (25 câu)</li>
                <li>• Part 3: Đoạn hội thoại (39 câu)</li>
                <li>• Part 4: Bài nói ngắn (30 câu)</li>
              </ul>
            </div>
            <div class="border-l-4 border-green-500 pl-4">
              <h3 class="font-medium">Phần 2: Reading (75 phút)</h3>
              <ul class="mt-2 space-y-2 text-gray-600">
                <li>• Part 5: Câu chưa hoàn chỉnh (30 câu)</li>
                <li>• Part 6: Hoàn chỉnh đoạn văn (16 câu)</li>
                <li>• Part 7: Đọc hiểu đoạn văn (54 câu)</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- Instructions -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-4">
          <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <Info class="text-blue-500" />
            Hướng dẫn làm bài
          </h2>
          <div class="space-y-3 text-gray-600">
            <div class="flex items-start gap-2">
              <Circle class="mt-1 text-blue-500" :size="8" />
              <p>
                Bài thi gồm 2 phần: Listening và Reading, thực hiện trong 150
                phút.
              </p>
            </div>
            <div class="flex items-start gap-2">
              <Circle class="mt-1 text-blue-500" :size="8" />
              <p>Bạn nên phân bổ thời gian hợp lý cho từng phần.</p>
            </div>
            <div class="flex items-start gap-2">
              <Circle class="mt-1 text-blue-500" :size="8" />
              <p>Đối với phần Listening, bạn chỉ được nghe một lần duy nhất.</p>
            </div>
            <div class="flex items-start gap-2">
              <Circle class="mt-1 text-blue-500" :size="8" />
              <p>
                Bạn có thể chuyển qua lại giữa các câu hỏi trong cùng một phần.
              </p>
            </div>
          </div>
        </div>
        <!-- Start Button -->
        <NuxtLink
          v-if="examDetail.id"
          :to="`/exam/${examDetail.id}/do`"
          class="block w-full"
        >
          <button
            class="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-xl transition-all duration-200 active:scale-95 touch-manipulation flex items-center justify-center gap-2"
          >
            <Play :size="20" />
            Bắt đầu làm bài
          </button>
        </NuxtLink>
      </div>
      <!-- Loading State -->
      <div v-else class="h-full flex items-center justify-center">
        <el-loading />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  FileQuestion,
  LayoutList,
  Info,
  Circle,
  Play,
} from "lucide-vue-next";
import { ElLoading } from 'element-plus'
import {
  type ExamResponse,
} from "~/auto_api/models";
import { useExamStore } from "~/stores/exam";
import { useMyBaseStore } from "~/stores/base.store";
definePageMeta({
  layout: "app-none",
});

const route = useRoute();
const examId = Number(route.params.id);
const examDetail = ref<ExamResponse | null>(null);
const examStore = useExamStore();
const userStore = useMyBaseStore();
const userExamId = ref<number | null>(null);
const userId = computed(() => userStore.authUser?.id);

const fetchExamDetail = async () => {
  try {
    const response = await examApiUtil.apiExamExamDetailExamIdGet(
      Number(examId)
    );
    examDetail.value = response.data;
  } catch (error) {
    console.log("Khong lay duoc chi tiet de thi", error);
  }
};

onMounted(() => {
  fetchExamDetail();
});
</script>

<style scoped></style>
