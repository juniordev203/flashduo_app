<!-- filepath: /Users/apple/Junior@203/source_code/flashduo/mobile/components/flashcard/Definition.vue -->
<template>
    <div class="definition-card w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="px-8 py-10 flex-1 flex flex-col gap-2 items-center justify-center h-full">
            <h2 :class="['font-light text-center text-gray-800', textSize]">
                {{ definitionText }}
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
}>();

// Xác định nếu card là mảng hoặc một object đơn lẻ
const currentCard = computed(() => {
    return props.card;
});

// Lấy ra definition text
const definitionText = computed(() => {
    return currentCard.value?.definitionLanguage || 'Không có định nghĩa';
});
</script>