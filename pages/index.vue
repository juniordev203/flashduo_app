<template>
  <div class="h-full w-full flex flex-col">
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
        <NuxtLink to="/profile">
          <div class="flex gap-1">
            <img src="../assets/images/avatar.jpg" class="w-10 h-10 rounded-full mr-2" alt="Profile avatar" />
            <div>
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
        <Bell :size="20" fill="white" />
      </template>
    </AtomHeaderSafe>
    <div class="p-4 max-w-screen-lg mx-auto">
      <div class="flex flex-col gap-4">
        <!-- Search -->
        <div class="flex items-center border border-gray-200 rounded-lg px-3 py-3 mb-4">
          <Search color="black" :size="22" />
          <input class="flex-1 ml-2 text-base outline-none bg-slate-50" placeholder="Tìm kiếm khóa học của bạn..." type="text" />
        </div>
        <!-- Horizontal Scrollable Cards -->
        <div class="relative overflow-x-auto">
          <p class="text-lg font-semibold mb-2">
            Học cùng <span class="text-indigo-500 font-extrabold">Flashduo</span>
          </p>
          <div class="flex gap-5">
            <NuxtLink to="" class="block">
              <div class="flex-1 bg-green-200 p-2 rounded-lg w-40 h-40 shadow">
                <div class="flex flex-col gap-1 p-2 rounded-lg">
                  <p class="text-2xl font-bold">Flashcard</p>
                  <p class="text-sm text-gray-500">28 Lessons</p>
                  <Globe :size="20" />
                </div>
              </div>
            </NuxtLink>
            <!-- <div class="flex-1 bg-yellow-200 p-2 rounded-lg w-56 h-52 shadow cursor-pointer">
                <div class="flex flex-col gap-1 p-2 rounded-lg">
                  <p class="text-2xl font-bold">Luyện đọc cùng AI</p>
                  <p class="text-sm text-gray-500">28 Lessons</p>
                  <Mic :size="20" />
                </div>
              </div>
              <div class="flex-1 bg-violet-200 p-2 rounded-lg w-56 h-52 shadow cursor-pointer">
                <div class="flex flex-col gap-1 bg-blue-100 p-2 rounded-lg">
                  <p class="text-2xl font-bold">TOEIC READING</p>
                  <p class="text-sm text-gray-500">28 Lessons</p>
                  <Book :size="20" />
                </div>
              </div>
              <div class="flex-1 bg-indigo-300 p-2 rounded-lg w-56 h-52 shadow cursor-pointer">
                <div class="flex flex-col gap-1 bg-blue-100 p-2 rounded-lg">
                  <p class="text-2xl font-bold">TOEIC LISTENING</p>
                  <p class="text-sm text-gray-500">28 Lessons</p>
                  <Headphones :size="20" />
                </div>
              </div> -->
          </div>
        </div>
        <!-- All Courses -->
        <div class="">
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
        </div>
        <div class="">
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
        </div>

      </div>
      <!-- Chat Support -->
      <div class="fixed left-4 right-4 bottom-20 bg-white p-4 rounded-full flex items-center shadow-lg cursor-pointer">
        <img src="../assets/images/avatar.jpg" class="w-10 h-10 rounded-full mr-2" alt="Help desk" />
        <div class="flex-1">
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