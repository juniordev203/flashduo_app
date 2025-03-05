<template>
  <div class="w-full h-screen flex flex-col overflow-hidden">
    <div class="w-full h-full overflow-auto bg-slate-50" :style="{
      paddingLeft: safeArea.left + 'px',
      paddingRight: safeArea.right + 'px'
    }">
      <slot />
    </div>
    <AtomNavigation />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { defaultSafeAreaInsets, getSafeAreaInsets } from '../utils/screen.utils.ts'

const safeArea = ref(defaultSafeAreaInsets());

onMounted(async () => {
  safeArea.value = await getSafeAreaInsets();
});
</script>

<style scoped></style>