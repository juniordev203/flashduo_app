<template>
  <div class="shadow-md border-t-[1px]" :style="{
      paddingBottom: safeArea.bottom + 'px',
      paddingLeft: safeArea.left + 'px',
      paddingRight: safeArea.right + 'px',
    }">
    <div class="grid grid-cols-4 p-2">
      <router-link to="/" class="flex flex-col justify-center gap-1 items-center"
        :class="{ 'menu-active': route.name?.toString().startsWith('index') }">
        <Home class="nav_icon text-[#d9d9d9]"/>
        <span class="text-sm text-[#d9d9d9]">Trang chủ</span>
      </router-link>
      <router-link to="/exam" class="flex flex-col justify-center gap-1 items-center"
        :class="{ 'menu-active': route.name?.toString().startsWith('exam') }">
        <SquarePen class="nav_icon text-[#d9d9d9]"/>
        <span class="text-sm text-[#d9d9d9]">Thi thử</span>
      </router-link>
      <router-link to="/forum" class="flex flex-col justify-center gap-1 items-center"
        :class="{ 'menu-active': route.name?.toString().startsWith('forum') }">
        <MessagesSquare class="nav_icon text-[#d9d9d9]"/>
        <span class="text-sm text-[#d9d9d9]">Diễn đàn</span>
      </router-link>
      <router-link to="/profile" class="flex flex-col justify-center gap-1 items-center"
        :class="{ 'menu-active': route.name?.toString().startsWith('profile') }">
        <UserPen class="nav_icon text-[#d9d9d9]"/>
        <span class="text-sm text-[#d9d9d9]">Tài khoản</span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { defaultSafeAreaInsets, getSafeAreaInsets } from '~/utils/screen.utils.ts';
import { Home, SquarePen, MessagesSquare, UserPen } from 'lucide-vue-next';

const route = useRoute();
const safeArea = ref(defaultSafeAreaInsets());

onMounted(async () => {
  safeArea.value = await getSafeAreaInsets();
});
</script>

<style scoped>
.menu-active, .menu-active .text-sm {
  color: indigo !important;
}

.menu-active .nav_icon {
  color: #4f46e5 !important;
  }
</style>