<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
        <NuxtLink to="/profile">
          <div class="flex gap-1">
            <img src="../assets/images/avatar.jpg" class="w-10 h-10 rounded-full mr-2" alt="Profile avatar" />
            <div class="text-black">
              <p class="text-sm font-light">Hi, Guy!</p>
              <p class="text-xl font-bold">Junior203</p>
            </div>
          </div>
        </NuxtLink>
      </template>
      <template v-slot:default>
        <span class="text-base font-medium">
        </span>
      </template>
      <template v-slot:right>
        <Bell :size="20" class="text-black" fill="bg-black" />
      </template>
    </AtomHeaderSafe>
    <div class="h-full w-full overflow-auto p-4 flex flex-col gap-6">
      <div class="flex flex-col gap-4 mb-28">
        <!-- Search -->
        <div class="flex items-center border border-gray-200 rounded-lg px-3 py-3 mb-4">
          <Search color="black" :size="22" />
          <input class=" ml-2 text-base outline-none bg-slate-50" placeholder="Tìm kiếm khóa học của bạn..."
            type="text" mode="text"/>
        </div>
        <!-- Horizontal Scrollable Cards -->
        <div class="w-full h-full flex flex-col gap-5 justify-center items-center">
          <p class="text-lg font-semibold">
            Học cùng <span class="text-indigo-500 font-extrabold">Flashduo</span>
          </p>
          <div class="flex flex-wrap gap-5 justify-center w-full overflow-visible">
            <NuxtLink to="/functions/flashcard" class="block transition-transform duration-150 active:scale-95 touch-manipulation">
              <div class="bg-blue-200 px-2 pt-2 pb-5 rounded-lg w-40 h-40 shadow">
                <div class="p-3 relative w-full h-full flex flex-col gap-1 bg-blue-100 rounded-lg">
                  <p class="text-2xl font-bold">Flashcard</p>
                  <p class="text-sm text-gray-500">28 Lessons</p>
                  <Globe class="absolute bottom-3 left-3" :size="20" />
                </div>
              </div>
            </NuxtLink>
            <NuxtLink to="" class="block transition-transform duration-150 active:scale-95 touch-manipulation">
              <div class="bg-red-200 px-2 pt-2 pb-5 rounded-lg w-40 h-40 shadow">
                <div class="p-3 relative w-full h-full flex flex-col gap-1 bg-red-100 rounded-lg">
                  <p class="text-2xl font-bold">Ngữ pháp</p>
                  <p class="text-sm text-gray-500">28 Lessons</p>
                  <Mic class="absolute bottom-3 left-3" :size="20" />
                </div>
              </div>
            </NuxtLink>
            <NuxtLink to="" class="block transition-transform duration-150 active:scale-95 touch-manipulation">
              <div class="bg-violet-200 px-2 pt-2 pb-5 rounded-lg w-40 h-40 shadow">
                <div class="p-3 relative w-full h-full flex flex-col gap-1 bg-violet-100 rounded-lg">
                  <p class="text-2xl font-bold">READING</p>
                  <p class="text-sm text-gray-500">28 Lessons</p>
                  <Book class="absolute bottom-3 left-3" :size="20" />
                </div>
              </div>
              </NuxtLink>
              <NuxtLink to="" class="block transition-transform duration-150 active:scale-95 touch-manipulation">
                <div class="bg-indigo-200 px-2 pt-2 pb-5 rounded-lg w-40 h-40 shadow">
                  <div class="p-3 relative w-full h-full flex flex-col gap-1 bg-indigo-100 rounded-lg">
                    <p class="text-2xl font-bold">LISTENING</p>
                    <p class="text-sm text-gray-500">28 Lessons</p>
                    <Headphones class="absolute bottom-3 left-3" :size="20" />
                  </div>
                </div>
              </NuxtLink>
          </div>
        </div>
        <!-- All Courses -->
        <!-- <div class="">
          <div class="flex justify-between items-center mb-2">
            <p class="text-lg font-semibold">Tất cả khóa học</p>
            <p class="text-xs text-blue-500 underline decoration-gray-500 cursor-pointer">Xem thêm</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button class="bg-white border border-gray-200 rounded-full px-4 py-2">
              <p class="text-sm">Luyện nói TOEIC</p>
            </button>
            <button class="bg-green-100 border border-green-500 rounded-full px-4 py-2">
              <p class="text-sm text-green-500">Luyện nghe TOEIC</p>
            </button>
            <button class="bg-white border border-gray-200 rounded-full px-4 py-2">
              <p class="text-sm">TOEIC 800+</p>
            </button>
            <button class="bg-yellow-100 border border-yellow-500 rounded-full px-4 py-2">
              <p class="text-sm text-yellow-500">IELTS</p>
            </button>
          </div>
        </div> -->
      </div>
      <!-- Chat Support -->
      <div class="fixed left-4 right-4 bottom-28 bg-white p-4 rounded-full flex items-center shadow-lg cursor-pointer">
        <img src="../assets/images/avatar.jpg" class="w-10 h-10 rounded-full mr-2" alt="Help desk" />
        <div class="">
          <p class="text-lg font-semibold">Hỏi với AI</p>
          <p class="text-sm text-gray-500">Bắt đầu cuộc trò chuyện ngay !</p>
        </div>
        <ChevronRight :size="16" class="text-gray-500" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Bell, Book, ChevronRight, Globe, Headphones, Mic, Search } from 'lucide-vue-next';

</script>

<style scoped>
/* Loại bỏ thanh cuộn ngang nhưng vẫn cho phép cuộn */
.overflow-x-auto {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}
</style>