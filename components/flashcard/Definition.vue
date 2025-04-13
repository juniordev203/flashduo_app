<!-- filepath: /Users/apple/Junior@203/source_code/flashduo/mobile/components/flashcard/Definition.vue -->
<template>
    <div class="definition-card w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden">
      <div class="px-8 py-10 flex-1 flex flex-col gap-2 items-center justify-center h-full">
        <h2 :class="['text-2xl font-light text-center text-gray-800', textSize]">
          {{ definitionText }}
        </h2>
        <div 
          v-if="hasImage" 
          class="w-full overflow-hidden rounded-lg"
        >
          <img :src="currentCard?.imageUrl || ''" alt="Flashcard image" class="w-full h-full object-cover">
        </div>
        
        <!-- Hiển thị audio btn nếu có -->
        <div v-if="hasAudio" class="flex justify-center">
          <button 
            @click="playAudio" 
            class="flex items-center gap-1 py-2 px-4 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200"
          >
            <Volume2 class="w-4 h-4" />
            <span class="text-sm">Phát âm</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { Volume2 } from 'lucide-vue-next';
import type { IVocabFlashcard } from '~/types/vocab-flashcard.types';
  
  
  const props = defineProps<{
    card: IVocabFlashcard;
    textSize: string
  }>();
  
  // Xác định nếu card là mảng hoặc một object đơn lẻ
  const currentCard = computed(() => {
    return props.card;
  });
  
  // Lấy ra definition text
  const definitionText = computed(() => {
    return currentCard.value?.definitionLanguage || 'Không có định nghĩa';
  });
  
  // Kiểm tra có ảnh hay không
  const hasImage = computed(() => {
    return !!(currentCard.value?.imageUrl && 
             currentCard.value.imageUrl !== 'string' && 
             currentCard.value.imageUrl.trim() !== '');
  });
  
  // Kiểm tra có audio hay không
  const hasAudio = computed(() => {
    return !!(currentCard.value?.audioUrl && 
             currentCard.value.audioUrl !== 'string' && 
             currentCard.value.audioUrl.trim() !== '');
  });
  
  // Xử lý phát audio
  const playAudio = () => {
    if (!hasAudio.value || !currentCard.value?.audioUrl) return;
    
    const audio = new Audio(currentCard.value.audioUrl);
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  };
  </script>