<template>
    <div class="h-full w-full flex flex-col bg-slate-50">
        <!-- Header -->
        <AtomHeaderSafe class="shadow-sm bg-white">
            <template #left>
                <NuxtLink to="/" class="p-1 text-gray-500 hover:text-gray-700">
                    <ChevronLeft class="w-5 h-5" />
                </NuxtLink>
            </template>
            <template #default>
                <span class="text-base font-medium text-gray-700">
                    Danh sách yêu thích
                </span>
            </template>
            <template #right>
                <div class="w-5"></div>
            </template>
        </AtomHeaderSafe>

        <!-- Main Content -->
        <div class="flex-1 overflow-auto">
            <div class="max-w-2xl mx-auto p-4">
                <el-tabs v-model="activeTab" class="favorites-tabs">
                    <!-- Vocabulary Tab -->
                    <el-tab-pane label="Từ vựng yêu thích" name="vocab">
                        <div class="flex flex-col gap-4">
                            <div class="flex justify-between items-center">
                                <p class="text-sm text-indigo-600">
                                    Từ vựng đã lưu: {{ vocabFavories.length }}
                                </p>
                                <NuxtLink to="/flashcard"
                                    class="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm">
                                    <BookOpen class="w-4 h-4" />
                                    <span>Học ngay</span>
                                </NuxtLink>
                            </div>
                            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                                <!-- Empty state -->
                                <div v-if="!vocabFavories.length"
                                    class="flex flex-col items-center justify-center py-12 px-4">
                                    <div class="bg-yellow-50 rounded-full p-3 mb-3">
                                        <Star class="w-8 h-8 text-yellow-400" />
                                    </div>
                                    <p class="text-gray-500 text-center mb-4">
                                        Chưa có từ vựng yêu thích nào
                                    </p>
                                </div>
                                <!-- Favorites list -->
                                <div v-else>
                                    <!-- Quick action header -->
                                    <!-- List items -->
                                    <div class="divide-y divide-gray-100">
                                        <div v-for="(vocabF, index) in vocabFavories" :key="index"
                                            class="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors group">
                                            <div class="flex-1">
                                                <p
                                                    class="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
                                                    {{ vocabF.termLanguage }}
                                                </p>
                                                <p class="text-sm text-gray-500 mt-0.5">
                                                    {{ vocabF.definitionLanguage }}
                                                </p>
                                            </div>

                                            <div class="flex items-center gap-2">
                                                <!-- Audio button -->
                                                <button v-if="vocabF.audioUrl"
                                                    class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                                    <Volume2 class="w-4 h-4" />
                                                </button>

                                                <!-- Favorite button -->
                                                <button @click="toggleFavorite(vocabF.id)"
                                                    class="p-2 text-yellow-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-full transition-colors">
                                                    <Star class="w-4 h-4 fill-current" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>

                    <!-- History Tab -->
                    <!-- Thay thế phần exam tab trong template -->
                    <el-tab-pane :label="$t('lang_core_exam_history')" name="exam">
                        <div class="flex flex-col gap-4">
                            <!-- Header -->
                            <div class="flex justify-between items-center">
                                <p class="text-sm text-indigo-600">
                                    Bài thi đã làm: {{ examCompleteds.length }}
                                </p>
                                <NuxtLink to="/exam"
                                    class="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm">
                                    <SquarePen class="w-4 h-4" />
                                    <span>Làm bài thi ngay</span>
                                </NuxtLink>
                            </div>

                            <!-- Exam History Card -->
                            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                                <!-- Empty state -->
                                <div v-if="!examCompleteds.length"
                                    class="flex flex-col items-center justify-center py-12 px-4">
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
                                            <div
                                                class="w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium">
                                                {{ exam.totalScore }}
                                            </div>
                                        </div>
                                        <!-- Exam info -->
                                        <div class="flex-1 min-w-0">
                                            <div class="flex items-center justify-between gap-2">
                                                <h3
                                                    class="font-medium text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
                                                    {{ exam.examName }}
                                                </h3>
                                                <time class="text-xs text-gray-500 whitespace-nowrap">
                                                    {{ exam.startTime ? formatCustomDateTime(exam.startTime) : '' }}
                                                </time>
                                            </div>
                                        </div>
                                        <!-- Action buttons -->
                                        <div class="ml-4">
                                            <NuxtLink to="/"
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
import {
    Star,
    Volume2,
    BookOpen,
    History,
    SquarePen,
    CheckCircle2,
    Clock,
    ExternalLink,
    ChevronLeft
} from 'lucide-vue-next';
import type { UserExamResultResponse, FlashcardFavoritesResponse } from '~/auto_api';
// store
const flashcardStore = FlashcardStore();
const examStore = useExamStore();
const userInfo = computed(() => useMyBaseStore().userInfo)

const userId = userInfo.value?.id;
const vocabFavories = ref<FlashcardFavoritesResponse[]>([]);
const examCompleteds = ref<UserExamResultResponse[]>([]);
const activeTab = ref('vocab');

const fetchVocabFavorites = async (userId: number) => {
    try {
        const data = await flashcardStore.fetchVocabFavoritesByUserId(userId);
        vocabFavories.value = Array.isArray(data) ? data : [];
    } catch (err: any) {
        throw (err);
    }
}
const fetchExamCompleted = async (userId: number) => {
    try {
        const data = await examStore.fetchExamCompleted(userId);
        examCompleteds.value = Array.isArray(data) ? data : [];
    } catch (err: any) {
        throw (err);
    }
}
const toggleFavorite = async (flashcardId?: number) => {
    if (!flashcardId) return;
    try {
        await flashcardStore.toggleFavorite(flashcardId);
        if (userId) {
            await fetchVocabFavorites(userId);
        }
    } catch (error) {
        console.error('Error toggling favorite:', error);
        ElMessage.error('Không thể cập nhật trạng thái yêu thích');
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
    if (userId) {
        await fetchVocabFavorites(Number(userId));
        await fetchExamCompleted(Number(userId));
    }
})
</script>

<style scoped></style>