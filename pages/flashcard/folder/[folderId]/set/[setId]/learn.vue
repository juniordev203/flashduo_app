<template>
  <div class="h-full w-full flex flex-col bg-gradient-to-br from-indigo-50 to-blue-50">
    <!-- Header -->
    <AtomHeaderSafe class="shadow-sm bg-white">
      <template v-slot:left>
        <NuxtLink :to="`/flashcard/folder/${folderId}/set/${setId}`">
          <ChevronLeft class="w-6 h-6 text-gray-500" />
        </NuxtLink>
      </template>
      <template v-slot:default>
        <h1 class="text-base font-medium text-gray-800">{{ $t('lang_core_flashcard_learn_title') }}</h1>
      </template>
      <template v-slot:right>
        <div class="w-6"></div>
      </template>
    </AtomHeaderSafe>
    <div class="p-4 h-full w-full overflow-auto flex flex-col gap-6">
      <div class="">
        <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div class="h-full bg-indigo-500 rounded-full transition-all duration-300"
            :style="`width: ${(currentIndex + 1) / cards.length * 100}%`"></div>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600 font-medium">
          {{ currentIndex + 1 }} / {{ cards.length }}
        </span>
        <div class="flex gap-2">
          <button v-if="currentCard?.isFavorite" @click="toggleFavorite(currentCard)"
            class="flex items-center gap-1 py-1 px-2 bg-yellow-50 rounded text-xs font-medium text-yellow-600">
            <Star class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            {{ $t('lang_core_flashcard_favorite') }}
          </button>
          <button v-else @click="toggleFavorite(currentCard)"
            class="flex items-center gap-1 py-1 px-2 bg-gray-100 rounded text-xs font-medium text-gray-500">
            <Star class="w-3.5 h-3.5" />
            {{ $t('lang_core_flashcard_favorite') }}
          </button>
        </div>
      </div>
      <div v-if="isLoadingCards" class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <div
            class="inline-block w-8 h-8 border-4 border-t-indigo-500 border-r-indigo-500 border-b-transparent border-l-transparent rounded-full animate-spin mb-2">
          </div>
          <p class="text-gray-600">{{ $t('lang_core_flashcard_loading') }}</p>
        </div>
      </div>
      <div v-else class="flex-1 flex-col flex items-center justify-center">
        <Swiper class="!w-full !h-full" :slide-prev-view="1" :space-between="30" @slideChange="onSlideChange"
          :pagination="{ clickable: true }" :modules="[SwiperNavigation]">
          <SwiperSlide v-for="(card, index) in cards" :key="card.id || index"
            class="!w-full !h-full flex items-center justify-center">
            <FlashcardItem :card="card" :is-flipped="flippedCards[index]" @flip="flipCard(index)" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="flex items-center justify-center">
        <div v-show="cards.length == currentIndex + 1" @click="showCompletionDialog = true"
          class="px-4 py-2 flex items-center gap-2 w-fit h-fit bg-green-500 text-white rounded-2xl shadow-md transition-colors cursor-pointer">
          <p class="">{{ $t('lang_core_flashcard_complete') }} </p>
          <CheckCheck class="w-5 h-5" />
        </div>
      </div>
      <el-dialog v-model="showCompletionDialog">
        <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
            <div class="p-6 border-b border-gray-100">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Trophy class="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 class="text-xl font-bold text-gray-800">{{ $t('lang_core_flashcard_learn_complete') }}</h2>
                  <p class="text-sm text-gray-500">{{ $t('lang_core_flashcard_learn_complete_desc') }}</p>
                </div>
              </div>
            </div>
            <div class="p-4 flex flex-col gap-3 border-t border-gray-100">
              <button @click="continueSet"
                class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                {{ $t('lang_core_flashcard_continue_learning') }}
              </button>
              <div class="flex gap-3">
                <button @click="retrySet"
                  class="flex-1 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors">
                  {{ $t('lang_core_flashcard_restart') }}
                </button>
                <button @click="returnToSet"
                  class="flex-1 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors">
                  {{ $t('lang_core_flashcard_back_to_set') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Flashcard } from '~/auto_api';
import { FlashcardStore } from '~/stores/flashcard';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from 'swiper/modules';
import { CheckCheck, ChevronLeft, Star, Trophy } from 'lucide-vue-next'
import FlashcardItem from '~/components/flashcard/FlashcardItem.vue';

import 'swiper/css';
import { useI18n } from 'vue-i18n';

definePageMeta({
  layout: 'app-none',
})
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const folderId = Number(route.params.folderId);
const setId = Number(route.params.setId);

const flashcardStore = FlashcardStore();
const { vocabularies, loading } = storeToRefs(flashcardStore);
const cards = computed(() => vocabularies.value || []);

const currentIndex = ref(0);
const flippedCards = reactive<Record<number, boolean>>({});
const isLoadingCards = ref(false);
const startTime = ref(Date.now());
const showCompletionDialog = ref(false);

const currentCard = computed(() => cards.value[currentIndex.value] || null);

const flipCard = async (index: number) => {
  flippedCards[index] = !flippedCards[index];
}

const onSlideChange = async (swiper: any) => {
  currentIndex.value = swiper.activeIndex;
}

const toggleFavorite = async (card: any) => {
  if (card?.id) {
    await flashcardStore.toggleFavorite(card.id);
  }
}

function continueSet() {
  showCompletionDialog.value = false;
}

const retrySet = async () => {
  // Reset trạng thái
  currentIndex.value = 0;
  startTime.value = Date.now();
  showCompletionDialog.value = false;

  // Quay về slide đầu tiên
  if (document.querySelector('.swiper') as any) {
    (document.querySelector('.swiper') as any).swiper.slideTo(0);
  }
}

const returnToSet = async () => {
  router.push(`/flashcard/folder/${folderId}/set/${setId}`);
}

onMounted(async () => {
  if (setId) {
    isLoadingCards.value = true;
    try {
      await flashcardStore.fetchFlashcardsInSet(setId);
      // Khởi tạo flippedCards object cho mỗi thẻ
      cards.value.forEach((_, index) => {
        flippedCards[index] = false;
      });
    } catch (error) {
      console.error('Error fetching vocab cards:', error);
      showCustomMessage('error', t('lang_core_messages.error_load_vocab'));
    } finally {
      isLoadingCards.value = false;
    }
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>