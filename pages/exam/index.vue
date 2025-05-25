<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <!-- Header -->
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
        <NuxtLink to="/">
          <ChevronLeft class="w-6 h-6 text-black" />
        </NuxtLink>
      </template>
      <template v-slot:default>
        <span class="text-xl text-black font-medium">
          {{ $t("lang_core_exam_title") }}
          <span class="text-blue-600 font-bold">{{
            $t("lang_core_exam_title_highlight")
          }}</span>
        </span>
      </template>
      <template v-slot:right>
        <NuxtLink to="/">
          <MoreVertical class="w-6 h-6 text-black" />
        </NuxtLink>
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
          <el-tab-pane :label="$t('lang_core_exam_history')" name="examHistory">
            <div class="flex flex-col gap-4">
              <!-- Header -->
              <div class="flex justify-between items-center">
                <p class="text-sm text-indigo-600">
                  {{ $t('lang_core_favorites_exam_count') }} {{ examCompleteds.length }}
                </p>
              </div>

              <!-- Exam History Card -->
              <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                <!-- Empty state -->
                <div v-if="!examCompleteds.length" class="flex flex-col items-center justify-center py-12 px-4">
                  <div class="bg-gray-50 rounded-full p-3 mb-3">
                    <History class="w-8 h-8 text-gray-400" />
                  </div>
                  <p class="text-gray-500 text-center">
                    Bạn chưa làm bài thi nào!
                  </p>
                </div>

                <!-- History list -->
                <div v-else class="divide-y divide-gray-100">
                  <div v-for="(exam, index) in sortedExamCompleteds" :key="index"
                    class="flex items-center p-4 hover:bg-gray-50 transition-colors group">
                    <!-- Result circle -->
                    <div class="mr-4">
                      <div class="w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium">
                        {{ exam.totalScore }}
                      </div>
                    </div>
                    <!-- Exam info -->
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between gap-2">
                        <h3 class="font-medium text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
                          {{ exam.examName }}
                        </h3>
                        <time class="text-xs text-gray-500 whitespace-nowrap">
                          {{ exam.startTime ? formatCustomDateTime(exam.startTime) : '' }}
                        </time>
                      </div>
                    </div>
                    <!-- Action buttons -->
                    <div class="ml-4">
                      <NuxtLink :to="`/exam/result/${exam.id}`"
                        class="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                        <ExternalLink class="w-4 h-4" />
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MoreVertical, ChevronLeft, Search, Clock, UserPen, History, ChevronRight, SquarePen, ExternalLink } from "lucide-vue-next";
import { ArrowDown } from "@element-plus/icons-vue";
import type { ExamResponse, UserExamResultResponse } from "~/auto_api/models";
import { ElMessage, type TabsInstance } from "element-plus";
import { computed, onMounted, ref } from "vue";
import { useExamStore } from '~/stores/exam'
import { useMyBaseStore } from "~/stores/base.store";
import { useI18n } from "vue-i18n";
import { showToast } from '@/utils/message.utils'

const { t } = useI18n();
const examStore = useExamStore();
const userInfo = computed(() => useMyBaseStore().userInfo)
const examCompleteds = ref<UserExamResultResponse[]>([]);
const activeTab = ref("exam");
const searchQuery = ref("");

const examInfo = ref<ExamResponse[]>([]);
const loading = ref(false);
const userId = userInfo.value?.id;

const makeExams = async () => {
  try {
    loading.value = true;
    const response = await examApiUtil.apiExamExamGet();
    examInfo.value = response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đề thi:", error);
    showToast('error', t('lang_core_messages.error_load_exams'));
  } finally {
    loading.value = false;
  }
};
const fetchExamCompleted = async (userId: number) => {
  try {
    const data = await examStore.fetchExamCompletedByUserId(userId);
    examCompleteds.value = Array.isArray(data) ? data : [];
  } catch (err: any) {
    throw (err);
  }
}
//sap xep ds theo thoi gian 
const sortedExamCompleteds = computed(() => {
  return [...examCompleteds.value].sort((a, b) => {
    const timeA = a.startTime ? new Date(a.startTime).getTime() : 0;
    const timeB = b.startTime ? new Date(b.startTime).getTime() : 0;
    // Sort in descending order (newest first)
    return timeB - timeA;
  });
});
onMounted(async () => {
  makeExams();
  await fetchExamCompleted(Number(userId));
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
