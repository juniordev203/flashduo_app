<template>
  <div class="bg-indigo-600 shadow" :style="{
    paddingTop: safeArea.top + 'px',
    paddingLeft: safeArea.left + 'px',
    paddingRight: safeArea.right + 'px',
  }">
    <div class="relative w-full h-[60px] flex text-white justify-between items-center px-4">
      <div>
        <slot name="left"></slot>
      </div>
      <div>
        <slot></slot>
      </div>
      <div>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const safeArea = ref(defaultSafeAreaInsets());

onMounted(async () => {
  safeArea.value = await getSafeAreaInsets();
});
</script>

<style></style>