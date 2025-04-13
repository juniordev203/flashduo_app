<template>
    <div class="min-h-screen bg-slate-50">
        <!-- Header -->
        <AtomHeaderSafe class="bg-white border-b">
            <template #left>
                <NuxtLink :to="`/flashcard/folder/${folderId}/set/${setId}`">
                    <ChevronLeft class="w-6 h-6 text-gray-500" />
                </NuxtLink>
            </template>
            <template #default>
                <div class="flex items-center gap-2 text-gray-700">
                    <Clock class="w-5 h-5" />
                    <span class=" font-medium">{{ formatTime(elapsedMilliseconds) }}</span>
                </div>
            </template>
            <template #right>
                <button @click="resetGame" class="p-1 text-gray-500 hover:text-gray-700">
                    <RefreshCw class="w-5 h-5" />
                </button>
            </template>
        </AtomHeaderSafe>

        <!-- Game Progress -->
        <div class="p-4 space-y-4">
            <div class="flex justify-between">
                <div class="bg-white rounded-lg px-4 py-2 shadow-sm">
                    <span class="text-sm text-gray-600">Đã ghép: <span class="text-blue-700 font-medium">{{ matchedPairs }}/{{ totalPairs }}</span></span>
                </div>
                <div class="bg-white rounded-lg px-4 py-2 shadow-sm">
                    <span class="text-sm text-gray-600">Số lần thử: <span class="text-blue-700 font-medium">{{ moves }}</span></span>
                </div>
            </div>

            <!-- Game Board -->
            <div class="grid grid-cols-3 gap-2">
                <div v-for="(card, index) in gameCards" :key="index" @click="handleCardClick(index)"
                    class="aspect-square">
                    <div class="w-full h-full rounded-xl shadow-sm transition-transform duration-150 active:scale-95 touch-manipulation" :class="{
                        'ring-2 ring-blue-500': selectedIndexes.includes(index),
                        'opacity-50': matchedIndexes.includes(index),
                        'hover:shadow-md cursor-pointer': !matchedIndexes.includes(index),
                        'bg-white': true
                    }">
                        <Term v-if="card.type === 'term'" :card="getOriginalCard(card)" text-size="text-lg" class="h-full w-full" />
                        <DefinitionGame v-else :card="getOriginalCard(card)" text-size="text-lg" class="h-full w-full" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Result Message -->
        <Transition name="fade">
            <div v-if="message"
                class="fixed bottom-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-lg text-white"
                :class="message.type === 'success' ? 'bg-green-500' : 'bg-red-500'">
                {{ message.text }}
            </div>
        </Transition>

        <!-- Game Complete Modal -->
        <Transition name="fade">
            <div v-if="isGameComplete" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl p-6 w-full max-w-sm">
                    <div class="text-center space-y-4">
                        <div class="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                            <Trophy class="w-10 h-10 text-green-500" />
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold">Chúc mừng! 🎉</h2>
                            <p class="text-gray-600 mt-1">Bạn đã hoàn thành trò chơi</p>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <div class="flex justify-between mb-2">
                                <span class="text-gray-600">Thời gian:</span>
                                <span class="text-black font-bold">{{ formatTime(elapsedMilliseconds) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Số lần thử:</span>
                                <span class="font-bold">{{ moves }}</span>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <button @click="resetGame"
                                class="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700">
                                Chơi lại
                            </button>
                            <button @click="router.back()"
                                class="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200">
                                Quay lại
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ChevronLeft, Clock, RefreshCw, Trophy } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { FlashcardStore } from '~/stores/flashcard'
import Term from '~/components/flashcard/Term.vue'
import DefinitionGame from '~/components/flashcard/DefinitionGame.vue'
import type { IVocabFlashcard } from '~/types/vocab-flashcard.types'


export interface GameCard {
    id: number;
    type: 'term' | 'definition';
}

definePageMeta({ layout: 'app-none' })
const router = useRouter()
const route = useRoute()

// Constants
const TOTAL_PAIRS = 6
const FLIP_DURATION = 100

// Store
const store = FlashcardStore()
const { vocabularies } = storeToRefs(store)

// Route params
const folderId = Number(route.params.folderId)
const setId = Number(route.params.setId)

// Game state
const timer = ref(0)
const moves = ref(0)
const gameCards = ref<GameCard[]>([])
const originalCards = ref<IVocabFlashcard[]>([])
    const selectedIndexes = ref<number[]>([])
const matchedIndexes = ref<number[]>([])
const isLocked = ref(false)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)
const isGameComplete = ref(false)

let intervalId: ReturnType<typeof setInterval> | null = null;
const elapsedMilliseconds = ref(0)

