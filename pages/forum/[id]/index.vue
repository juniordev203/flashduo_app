<template>
    <div class="w-full h-full flex flex-col bg-slate-50">
        <AtomHeaderSafe class="shadow-md">
            <template v-slot:left>
                <NuxtLink to="/forum">
                    <div class="flex gap-2 items-center text-black">
                        <ChevronLeft class="w-6 h-6" />
                        <p class="text-lg">Quay lại</p>
                    </div>
                </NuxtLink>
            </template>
            <template v-slot:default>
                <span class="text-xl text-black font-medium">
                </span>
            </template>
            <template v-slot:right>
                <div class="text-black rounded-full border-2 border-black ">
                    <Ellipsis class="w-4 h-4" />
                </div>
            </template>
        </AtomHeaderSafe>
        <div class="h-full w-full overflow-auto p-4 flex flex-col gap-6">
            <div v-for="(thread, index) in threads" :key="index" class="thread py-4">
                <div class="flex mb-3">
                    <div class="flex flex-col items-center mr-3">
                        <img :src="thread.avatar" alt="Profile" class="w-10 h-10 rounded-full object-cover" />
                        <div v-if="index < threads.length - 1" class="w-0.5 bg-gray-800 grow mt-2"></div>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <h4 class="font-semibold text-sm">{{ thread.username }}</h4>
                            </div>
                            <div class="flex items-center text-gray-500">
                                <span class="text-xs">{{ thread.time }}</span>
                                <button class="ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="mt-2">
                            <p class="text-sm">{{ thread.content }}</p>
                            <img v-if="thread.image" :src="thread.image" :alt="'Post by ' + thread.username"
                                class="mt-3 rounded-lg w-full h-auto max-h-96 object-cover" />
                        </div>
                        <div class="flex items-center mt-3 space-x-4">
                            <div class="flex gap-2 items-center">
                                <button class="thread-action">
                                    <Heart class="w-5 h-5 text-gray-700" />
                                </button>
                                <span class="text-xs text-gray-500">{{ thread.likes }}</span>
                            </div>
                            <div class="flex gap-2 items-center">
                                <button class="thread-action">
                                    <MessageCircle class="w-5 h-5 text-gray-700" />
                                </button>
                                <span class="text-xs text-gray-500">{{ thread.replies }}</span>
                            </div>
                        </div>
                        <div class="mt-2 text-xs text-gray-500">
                            <span class="mx-1">·</span>
                        </div>
                    </div>
                </div>
                <el-divider class="!m-0"></el-divider>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ChevronLeft, Ellipsis, Heart, MessageCircle, Share2 } from 'lucide-vue-next'
const threads = [
    {
        username: 'Junior',
        verified: true,
        avatar: 'assets/images/avatar_default.jpg',
        time: '3h',
        content: 'Hãy chia sẻ kinh nghiệm học tiếng Anh của bạn!',
        image: '',
        replies: 487,
        likes: '23.4K'
    },
]
</script>

<style lang="scss" scoped></style>