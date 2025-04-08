<template>
    <div class="bg-white shadow overflow-hidden rounded-lg mb-4">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ question.id }}. {{ question.text }}
        </h3>
        
        <div class="mt-4 space-y-2">
          <div v-for="(option, index) in question.options" :key="index"
            class="flex items-center">
            <input
              :id="`question_${question.id}_option_${index}`"
              name="radio"
              type="radio"
              :value="option.value"
              :checked="modelValue === option.value"
              @change="$emit('update:modelValue', option.value)"
              class="focus:ring-toeic-blue h-4 w-4 text-toeic-blue border-gray-300"
            />
            <label
              :for="`question_${question.id}_option_${index}`"
              class="ml-3 block text-sm font-medium text-gray-700"
            >
              {{ option.label }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import type { Question } from '~/types/exam.types'
  
  const props = defineProps<{
    question: Question
    modelValue: string
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()
  </script>