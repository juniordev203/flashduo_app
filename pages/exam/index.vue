<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <!-- Header -->
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:default>
        <span class="text-xl text-black font-medium">
          {{ $t("lang_core_exam_title") }}
          <span class="text-blue-600 font-bold">{{
            $t("lang_core_exam_title_highlight")
            }}</span>
        </span>
      </template>
    </AtomHeaderSafe>

    <!-- Main Content -->
    <div class="p-4 w-full h-full flex flex-col gap-6 overflow-auto">
      <!-- Search Bar -->
      <div class="relative">
        <Search class="absolute left-4 top-3.5 text-gray-400" :size="20" />
        <input v-model="searchQuery"
          class="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 bg-white transition-all"
          :placeholder="$t('lang_core_exam_search_placeholder')" type="text" />
      </div>

      <!-- Tabs Section -->
      <div class="flex flex-col gap-4">
        <el-tabs v-model="activeTab" class="exam-tabs">
          <!-- Exam List Tab -->
          <el-tab-pane :label="$t('lang_core_exam_list_title')" name="exam">
            <div class="space-y-4">
              <!-- Filter Button -->
              <div class="flex justify-between items-center">
                <el-dropdown trigger="click">
                  <el-button type="primary"
                    class="!bg-blue-50 !border-blue-100 !text-blue-600 hover:!bg-blue-100 !shadow-sm">
                    {{ $t("lang_core_exam_filter_button") }}
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>{{
                        $t("lang_core_exam_filter_new_economy")
                        }}</el-dropdown-item>
                      <el-dropdown-item>{{
                        $t("lang_core_exam_filter_old_economy")
                        }}</el-dropdown-item>
                      <el-dropdown-item>{{
                        $t("lang_core_exam_filter_longman")
                        }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>

              <!-- Exam Cards -->
              <div class="grid gap-4">
                <div v-if="loading" class="flex justify-center py-8">
                  <el-loading />
                </div>
                <!-- No Results State -->
                <div v-else-if="filteredExams.length === 0"
                  class="flex flex-col items-center justify-center gap-4 py-8">
                  <Search class="text-gray-400" :size="48" />
                  <p class="text-gray-500">Không tìm thấy bài thi phù hợp</p>
                </div>
                <!-- Exam Cards -->
                <div v-else v-for="data in filteredExams" :key="data.id"
                  class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:border-blue-500 transition-all duration-200">
                  <div class="p-5">
                    <h3 class="text-lg font-bold text-gray-800 mb-2">
                      {{ data.examName }}
                    </h3>
                    <p class="text-gray-600 text-sm mb-4">
                      {{ data.description }}
                    </p>

                    <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <div class="flex items-center gap-2">
                        <Clock class="text-blue-500" :size="18" />
                        <span>{{ $t("lang_core_exam_time") }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <UserPen class="text-green-500" :size="18" />
                        <span>{{ $t("lang_core_exam_total_users") }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <FileText class="text-purple-500" :size="18" />
                        <span>{{ $t("lang_core_exam_parts") }} |
                          {{ data.totalQuestions }}
                          {{ $t("lang_core_exam_questions") }}</span>
                      </div>
                    </div>

                    <NuxtLink :to="`/exam/${data.id}`" class="block w-full">
                      <button
                        class="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 active:scale-95 touch-manipulation flex items-center justify-center gap-2">
                        {{ $t("lang_core_exam_detail_button") }}
                        <ChevronRight :size="18" />
                      </button>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <!-- History Tab -->
          <el-tab-pane :label="$t('lang_core_exam_history')" name="vocab">
            <div
              class="flex flex-col items-center justify-center gap-4 p-8 text-center bg-white rounded-xl border border-gray-100">
              <History class="text-gray-400" :size="48" />
              <p class="text-gray-500">Bạn chưa làm bài thi nào!</p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Clock, UserPen, History, ChevronRight } from "lucide-vue-next";
import { ArrowDown } from "@element-plus/icons-vue";
import type { ExamResponse } from "~/auto_api/models";

const activeTab = ref("exam");
const searchQuery = ref("");

const examInfo = ref<ExamResponse[]>([]);
const loading = ref(false);

const makeExams = async () => {
  try {
    loading.value = true;
    const response = await examApiUtil.apiExamExamGet();
    examInfo.value = response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đề thi:", error);
    ElMessage.error("Không thể tải danh sách đề thi");
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  makeExams();
});

const filteredExams = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  if (!query) return examInfo.value;

  return examInfo.value.filter((exam) => {
    return (
      exam.examName?.toLowerCase().includes(query) ||
      exam.description?.toLowerCase().includes(query) ||
      exam.totalQuestions?.toString().includes(query)
    );
  });
});
</script>

<style scoped>
.exam-tabs :deep(.el-tabs__item) {
  font-size: 1rem;
  padding: 0 1.5rem 1rem;
}

.exam-tabs :deep(.el-tabs__active-bar) {
  height: 3px;
  border-radius: 1.5px;
  background-color: #2563eb;
}

.exam-tabs :deep(.el-tabs__item.is-active) {
  color: #2563eb;
  font-weight: 600;
}

.exam-tabs :deep(.el-tabs__nav-wrap::after) {
  height: 1px;
  background-color: #e5e7eb;
}
</style>
