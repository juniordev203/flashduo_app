<!-- filepath: /Users/apple/Junior@203/source_code/flashduo/mobile/components/flashcard/Term.vue -->
<template>
  <div class="term-card w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden">
    <div class="flex-1 flex flex-col items-center justify-center px-8 py-10 h-full">
      <h2 :class="['font-bold text-center text-blue-800', textSize]">
        {{ termText }}
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IVocabFlashcard } from '~/types/vocab-flashcard.types';


const props = defineProps<{
  card: IVocabFlashcard;
  textSize: string
}>(); // Xác định nếu card là mảng hoặc một object đơn lẻ
const currentCard = computed(() => {
  return props.card;
});

// Lấy ra term text
const termText = computed(() => {
  return currentCard.value?.termLanguage || 'Không có dữ liệu';
});
</script>