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
    <!-- Progress Bar -->
    <div class="px-4 pt-4">
      <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          class="h-full bg-indigo-500 rounded-full transition-all duration-300"
          :style="`width: ${(currentIndex + 1) / cards.length * 100}%`"
        ></div>
      </div>
    </div>
    <!-- Card Counter -->
    <div class="flex justify-between items-center px-4 py-2">
      <span class="text-sm text-gray-600 font-medium">
        {{ currentIndex + 1 }} / {{ cards.length }}
      </span>
      <div class="flex gap-2">
        <button 
          v-if="cards[currentIndex]?.isFavourite"
          @click="" 
          class="flex items-center gap-1 py-1 px-2 bg-yellow-50 rounded text-xs font-medium text-yellow-600"
        >
          <Star class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          Yêu thích
        </button>
        <button 
          v-else
          @click="" 
          class="flex items-center gap-1 py-1 px-2 bg-gray-100 rounded text-xs font-medium text-gray-500"
        >
          <Star class="w-3.5 h-3.5" />
          Yêu thích
        </button>
      </div>
    </div>
    <!-- Main Flashcard Area -->
    <div class="flex-1 px-4 py-2 flex items-center justify-center">
      <Swiper
        class="w-full h-full"
        :slides-per-view="1"
        :space-between="30"
        @slideChange="onSlideChange"
        :pagination="{ clickable: true }"
        :navigation="true"
        :modules="[SwiperPagination, SwiperNavigation]"
      >
        <SwiperSlide v-for="(card, index) in cards" :key="card.id || index" class="flex items-center justify-center">
          <div class="w-full h-5/6">
            <CardFlip
              class="!w-full !h-full"
              :state="flippedCards[index] ? 'back' : 'front'"
              :duration="0.6"
              @mousedown="handleMouseDown"
              @mouseup="handleMouseUp"
              @touchstart="handleTouchStart"
              @touchend="handleTouchEnd"
              @touchmove="handleTouchMove"
              @mousemove="handleMouseMove"
            >
              <template v-slot:front>
                <div class="card-face front w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div class="flex-1 flex flex-col items-center justify-center px-8 py-10 h-full">
                    <h2 class="text-3xl font-bold text-center text-gray-800 mb-4">
                      {{ card.termLanguage }}
                    </h2>
                    <div v-if="card.imageUrl && card.imageUrl !== 'string'" class="w-3/4 h-48 overflow-hidden rounded-lg mb-6">
                      <img :src="card.imageUrl" alt="Flashcard image" class="w-full h-full object-cover">
                    </div>
                    <div class="mt-auto">
                      <p class="text-sm text-center text-gray-500 italic">Nhấn để xem nghĩa</p>
                    </div>
                  </div>
                </div>
              </template>
              <template v-slot:back>
                <div class="card-face back w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div class="flex-1 flex flex-col items-center justify-center px-8 py-10 h-full">
                    <span class="text-sm font-medium text-gray-400 mb-1">Định nghĩa:</span>
                    <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">
                      {{ card.definitionLanguage }}
                    </h2>
                    
                    <div class="mt-auto">
                      <p class="text-sm text-center text-gray-500 italic">Nhấn để xem từ vựng</p>
                    </div>
                  </div>
                </div>
              </template>
            </CardFlip>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from 'swiper/modules';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Volume2,
  Music 
} from 'lucide-vue-next';
import { FlashcardStore } from '~/stores/flashcard';
import type { Flashcard } from '~/auto_api/models';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'vue3-card-flip/dist/style.css';
import CardFlip from 'vue3-card-flip';

definePageMeta({
  layout: 'app-none',
})
const route = useRoute();
const setId = Number(route.params.setId);
const folderId = Number(route.params.folderId);
const store = FlashcardStore();
const { vocabularies, loading } = storeToRefs(store);

// Local state
const currentIndex = ref(0);
const flippedCards = reactive<Record<number, boolean>>({});
const isLoadingCards = ref(true);

// Drag detection variables
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);

// Computed properties
const cards = computed(() => vocabularies.value || []);
const currentCard = computed(() => cards.value[currentIndex.value] || null);

// Load flashcards from the set
onMounted(async () => {
  try {
    isLoadingCards.value = true;
    await store.fetchFlashcardsInSet(setId);
  } catch (error) {
    console.error('Error loading flashcards:', error);
  } finally {
    isLoadingCards.value = false;
  }
});

function flipCard(index: number) {
  if (!isDragging.value) {
    flippedCards[index] = !flippedCards[index];
  }
}

function onSlideChange(swiper: any) {
  currentIndex.value = swiper.activeIndex;
}

async function toggleFavorite(card: Flashcard) {
  if (card.id) {
    await store.toggleFavorite(card.id);
  }
}

function speakCurrentCard() {
  if (currentCard.value?.termLanguage) {
    const utterance = new SpeechSynthesisUtterance(currentCard.value.termLanguage);
    speechSynthesis.speak(utterance);
  }
}

function playAudio(url: string) {
  if (url && url !== 'string') {
    const audio = new Audio(url);
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  }
}

// Drag detection handlers
const handleMouseDown = (event: MouseEvent) => {
  isDragging.value = false;
  startX.value = event.clientX;
  startY.value = event.clientY;
};

const handleMouseUp = () => {
  if (!isDragging.value) {
    flipCard(currentIndex.value);
  }
};

const handleMouseMove = (event: MouseEvent) => {
  if (
    Math.abs(event.clientX - startX.value) > 5 ||
    Math.abs(event.clientY - startY.value) > 5
  ) {
    isDragging.value = true;
  }
};

const handleTouchStart = (event: TouchEvent) => {
  isDragging.value = false;
  const touch = event.touches[0];
  startX.value = touch.clientX;
  startY.value = touch.clientY;
};

const handleTouchEnd = () => {
  if (!isDragging.value) {
    flipCard(currentIndex.value);
  }
};

const handleTouchMove = (event: TouchEvent) => {
  const touch = event.touches[0];
  if (
    Math.abs(touch.clientX - startX.value) > 5 ||
    Math.abs(touch.clientY - startY.value) > 5
  ) {
    isDragging.value = true;
  }
};
</script>

<style scoped>
/* No need for custom card flip styles as we're using the library styles */
</style>