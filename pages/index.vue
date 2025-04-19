<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
        <NuxtLink to="/profile">
          <div v-if="userInfo" class="flex gap-1 items-center">
            <div class="w-[40px] h-[40px] rounded-full border border-primary flex justify-center items-center">
              <img class="w-[32px] h-[32px] rounded-full" :src="userInfo.avatarUrl" alt="">
            </div>
            <div class="text-black">
              <p class="text-sm font-light">{{ $t('lang_core_home_hi_guy') }}</p>
              <p class="text-xl font-bold">{{ userInfo.fullName }}</p>
            </div>
          </div>
        </NuxtLink>
      </template>
      <template v-slot:default>
        <span class="text-base font-medium">
        </span>
      </template>
      <template v-slot:right>
        <div class="flex items-center gap-4">
          <button class="p-2 rounded-full transition-colors relative">
            <Bell class="w-5 h-5 text-gray-600" />
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </template>
    </AtomHeaderSafe>
    <div class="h-full w-full overflow-auto p-4 flex flex-col gap-6">
      <div class="flex flex-col gap-6 mb-28">
        <div>
          <Swiper :slides-per-view="1" space-between="20" :autoplay="true" :pagination="{ clickable: true }"
            :modules="[Pagination, Autoplay]" :loop="true" class="rounded-lg">
            <SwiperSlide>
              <div class="w-full h-[250px] flex flex-col">
                <div
                  class="bg-white w-full h-full rounded-lg flex flex-col justify-center items-center text-center py-4 px-8 gap-2 shadow">
                  <img src="~/assets/images/banner-signin.png" class="w-32 h-32">
                  <div class="font-medium">Lộ trình học TOEIC cá nhân hóa</div>
                  <div class="text-xs">Hệ thống bài tập và đề thi theo từng mục tiêu điểm số từ 450-990+</div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="w-full h-[250px] flex flex-col">
                <div
                  class="bg-white w-full h-full rounded-lg flex flex-col justify-center items-center text-center py-4 px-8 gap-2 shadow">
                  <img src="~/assets/images/banner-signin.png" class="w-32 h-32">
                  <div class="font-medium">Linh hoạt từng cấp độ</div>
                  <div class="text-xs">Mở khoá toàn bộ nội dung theo từng cấp độ lựa chọn</div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="w-full h-[250px] flex flex-col">
                <div
                  class="bg-white w-full h-full rounded-lg flex flex-col justify-center items-center text-center py-4 px-8 gap-2 shadow">
                  <img src="~/assets/images/banner-signin.png" class="w-32 h-32">
                  <div class="font-medium">Linh hoạt từng cấp độ</div>
                  <div class="text-xs">Mở khoá toàn bộ nội dung theo từng cấp độ lựa chọn</div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <!-- Horizontal Scrollable Cards -->
        <div class="w-full h-full flex flex-col gap-5">
          <p class="text-lg font-semibold">
            {{ $t('lang_core_home_hoc_cung') }} <span class="text-indigo-500 font-extrabold">{{
              $t('lang_core_home_flashduo') }}</span>
          </p>
          <div class="flex flex-wrap gap-5 justify-center w-full overflow-visible">
            <NuxtLink to="/flashcard"
              class="block transition-transform duration-150 active:scale-95 touch-manipulation">
              <div class="bg-blue-200 px-2 pt-2 pb-5 rounded-lg w-40 h-40 shadow">
                <div class="p-3 relative w-full h-full flex flex-col gap-1 bg-blue-100 rounded-lg">
                  <p class="text-2xl font-bold">{{ $t('lang_core_home_flashcard') }}</p>
                  <p class="text-sm text-gray-500">{{ $t('lang_core_home_lessons') }}</p>
                  <Globe class="absolute bottom-3 left-3" :size="20" />
                </div>
              </div>
            </NuxtLink>
            <NuxtLink to="" class="block transition-transform duration-150 active:scale-95 touch-manipulation">
              <div class="bg-red-200 px-2 pt-2 pb-5 rounded-lg w-40 h-40 shadow">
                <div class="p-3 relative w-full h-full flex flex-col gap-1 bg-red-100 rounded-lg">
                  <p class="text-2xl font-bold">{{ $t('lang_core_home_ngu_phap') }}</p>
                  <p class="text-sm text-gray-500">{{ $t('lang_core_home_lessons') }}</p>
                  <Mic class="absolute bottom-3 left-3" :size="20" />
                  <LockKeyhole class="absolute bottom-3 right-3" :size="20" />
                </div>
              </div>
            </NuxtLink>
            <NuxtLink to="" class="block transition-transform duration-150 active:scale-95 touch-manipulation">
              <div class="bg-violet-200 px-2 pt-2 pb-5 rounded-lg w-40 h-40 shadow">
                <div class="p-3 relative w-full h-full flex flex-col gap-1 bg-violet-100 rounded-lg">
                  <p class="text-2xl font-bold">{{ $t('lang_core_home_reading') }}</p>
                  <p class="text-sm text-gray-500">{{ $t('lang_core_home_lessons') }}</p>
                  <Book class="absolute bottom-3 left-3" :size="20" />
                </div>
              </div>
            </NuxtLink>
            <NuxtLink to="" class="block transition-transform duration-150 active:scale-95 touch-manipulation">
              <div class="bg-indigo-200 px-2 pt-2 pb-5 rounded-lg w-40 h-40 shadow">
                <div class="p-3 relative w-full h-full flex flex-col gap-1 bg-indigo-100 rounded-lg">
                  <p class="text-2xl font-bold">{{ $t('lang_core_home_listening') }}</p>
                  <p class="text-sm text-gray-500">{{ $t('lang_core_home_lessons') }}</p>
                  <Headphones class="absolute bottom-3 left-3" :size="20" />
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <!-- Chat Support -->
      <NuxtLink to="/chat">
        <div class="fixed left-4 right-4 bottom-24 bg-white rounded-full p-4 flex items-center gap-4 shadow-lg">
          <div class="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-0.5">
            <img src="~/assets/images/avatar.jpg" class="w-full h-full rounded-full" alt="AI Assistant" />
          </div>
          <div class="flex-1">
            <h3 class="font-medium text-gray-800">{{ $t('lang_core_home_hoi_voi_ai') }}</h3>
            <p class="text-sm text-gray-500">{{ $t('lang_core_home_bat_dau_cuoc_tro_chuyen') }}</p>
          </div>
          <ChevronRight class="w-5 h-5 text-gray-400" />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Bell, Book, ChevronRight, Globe, Headphones, LockKeyhole, Menu, Mic, Search } from 'lucide-vue-next';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import { useMyBaseStore } from '~/stores/base.store';

const userInfo = computed(() => useMyBaseStore().userInfo);
const authInfo = computed(() => useMyBaseStore().authUser);
const isSearch = ref(false);
const banners = [
  {
    image: '~/assets/images/banner-signin.png',
    title: 'Lộ trình học TOEIC cá nhân hóa'
  },
  {
    image: '~/assets/images/banner-signin.png',
    title: 'Lộ trình học TOEIC cá nhân hóa'
  },
  {
    image: '~/assets/images/banner-signin.png',
    title: 'Lộ trình học TOEIC cá nhân hóa'
  },
]

const handleSearch = () => {
  isSearch.value = !isSearch.value;
}
</script>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.bg-pattern-dots {
  background-image: radial-gradient(currentColor 1px, transparent 1px);
  background-size: 12px 12px;
}

.bg-pattern-lines {
  background-image: linear-gradient(45deg, currentColor 25%, transparent 25%);
  background-size: 20px 20px;
}
</style>