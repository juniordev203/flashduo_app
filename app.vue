<template>
    <div class="w-full overflow-hidden flex flex-col"
        :style="{ height: `calc(var(--vh, 1vh) * 100)` }">
        <!-- slash screen -->
        <!-- <div class="w-full h-full flex flex-col justify-center items-center bg-lightBackground">
            <img src="~/assets/images/logo-circle.png" class="w-[100px]" alt="logo-circle">
        </div> -->
        <NuxtLayout name="app-nav">
            <NuxtPage />
            <!-- Drawer Global -->
            <!-- <UserDrawerChangeLocale />
            <UserDrawerChangeRank /> -->
        </NuxtLayout>
    </div>
</template>
<script lang="ts" setup>


</script>
