<template>
    <div class="h-full w-full flex flex-col bg-slate-50">
        <AtomHeaderSafe class="shadow-sm bg-white">
      <template v-slot:left>
        <NuxtLink :to="`/flashcard/folder/${folderId}/set/${setId}`">
          <ChevronLeft class="w-6 h-6 text-gray-500" />
        </NuxtLink>
      </template>
      <template v-slot:default>
        <div class="flex gap-2 items-center text-lg text-gray-800">
            <Clock class="w-5 h-5"/>
            <div class="w-5">
                <p>{{ formatTime(elapsedMilliseconds) }}</p>
            </div>
        </div>
      </template>
      <template v-slot:right>
        <button></button>
      </template>
    </AtomHeaderSafe>
    </div>
</template>

<script setup lang="ts">
import { ChevronLeft, Clock } from 'lucide-vue-next'
import { FlashcardStore } from "~/stores/flashcard"

definePageMeta({
    layout: 'app-none'
})

const route = useRoute();
const flashcardStore = FlashcardStore();
//lay folderId va setId tu params
const folderId = Number(route.params.folderId);
const setId = Number(route.params.setId)
//khai bao bien timer de luu thoi gian hoan thanh
const elapsedMilliseconds = ref(0);
let intervalId: ReturnType<typeof setInterval> | null = null;
const router = useRouter();

onMounted(() => {
    startTimer();
})

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
};

</script>

<style scoped>

</style>