const totalPairs = computed(() => TOTAL_PAIRS)
const matchedPairs = computed(() => matchedIndexes.value.length / 2)

const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 10);
    const seconds = (totalSeconds % 60).toString();
    const milliSeconds = (milliseconds % 10).toString();
    return `${seconds},${milliSeconds}`;
};

const startTimer = () => {
    if (!intervalId) {
        intervalId = setInterval(() => {
            elapsedMilliseconds.value += 1;
        }, 100);
    }
};
const stopTimer = () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function isMatched(index: number) {
    return matchedIndexes.value.includes(index)
}

function showMessage(type: 'success' | 'error', text: string) {
    message.value = { type, text }
    setTimeout(() => {
        message.value = null
    }, FLIP_DURATION)
}

const handleCardClick = async (index: number) => {
  // Bỏ qua nếu thẻ đã được ghép hoặc đang khóa
  if (isLocked.value || matchedIndexes.value.includes(index)) {
    return
  }

  // Bỏ qua nếu thẻ đã được chọn
  if (selectedIndexes.value.includes(index)) {
    return
  }

  // Thêm thẻ vào danh sách đã chọn
  selectedIndexes.value.push(index)

  // Nếu đã chọn 2 thẻ
  if (selectedIndexes.value.length === 2) {
    isLocked.value = true
    moves.value++

    const [firstIndex, secondIndex] = selectedIndexes.value
    const firstCard = gameCards.value[firstIndex]
    const secondCard = gameCards.value[secondIndex]

    // Kiểm tra ghép đúng
    if (firstCard.id === secondCard.id && firstCard.type !== secondCard.type) {
      showMessage('success', 'Chính xác! 👍')
      await new Promise(resolve => setTimeout(resolve, 100))
      matchedIndexes.value.push(...selectedIndexes.value)

      if (matchedIndexes.value.length === gameCards.value.length) {
        isGameComplete.value = true
        stopTimer()
        saveGameResult()
      }
    } else {
      showMessage('error', 'Sai rồi! 😢')
      await new Promise(resolve => setTimeout(resolve, 800))
    }

    selectedIndexes.value = []
    isLocked.value = false
  }
}

function saveGameResult() {
    const result = {
        setId,
        time: timer.value,
        moves: moves.value,
        date: new Date().toISOString()
    }

    try {
        const key = `flashcard_game_results_${setId}`
        const savedResults = JSON.parse(localStorage.getItem(key) || '[]')
        const newResults = [...savedResults, result]
            .sort((a, b) => a.time - b.time)
            .slice(0, 10)
        localStorage.setItem(key, JSON.stringify(newResults))
    } catch (error) {
        console.error('Error saving game result:', error)
    }
}

function initializeGame() {
    // Reset state
    timer.value = 0
    moves.value = 0
    matchedIndexes.value = []
    isGameComplete.value = false
    isLocked.value = false
    message.value = null

    // Get random cards
    const shuffledVocabs = [...vocabularies.value]
        .sort(() => Math.random() - 0.5)
        .slice(0, TOTAL_PAIRS)

    // Save original cards
    originalCards.value = shuffledVocabs

    // Create and shuffle game cards
    gameCards.value = shuffledVocabs
        .flatMap(vocab => [
            { id: vocab.id!, type: 'term' as const },
            { id: vocab.id!, type: 'definition' as const }
        ])
        .sort(() => Math.random() - 0.5)

    // Start timer
    stopTimer()
    startTimer()
}
function getOriginalCard(gameCard: GameCard): IVocabFlashcard {
    const card = originalCards.value.find(card => card.id === gameCard.id)
    if (!card) {
        throw new Error(`Card with id ${gameCard.id} not found`)
    }
    return card
}

function resetGame() {
    initializeGame()
}

// Lifecycle hooks
onMounted(async () => {
    try {
        if (!vocabularies.value.length) {
            await store.fetchFlashcardsInSet(setId)
        }

        if (vocabularies.value.length < TOTAL_PAIRS) {
            ElMessage.warning(`Cần ít nhất ${TOTAL_PAIRS} thẻ để chơi!`)
            router.back()
            return
        }

        initializeGame()
    } catch (error) {
        console.error('Error initializing game:', error)
        ElMessage.error('Không thể tải dữ liệu từ vựng')
        router.back()
    }
})

onBeforeUnmount(() => {
    stopTimer()
})
</script>

<style scoped>
.card-face {
    backface-visibility: hidden;
    transition: all 0.6s;
}

.card-face.front {
    transform: rotateY(180deg);
}

.flipped .card-face.front {
    transform: rotateY(0);
}

.flipped .card-face.back {
    transform: rotateY(-180deg);
}

.matched {
    opacity: 0.7;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>