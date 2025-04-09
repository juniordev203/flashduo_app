<template>
    <div
      class="w-[90%] h-72 mx-auto perspective"
      @click="flipped = !flipped"
    >
      <div
        class="relative w-full h-full duration-500 transform-style-preserve-3d"
        :class="{ 'rotate-y-180': flipped }"
      >
        <!-- Front -->
        <div class="absolute w-full h-full bg-blue-100 rounded-xl flex items-center justify-center text-2xl font-bold backface-hidden">
          {{ card.word }}
        </div>
  
        <!-- Back -->
        <div class="absolute w-full h-full bg-white rounded-xl p-4 rotate-y-180 backface-hidden flex flex-col items-center justify-center gap-2">
          <p class="text-lg font-medium">{{ card.meaning }}</p>
          <img :src="card.imageUrl" alt="" class="w-24 h-24 object-cover rounded" v-if="card.imageUrl" />
          <p class="text-sm text-gray-500 italic">{{ card.example }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  defineProps({ card: Object })
  const flipped = ref(false)
  </script>
  
  <style scoped>
  .perspective {
    perspective: 1000px;
  }
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
  </style>
  