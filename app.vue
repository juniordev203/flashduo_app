<template>
    <div class="w-full overflow-hidden flex flex-col"
        :style="{ height: `calc(var(--vh, 1vh) * 100)` }">
        <!-- slash screen -->
        <!-- <div class="w-full h-full flex flex-col justify-center items-center bg-lightBackground">
            <img src="~/assets/images/logo-circle.png" class="w-[100px]" alt="logo-circle">
        </div> -->
        <NuxtLayout>
            <NuxtPage />
            <!-- Drawer Global -->
            <!-- <UserDrawerChangeLocale />
            <UserDrawerChangeRank /> -->
        </NuxtLayout>
    </div>
</template>
<script lang="ts" setup>
const updateVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
onMounted(() => {
  updateVh();
  window.addEventListener('resize', updateVh);
})

</script>
