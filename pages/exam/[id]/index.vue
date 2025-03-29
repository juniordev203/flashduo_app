<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
        <NuxtLink to="/exam">
          <div class="flex gap-2 items-center text-black">
            <ChevronLeft class="w-6 h-6" />
            <p class="text-lg">Quay lại</p>
          </div>
        </NuxtLink>
      </template>
      <template v-slot:default> </template>
      <template v-slot:right> </template>
    </AtomHeaderSafe>

    <div
      class="h-full w-full overflow-auto p-4 flex flex-col gap-6 items-center justify-center"
    >
      <div
        v-if="examDetail"
        class="px-6 py-8 bg-white w-full h-fit flex flex-col gap-4 justify-center items-center rounded shadow"
      >
        <h1 class="text-2xl font-bold text-gray-800 mb-4">
          {{ examDetail.examName }}
        </h1>
        <div class="flex flex-col gap-2 items-center">
          <p>
            <strong>Thời gian làm bài:</strong>
            <span class="text-red-600">120 phút</span>
          </p>
          <p>
            <strong>Số câu hỏi:</strong>
            <span class="text-red-600">{{ examDetail.totalQuestions }}</span>
          </p>
          <p><strong>Loại đề:</strong> TOEIC 2 kỹ năng</p>
          <p>
            <strong>Mô tả:</strong> Đề thi TOEIC gồm 2 phần chính: Listening và
            Reading. Bạn cần hoàn thành tất cả các câu hỏi trong thời gian quy
            định.
          </p>
        </div>
        <NuxtLink
          v-if="examDetail && examDetail.id"
          class="w-full"
          :to="`/exam/${examDetail.id}/do`"
        >
          <button
            class="w-full py-2 text-lg font-semibold text-white bg-indigo-500 rounded transition-transform duration-150 active:scale-95 touch-manipulation"
          >
            Làm bài
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft } from "lucide-vue-next";
import {
  ExamStatus,
  type ExamResponse,
  type UserExamBaseRequest,
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
