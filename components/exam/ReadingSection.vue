<template>
  <div class="w-full h-full flex flex-col">
    <div class="p-4 flex-1 overflow-auto space-y-4">
      <div v-if="currentQuestion" class="">
        <div v-if="currentQuestion.imageUrl" class="">
          <img :src="currentQuestion.imageUrl" alt="" class="max-w-full h-auto">
        </div>
        <div class="flex gap-2">
          <p class="text-lg font-medium text-black">{{ currentIndex + featchIndex }}.</p>
          <p class="text-gray-600">{{ currentQuestion.content }}</p>
        </div>
        <div class="flex flex-col gap-2">
          <div v-for="(option, idx) in currentQuestion.questionAnswers" :key="idx" class="flex gap-2">
            <div class="flex items-center">
              <input :id="`question-${currentQuestion?.id || currentIndex}-option-${idx}`"
                :name="`question-${currentQuestion?.id || currentIndex}`" type="radio" :value="option.optionLabel"
                :checked="currentQuestion?.id !== undefined && answers[currentQuestion.id] === option.optionLabel"
                @click="saveQuestionAnswer(option.optionLabel)" class="w-4 h-4 text-blue-500 border-gray-300">
            </div>
            <div class="text-sm">
              <label :for="`question-${currentIndex}-option-${idx}`" class="font-medium text-gray-600">
                {{ option.optionLabel }}. {{ option.optionText }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="py-10 text-center">
        <p class="text-lg text-gray-500">reading!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from '~/auto_api/models';
import { computed } from 'vue'

const examStore = useExamStore();
const totalQuestion = computed(() => examStore.currentExam?.totalQuestions ?? 0);
const featchIndex = totalQuestion.value/2 + 1;
const props = defineProps<{
  questions: Question[]
  currentIndex: number
  section: number
  answers: Record<number, string>
}>();

const emit = defineEmits<{
  (e: 'save-answer', payload: { questionId: number, section: number, answer: string }): void
  (e: 'change-question', index: number): void
}>();

const currentQuestion = computed(() => {
  return props.questions.length > 0 ? props.questions[props.currentIndex] || null : null;
})

function saveQuestionAnswer(answer: string) {
  if (currentQuestion.value?.id != null) {
    emit('save-answer', { questionId: currentQuestion.value.id, section: props.section, answer })
  }
}
</script>

<style scoped></style>