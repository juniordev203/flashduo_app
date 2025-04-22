<template>
    <div v-loading.fullscreen.lock = "loadingApp" class="w-full overflow-hidden flex flex-col"
        :style="{ height: `calc(var(--vh, 1vh) * 100)` }">
        <!-- slash screen -->
        <div v-if="!appReady" class="w-full h-full flex flex-col justify-center items-center bg-lightBackground">
            <img src="~/assets/images/flash_screen.png" class="w-full h-full object-cover" alt="logo-circle">
        </div>
        <NuxtLayout v-else>
            <NuxtPage />
            <UserDrawerChangeLocale />
        </NuxtLayout>
    </div>
</template>
<script lang="ts" setup>
import { useMyBaseStore } from '~/stores/base.store';
import { useLangStore } from '~/stores/lang';

const langStore = useLangStore();
const myBaseStore = useMyBaseStore();
const { loadingApp, appReady } = storeToRefs(useMyBaseStore());
const updateVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
const makeAuth = async () => {
  try {
    await Promise.all([
      myBaseStore.loadAuthUser(),
      myBaseStore.loadLocale()
    ]);
    return true;
  } catch (error) {
    return false;
  }
}
onMounted(async () => {
  updateVh();
  window.addEventListener('resize', updateVh);
  try {
    const authSuccess = await makeAuth();
    await langStore.initializeLocale();

    const startTime = Date.now();
    const elapsedTime = Date.now() - startTime;
    const minimumSplashTime = 1000;

    if (elapsedTime < minimumSplashTime) {
      await new Promise(resolve => 
        setTimeout(resolve, minimumSplashTime - elapsedTime)
      );
    }
    appReady.value = true;
  } catch (error) {
    console.error("Lỗi khi khởi tạo app!", error);
  }
})
onUnmounted(() => {
  window.removeEventListener('resize', updateVh);
})

</script>
