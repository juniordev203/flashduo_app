<template>
    <div :class="{'text-red-600': timeWarning}" class="text-center">
      <div class="text-sm text-gray-500">Thời gian còn lại</div>
      <div class="text-xl font-semibold">{{ displayTime }}</div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed } from 'vue'
  
  const props = defineProps<{
    seconds: number
  }>()
  
  const displayTime = computed(() => {
    const hours = Math.floor(props.seconds / 3600)
    const minutes = Math.floor((props.seconds % 3600) / 60)
    const secs = props.seconds % 60
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  })
  
  const timeWarning = computed(() => {
    // Cảnh báo khi thời gian còn dưới 5 phút
    return props.seconds < 300
  })
  </script>