<template>
    <div class="h-full w-full flex flex-col bg-slate-50">
        <AtomHeaderSafe class="shadow-md">
            <template v-slot:left>
            </template>
            <template v-slot:default>
                <span class="text-xl text-black font-medium">
                    {{ $t('lang_core_exam_title') }}
                    <span class="text-blue-500 font-bold">{{ $t('lang_core_exam_title_highlight') }}</span>
                </span>
            </template>
            <template v-slot:right>
            </template>
        </AtomHeaderSafe>

        <div class="p-4 w-full h-full flex flex-col gap-6 overflow-auto">
            <div class="flex items-center border border-gray-200 rounded-lg px-3 py-3 mb-4">
                <Search color="black" :size="22" />
                <input class="ml-2 text-base outline-none bg-slate-50"
                    :placeholder="$t('lang_core_exam_search_placeholder')" type="text" mode="text" />
            </div>
            <div class="flex flex-col gap-4">
                <el-tabs v-model="activeTab" class="w-full flex justify-between">
                    <el-tab-pane :label="$t('lang_core_exam_list_title')" name="exam" class="flex flex-col gap-2">
                        <div class="flex justify-between items-center">
                            <el-dropdown trigger="click">
                                <el-button type="primary"
                                    class="!bg-blue-200 !border-none !text-black transition-transform duration-150 active:scale-95 touch-manipulation">
                                    {{ $t('lang_core_exam_filter_button') }}<el-icon
                                        class="el-icon--right"><arrow-down /></el-icon>
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>{{ $t('lang_core_exam_filter_new_economy')
                                            }}</el-dropdown-item>
                                        <el-dropdown-item>{{ $t('lang_core_exam_filter_old_economy')
                                            }}</el-dropdown-item>
                                        <el-dropdown-item>{{ $t('lang_core_exam_filter_longman') }}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                        <div class="flex flex-col gap-4">
                            <div v-for="(data) in examInfo" :key="data.id"
                                class="p-4 w-full h-full flex flex-col gap-2 bg-white rounded shadow">
                                <p class="text-lg font-bold">{{ data.examName }}</p>
                                <p class="">{{ data.description }}</p>
                                <div class="flex justify-between items-center text-xs mb-2">
                                    <div class="flex gap-4">
                                        <div class="flex gap-2 items-center">
                                            <Clock class="w-4 h-4" />
                                            <p class="">{{ $t('lang_core_exam_time') }}</p>
                                        </div>
                                        <div class="flex gap-2 items-center">
                                            <UserPen class="w-4 h-4" />
                                            <p class="">{{ $t('lang_core_exam_total_users') }}</p>
                                        </div>
                                    </div>
                                    <p class="">{{ $t('lang_core_exam_parts') }} | {{ data.totalQuestions }} {{
                                        $t('lang_core_exam_questions') }}</p>
                                </div>
                                <NuxtLink :to="`/exam/${data.id}`" class="w-full">
                                    <button
                                        class="text-white w-full px-4 py-2 bg-indigo-500 rounded transition-transform duration-150 active:scale-95 touch-manipulation">
                                        {{ $t('lang_core_exam_detail_button') }}
                                    </button>
                                </NuxtLink>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('lang_core_exam_history')" name="vocab">
                        <div class="flex flex-col gap-4 px-8 py-4 text-center bg-white rounded-lg">
                            <p class="text-sm">Bạn chưa có từ vựng yêu thích nào !</p>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Search, Clock, UserPen } from 'lucide-vue-next'
import { ArrowDown } from '@element-plus/icons-vue'
import type { ExamResponse } from '~/auto_api/models'
import type { TabsInstance } from 'element-plus'

const tabPosition = ref<TabsInstance['tabPosition']>('bottom')
const activeTab = ref("exam");

const examInfo = ref<ExamResponse[]>([]);
const makeExams = async () => {
    try {
        const response = await examApiUtil.apiExamExamGet();
        examInfo.value = response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách đề thi:", error);
    }
};
onMounted(() => {
    makeExams();
})
</script>

<style scoped></style>