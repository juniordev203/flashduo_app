<template>
    <div class="w-full h-full">
        <CardFlip class="!w-full !h-full" :state="isFlipped ? 'back' : 'front'" :duration="0.6"
            @mousedown="handleMouseDown" @mouseup="handleMouseUp" @touchstart="handleTouchStart"
            @touchend="handleTouchEnd" @touchmove="handleTouchMove" @mousemove="handleMouseMove">
            <!-- Front (Term) -->
            <template v-slot:front>
                <Term :card="card" text-size="text-3xl"/>
            </template>
            <!-- Back (Definition) -->
            <template v-slot:back>
                <Definition :card="card" text-size="text-3xl"/>
            </template>
        </CardFlip>
    </div>
</template>

<script setup lang="ts">
import type { Flashcard } from '~/auto_api';
import CardFlip from 'vue3-card-flip';
import 'vue3-card-flip/dist/style.css';
import type { IVocabFlashcard } from '~/types/vocab-flashcard.types';
import Term from '~/components/flashcard/Term.vue'
import Definition from './Definition.vue';


const props = defineProps<{
    card: IVocabFlashcard;
    isFlipped?: boolean
}>();
const emit = defineEmits<{
    (e: 'flip'): void;
    (e: 'dragStart'): void;
    (e: 'dragEnd'): void;
}>();

// Sử dụng giá trị từ props cho state isFlipped
const isFlipped = computed(() => props.isFlipped || false);

// Drag detection
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);

// Event handlers
const handleMouseDown = (event: MouseEvent) => {
    isDragging.value = false;
    startX.value = event.clientX;
    startY.value = event.clientY;
    emit('dragStart');
};

const handleMouseUp = () => {
    if (!isDragging.value) {
        emit('flip');
    }
    emit('dragEnd');
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
    emit('dragStart');
};

const handleTouchEnd = () => {
    if (!isDragging.value) {
        emit('flip');
    }
    emit('dragEnd');
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

<style scoped></style>