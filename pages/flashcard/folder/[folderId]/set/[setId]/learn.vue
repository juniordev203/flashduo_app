<template>
    <div class="h-full w-full flex flex-col bg-gray-50">
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
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            </span>
          </div>
        </template>
      </AtomHeaderSafe>

    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { 
    ChevronLeft, 
    ChevronRight, 
    X, 
    Check, 
    Star, 
    Volume2, 
    Award
  } from 'lucide-vue-next';
  import { FlashcardStore } from '~/stores/flashcard';
  import { useMyBaseStore } from '~/stores/base.store';
  import type { Flashcard } from '~/auto_api/models';
  
  const route = useRoute();
  const setId = Number(route.params.setId);
  const folderId = Number(route.params.folderId);
  const store = FlashcardStore();
  const userStore = useMyBaseStore();
  const { vocabularies, loading } = storeToRefs(store);
  

  </script>
  
  <style scoped>
  
  </style>