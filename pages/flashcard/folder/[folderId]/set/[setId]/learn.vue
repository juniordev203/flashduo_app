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
        <h1 class="text-base font-medium text-gray-800">Học từ vựng</h1>
      </template>
      <template v-slot:right>
        <div class="w-6"></div>
      </template>
    </AtomHeaderSafe>
    <div class="px-4 pt-4">
      <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div class="h-full bg-indigo-500 rounded-full transition-all duration-300"
          :style="`width: ${(currentIndex + 1) / cards.length * 100}%`"></div>
      </div>
    </div>
    <div class="flex justify-between items-center px-4 py-2">
      <span class="text-sm text-gray-600 font-medium">
        {{ currentIndex + 1 }} / {{ cards.length }}
      </span>
      <div class="flex gap-2">
        <button v-if="currentCard?.isFavorite" @click="toggleFavorite(currentCard)"
          class="flex items-center gap-1 py-1 px-2 bg-yellow-50 rounded text-xs font-medium text-yellow-600">
          <Star class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          Yêu thích
        </button>
        <button v-else @click="toggleFavorite(currentCard)"
          class="flex items-center gap-1 py-1 px-2 bg-gray-100 rounded text-xs font-medium text-gray-500">
          <Star class="w-3.5 h-3.5" />
          Yêu thích
        </button>
      </div>
    </div>
    <div v-if="isLoadingCards" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <div
          class="inline-block w-8 h-8 border-4 border-t-indigo-500 border-r-indigo-500 border-b-transparent border-l-transparent rounded-full animate-spin mb-2">
        </div>
        <p class="text-gray-600">Đang tải từ vựng...</p>
      </div>
    </div>
    <div v-else class="flex-1 px-4 py-2 flex items-center justify-center">
      <Swiper class="!w-full !h-full" :slide-prev-view="1" :space-between="30" @slideChange="onSlideChange"
        :pagination="{ clickable: true }" :navigation="true" :modules="[SwiperPagination, SwiperNavigation]">
        <SwiperSlide v-for="(card, index) in cards" :key="card.id || index" class="flex items-center justify-center">
          <FlashcardItem :card="card" :is-flipped="flippedCards[index]" @flip="flipCard(index)"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Flashcard } from '~/auto_api';
import { FlashcardStore } from '~/stores/flashcard';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from 'swiper/modules';
import { ChevronLeft, Star } from 'lucide-vue-next'
import FlashcardItem from '~/components/flashcard/FlashcardItem.vue';

import 'swiper/css';



definePageMeta({
  layout: 'app-none',
})

const route = useRoute();
const folderId = Number(route.params.folderId);
const setId = Number(route.params.setId);

const flashcardStore = FlashcardStore();
const { vocabularies, loading } = storeToRefs(flashcardStore);
const currentIndex = ref(0);
const flippedCards = reactive<Record<number, boolean>>({});
const isLoadingCards = ref(false);

const cards = computed(() => vocabularies.value || []);
const currentCard = computed(() => cards.value[currentIndex.value] || null);

function flipCard(index: number) {
  flippedCards[index] = !flippedCards[index];
}
function onSlideChange(swiper: any) {
  currentIndex.value = swiper.activeIndex;
}
async function toggleFavorite(card: any) {
  if (card?.id) {
    await flashcardStore.toggleFavorite(card.id);
  }
}


//lifecycle
onMounted(async () => {
  try {
    isLoadingCards.value = true;
    await flashcardStore.fetchFlashcardsInSet(setId);
  } catch (error) {
    showCustomMessage('error', "Không tải được từ vựng!");
  } finally {
    isLoadingCards.value = false;
  }
});

</script>

<style scoped></style>