<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
        <NuxtLink to="/">
          <div class="flex gap-2 items-center text-gray-400">
            <X class="w-6 h-6" />
          </div>
        </NuxtLink>
      </template>
      <template v-slot:right>
      </template>
    </AtomHeaderSafe>

    <div class="h-full w-full overflow-hidden p-4 flex flex-col gap-6 items-center justify-center">
      <h2 class="text-2xl font-semibold text-gray-800 text-center">Điểm TOEIC của bạn</h2>

      <div v-if="dataScore" class="bg-white w-full p-6 flex flex-col gap-4 rounded-xl shadow-xl text-center">
        <div class="flex gap-1 justify-center items-center">
          <Headphones />
          <p class="text-xl font-medium text-gray-700">Listening: <span class="text-blue-500 text-2xl">{{ dataScore.scoreListening }}</span></p>
        </div>
        <div class="flex gap-1 justify-center items-center">
          <BookText />
          <p class="text-xl font-medium text-gray-700">Reading: <span class="text-blue-500 text-2xl">{{ dataScore.scoreReading }}</span></p>
        </div>
      </div>

      <div v-else class="text-center text-gray-500">
        Đang tải kết quả...
      </div>
      <div class="px-4 py-2 flex gap-2 text-center text-sm font-medium text-gray-50 bg-violet-500 rounded">
        <CornerUpLeft />
        <button
            @click="confirmReturn"
            class=""
          >
          Làm lại
        </button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { X, CornerUpLeft, Headphones, BookText } from 'lucide-vue-next'
import type { UserExamScoreResponse } from '~/auto_api/models';
import { useExamStore } from '~/stores/exam';

const router = useRouter();
const examStore = useExamStore()
const userExamId = computed(() => examStore.userExamId);
const dataScore = ref<UserExamScoreResponse | null>(null);
definePageMeta({
  layout: "app-none",
});
const confirmReturn = () => {
  if (confirm("Bạn có chắc chắn muốn làm lại bài thi?")) {
    router.push("/exam");
  }
};
const getScore = async () => {
  if (userExamId.value != null) {
    try {
      console.log("🔄 Đang lấy điểm thi cho userExamId:", userExamId.value);
      const response = await examApiUtil.apiExamUserExamUserExamIdScoreGet(userExamId.value);
      dataScore.value = response.data;
      console.log("✅ Điểm thi nhận được:", dataScore.value);
    } catch (error) {
      console.error("❌ Lỗi khi lấy điểm thi:", error);
    }
  } else {
    console.warn("⚠️ Không tìm thấy userExamId.");
  }
};

onMounted(() => {
  getScore();
})
</script>

<style scoped></style>
