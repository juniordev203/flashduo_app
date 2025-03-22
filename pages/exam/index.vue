<template>
    <div class="h-full w-full flex flex-col bg-slate-50">
        <AtomHeaderSafe class="shadow-md">
            <template v-slot:left>
            </template>
            <template v-slot:default>
                <span class="text-xl text-black font-medium">
                    Thi thử
                </span>
            </template>
            <template v-slot:right>
            </template>
        </AtomHeaderSafe>

        <div class="p-4 w-full h-full flex flex-col gap-6 overflow-auto">
            <div class="flex items-center border border-gray-200 rounded-lg px-3 py-3 mb-4">
                <Search color="black" :size="22" />
                <input class=" ml-2 text-base outline-none bg-slate-50" placeholder="Tìm kiếm đề thi..." type="text"
                    mode="text" />
            </div>
            <div class="flex flex-col gap-4">
                <div class="flex justify-between items-center">
                    <p class="text-xl font-medium">Danh sách đề thi</p>
                    <el-dropdown>
                        <el-button type="primary"
                            class="!bg-blue-200 !border-none !text-black transition-transform duration-150 active:scale-95 touch-manipulation">
                            Lọc đề thi<el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>New Economy TOEIC</el-dropdown-item>
                                <el-dropdown-item>Economy OldFormat</el-dropdown-item>
                                <el-dropdown-item>Longman TOEIC</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="flex flex-col gap-4">
                    <div v-for="(data) in examInfo" :key="data.id"
                        class="p-4 w-full h-full flex flex-col gap-1 bg-white rounded shadow">
                        <p class="text-lg font-bold">{{ data.examName }}</p>
                        <p class="">{{ data.description }}</p>
                        <div class="flex gap-4">
                            <div class="flex gap-2">
                                <Clock class="w-5 h-5" />
                                <p class="">120 phút</p>
                            </div>
                            <div class="flex gap-2">
                                <UserPen class="w-5 h-5" />
                                <p class="">120</p>
                            </div>
                        </div>
                        <p class="mb-2">7 phần thi | {{ data.totalQuestions }} câu</p>
                        <NuxtLink :to="`/exam/${data.id}`" class="w-full">
                            <button
                                class="text-white w-full px-4 py-2 bg-indigo-500 rounded transition-transform duration-150 active:scale-95 touch-manipulation">Chi
                                tiết</button>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Search, Clock, UserPen } from 'lucide-vue-next'
import { ArrowDown } from '@element-plus/icons-vue'
import type { ExamResponse } from '~/auto_api/models'

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