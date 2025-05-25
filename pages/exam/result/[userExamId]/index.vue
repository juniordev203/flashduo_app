<template>
    <div class="h-full w-full flex flex-col bg-gradient-to-br from-indigo-50 to-blue-50">
        <AtomHeaderSafe class="shadow-sm bg-white">
            <template v-slot:left>
                <NuxtLink to="/">
                    <div class="flex items-center text-gray-400 active:text-gray-600 transition-colors duration-200">
                        <X class="w-6 h-6" />
                    </div>
                </NuxtLink>
            </template>
            <template v-slot:default>
                <h2 class="text-lg font-bold text-gray-800 text-center z-10 relative">
                    {{ $t('lang_core_exam_result_title') }}
                </h2>
            </template>
            <template v-slot:right>
                <div class="w-6"></div>
            </template>
        </AtomHeaderSafe>

        <div class="h-full w-full overflow-auto p-4 flex flex-col gap-6 mb-10">
            <!-- Main Result Content -->
            <div class="flex flex-col gap-4 items-center justify-center">
                <!-- Score Card -->
                <div v-if="dataScore"
                    class="bg-white w-full rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    <!-- Total Score -->
                    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
                        <div class="inline-block rounded-full bg-white/20 backdrop-blur-sm py-2 px-4 mb-2">
                            <span class="text-white font-medium">Tổng điểm</span>
                        </div>
                        <h3 class="text-4xl font-bold text-white">
                            {{ (dataScore.scoreListening || 0) + (dataScore.scoreReading || 0) }}
                        </h3>
                        <p class="text-blue-100 mt-1">Trên thang điểm 990</p>
                    </div>

                    <!-- Score Details -->
                    <div class="p-6">
                        <!-- Listening Score with Progress Bar -->
                        <div class="mb-5">
                            <div class="flex justify-between items-center mb-2">
                                <div class="flex items-center gap-2">
                                    <div class="bg-blue-100 p-2 rounded-full">
                                        <Headphones class="w-5 h-5 text-blue-600" />
                                    </div>
                                    <h4 class="font-semibold text-gray-700">Listening</h4>
                                </div>
                                <span class="text-xl font-bold text-blue-600">{{ dataScore.scoreListening || 0 }}<span
                                        class="text-sm text-gray-400 font-medium">/495</span></span>
                            </div>
                            <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div class="h-full bg-blue-500 rounded-full"
                                    :style="`width: ${Math.min(100, ((dataScore.scoreListening || 0) / 495) * 100)}%`">
                                </div>
                            </div>
                            <div class="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0</span>
                                <span>495</span>
                            </div>
                        </div>

                        <!-- Reading Score with Progress Bar -->
                        <div>
                            <div class="flex justify-between items-center mb-2">
                                <div class="flex items-center gap-2">
                                    <div class="bg-indigo-100 p-2 rounded-full">
                                        <BookText class="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <h4 class="font-semibold text-gray-700">Reading</h4>
                                </div>
                                <span class="text-xl font-bold text-indigo-600">{{ dataScore.scoreReading || 0 }}<span
                                        class="text-sm text-gray-400 font-medium">/495</span></span>
                            </div>
                            <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div class="h-full bg-indigo-500 rounded-full"
                                    :style="`width: ${Math.min(100, ((dataScore.scoreReading || 0) / 495) * 100)}%`">
                                </div>
                            </div>
                            <div class="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0</span>
                                <span>495</span>
                            </div>
                        </div>
                    </div>

                    <!-- Additional Score Analysis -->
                    <div class="px-6 pb-6">
                        <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <h4 class="text-sm font-medium text-gray-500 mb-3">{{ $t('lang_core_exam_result_analysis')
                                }}</h4>
                            <div class="flex justify-between items-center">
                                <div class="text-center">
                                    <div
                                        class="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
                                        <span class="text-lg font-bold text-blue-600">{{
                                            Math.round(((dataScore.scoreListening
                                                || 0) / 495) * 100) }}%</span>
                                    </div>
                                    <p class="text-xs mt-2 text-gray-500">Listening</p>
                                </div>
                                <div class="h-10 border-l border-gray-300"></div>
                                <div class="text-center">
                                    <div
                                        class="flex items-center justify-center w-12 h-12 mx-auto bg-indigo-100 rounded-full">
                                        <span class="text-lg font-bold text-indigo-600">{{
                                            Math.round(((dataScore.scoreReading
                                                || 0) / 495) * 100) }}%</span>
                                    </div>
                                    <p class="text-xs mt-2 text-gray-500">Reading</p>
                                </div>
                                <div class="h-10 border-l border-gray-300"></div>
                                <div class="text-center">
                                    <div
                                        class="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                                        <span class="text-lg font-bold text-green-600">{{
                                            Math.round((((dataScore.scoreListening
                                                || 0) + (dataScore.scoreReading || 0)) / 990) * 100) }}%</span>
                                    </div>
                                    <p class="text-xs mt-2 text-gray-500">{{ $t('lang_core_exam_result_total') }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-else class="w-full p-12 flex flex-col items-center">
                    <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4">
                    </div>
                    <p class="text-gray-500">{{ $t('lang_core_exam_result_loading') }}</p>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col w-full gap-3 mt-3">
                    <button @click="confirmReturn"
                        class="flex items-center justify-center gap-2 py-3.5 px-5 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-md active:scale-97 transition-all duration-200">
                        <CornerUpLeft class="w-5 h-5" />
                        {{ $t('lang_core_exam_result_another') }}
                    </button>

                    <button @click="shareResult"
                        class="flex items-center justify-center gap-2 py-3.5 px-5 font-semibold text-blue-600 bg-white border border-blue-100 rounded-xl shadow-sm active:bg-blue-50 transition-all duration-200">
                        <Share2 class="w-5 h-5" />
                        {{ $t('lang_core_exam_result_share') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { X, CornerUpLeft, Headphones, BookText, Share2 } from 'lucide-vue-next'
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import type { UserExamScoreResponse } from '~/auto_api';
import { useExamStore } from '~/stores/exam'

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const examStore = useExamStore()
const userExamId = computed(() => route.params.userExamId);
const dataScore = ref<UserExamScoreResponse | null>(null);

definePageMeta({
    layout: "app-none",
});

const confirmReturn = () => {
    if (confirm(t('lang_core_exam_result_confirm'))) {
        router.push("/exam");
    }
};

const shareResult = () => {
    const totalScore = (dataScore.value?.scoreListening || 0) + (dataScore.value?.scoreReading || 0);
    const message = `Tôi vừa đạt ${totalScore} điểm TOEIC (Listening: ${dataScore.value?.scoreListening || 0}, Reading: ${dataScore.value?.scoreReading || 0})!`;

    if (navigator.share) {
        navigator.share({
            title: 'Kết quả TOEIC của tôi',
            text: message,
        }).catch((error) => console.error('Lỗi khi chia sẻ:', error));
    } else {
        alert('Chức năng chia sẻ không được hỗ trợ trên trình duyệt của bạn');
    }
};

const getScore = async (userExamId: number) => {
    if (userExamId != null) {
        try {
            const response = await examApiUtil.apiExamUserExamUserExamIdScoreGet(userExamId);
            dataScore.value = response.data;
        } catch (error) {
            console.error("Lỗi khi lấy điểm thi:", error);
        }
    } else {
        console.warn("Không tìm thấy userExamId.");
    }
};

onMounted(() => {
    getScore(Number(userExamId.value));
})
</script>

<style scoped></style>