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
            <template v-slot:default>
            </template>
            <template v-slot:right>
            </template>
        </AtomHeaderSafe>

        <div class="h-full w-full overflow-auto p-4 flex flex-col gap-6 items-center justify-center">
            <div class="px-4 py-8 bg-white w-full h-fit flex flex-col gap-4 justify-center items-center rounded shadow">
                <h1 class="text-2xl font-bold text-gray-800 mb-4">Đề thi TOEIC - 2025</h1>
                <div class="flex flex-col gap-2 items-center">
                    <p><strong>Thời gian làm bài:</strong> <span class="text-red-600">120 phút</span></p>
                    <p><strong>Số câu hỏi:</strong>  <span class="text-red-600">200</span></p>
                    <p><strong>Loại đề:</strong> TOEIC 2 kỹ năng</p>
                    <p><strong>Mô tả:</strong> Đề thi TOEIC gồm 2 phần chính: Listening và Reading. Bạn cần hoàn thành tất
                        cả các
                        câu hỏi trong thời gian quy định.</p>
                </div>
                <button
                    class="w-full py-2 text-lg font-semibold text-white bg-indigo-500 rounded transition-transform duration-150 active:scale-95 touch-manipulation">
                    Làm bài
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next';
definePageMeta({
    layout: "app-none",
});
</script>

<style scoped></style>