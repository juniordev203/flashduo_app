<template>
    <div class="h-full w-full flex flex-col bg-slate-50">
        <!-- Header -->
        <AtomHeaderSafe class="bg-white border-b">
            <template #left>
                <NuxtLink :to="`/flashcard/folder/${folderId}/set/${setId}`">
                    <ChevronLeft class="w-6 h-6 text-gray-500" />
                </NuxtLink>
            </template>
            <template #default>
                <span class="font-medium text-gray-700">{{ $t('lang_core_flashcard_game_title') }}</span>
            </template>
        </AtomHeaderSafe>

        <div class="h-full w-full overflow-auto p-4 flex flex-col gap-6">
            <!-- Game Introduction -->
            <div class="bg-white rounded-xl p-6 shadow-sm space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                        <GamepadIcon class="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                        <h1 class="text-xl font-bold text-gray-800">{{ $t('lang_core_flashcard_game_title') }}</h1>
                        <p class="text-sm text-gray-500">{{ $t('lang_core_flashcard_game_desc') }}</p>
                    </div>
                </div>

                <div class="space-y-3">
                    <div class="flex items-start gap-3">
                        <CheckCircle2 class="w-5 h-5 text-green-500 mt-0.5" />
                        <p class="text-gray-600">{{ $t('lang_core_flashcard_game_instruction1') }}</p>
                    </div>
                    <div class="flex items-start gap-3">
                        <Clock class="w-5 h-5 text-green-500 mt-0.5" />
                        <p class="text-gray-600">{{ $t('lang_core_flashcard_game_instruction2') }}</p>
                    </div>
                    <div class="flex items-start gap-3">
                        <Trophy class="w-5 h-5 text-green-500 mt-0.5" />
                        <p class="text-gray-600">{{ $t('lang_core_flashcard_game_instruction3') }}</p>
                    </div>
                </div>

                <button @click="startGame"
                    class="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                    {{ $t('lang_core_flashcard_game_start') }}
                </button>
            </div>

            <!-- Rankings -->
            <div class="bg-white rounded-xl shadow-sm flex flex-col">
                <div class="p-4 border-b border-gray-100">
                    <h2 class="font-semibold text-gray-800">{{ $t('lang_core_flashcard_game_ranking') }}</h2>
                </div>
                <div class="flex-1">
                    <div v-if="loading" class="p-8 text-center">
                        <div
                            class="animate-spin w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full mx-auto">
                        </div>
                        <p class="mt-2 text-sm text-gray-500">{{ $t('lang_core_flashcard_game_loading') }}</p>
                    </div>

                    <div v-else-if="!gameResultBySets.length" class="p-8 text-center">
                        <TrophyOff class="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p class="text-gray-500">{{$t('lang_core_flashcard_game_no_players')}}</p>
                    </div>

                    <div v-else class="divide-y divide-gray-100">
                        <div v-for="(rank, index) in sortedGameResultBySets" :key="rank.id"
                            class="flex items-center p-4 hover:bg-gray-50">
                            <!-- Rank number -->
                            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                                :class="[
                                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                        index === 1 ? 'bg-gray-100 text-gray-700' :
                                            index === 2 ? 'bg-orange-100 text-orange-700' :
                                                'bg-gray-50 text-gray-500'
                                ]">
                                {{ index + 1 }}
                            </div>

                            <!-- User info -->
                            <div class="ml-4 flex-1">
                                <p class="font-medium text-gray-800">{{ rank.userName }}</p>
                                <p class="text-sm text-gray-500">
                                    {{ rank.durationTime }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
    ChevronLeft,
    Gamepad as GamepadIcon,
    CheckCircle2,
    Clock,
    Trophy,
} from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n();
const route = useRoute()
const router = useRouter()
const flashcardStore = FlashcardStore();

// Route params
const folderId = Number(route.params.folderId)
const setId = Number(route.params.setId)

// State
const loading = ref(false)
const { gameResultBySets, gameResultByUsers } = storeToRefs(flashcardStore)

const fetchRankings = async () => {
    try {
        loading.value = true
        await flashcardStore.fetchGameRankingsBySetId(setId)
    } catch (error) {
        console.error('Error fetching rankings:', error)
        showCustomMessage('error', t('lang_core_messages.error_load_ranking'))
    } finally {
        loading.value = false
    }
}
//sắp xếp tăng dần theo thời gian
const sortedGameResultBySets = computed(() => {
    return [...gameResultBySets.value].sort((a, b) => {
        const timeA = a.durationTime ? new Date(a.durationTime).getTime() : 0;
        const timeB = b.durationTime ? new Date(b.durationTime).getTime() : 0;
        // Sort in descending order (newest first)
        return timeA - timeB;
    });
});
const startGame = () => {
    router.push(`/flashcard/folder/${folderId}/set/${setId}/game/play`)
}

onMounted(() => {
    fetchRankings()
})
</script>