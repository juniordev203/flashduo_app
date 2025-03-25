<template>
  <header class="px-4 py-2 w-full h-fit bg-white shadow rounded">
    <div class="w-full">
      <div class="flex justify-between items-center">
        <div class="flex flex-col justify-between">
          <h1 class="text-xl font-bold text-black">{{ examStore.currentExam?.examName || 'Đang tải ...'}}</h1>
          <p class="text-sm text-gray-500">{{ currentSectionLabel }}</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="text-center">
            <div class="text-xl font-semibold" :class="timeWarning ? 'text-red-600' : 'text-gray-800'">
              {{ formatTime(timeRemaining) }}
            </div>
          </div>
          <button 
            @click="$emit('toggle-section')" 
            class="px-3 py-1 flex gap-1 bg-gray-100 text-black text-xs rounded"
          >
          <ArrowRightLeft class="w-4 h-4"/> Chuyển 
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ExamResponse } from '~/auto_api';
import { useExamStore } from '~/stores/exam'
import type { Exam } from '~/types/exam.types'
import { ArrowRightLeft } from 'lucide-vue-next'
import { QuestionSectionEnum } from '~/constants/enum';
const route = useRoute();
const examStore = useExamStore()


const props = defineProps<{
  timeRemaining: number
  examInfo: ExamResponse | null
}>()

const emit = defineEmits<{
  (e: 'toggle-section'): void
}>()

const currentSectionLabel = computed(() => {
  return examStore.currentSection === QuestionSectionEnum.Listening ? 'Listening' : 'Reading'
})

const timeWarning = computed(() => {
  // Hiển thị cảnh báo khi thời gian còn dưới 5 phút
  return props.timeRemaining < 300
})

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
const examId = Number(route.params.id)
onMounted(() => {
  examStore.fetchExam(Number(examId))
})
</script>