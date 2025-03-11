<template>
  <div class="h-full w-full flex flex-col bg-slate-100">
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
      </template>
      <template v-slot:default>
        <h1 class="text-xl text-black font-bold">Diễn đàn Flashduo</h1>
      </template>
      <template v-slot:right>
      </template>
    </AtomHeaderSafe>

    <div class="h-full w-full overflow-auto p-4 flex flex-col gap-6">
      <div class="p-2 w-full flex gap-4 items-center rounded">
        <div class="w-[40px] h-[40px] rounded-full border border-primary flex justify-center items-center">
          <img class="w-[32px] h-[32px] rounded-full" src="~/assets/images/avatar.jpg" alt="">
        </div>
        <div class="flex-1">
          <button class="w-full h-12 px-4 py-2 text-left text-gray-500 rounded hover:bg-gray-200"
            @click="$router.push('/post/new')">
            Bạn đang nghĩ gì?
          </button>
        </div>
      </div>
      <el-divider class="m-0!"></el-divider>
      <div class="">
        <!-- Feed -->
        <div class="feed px-4">
          <!-- Thread Item -->
          <div v-for="(thread, index) in threads" :key="index" class="thread border-b border-gray-800 py-4">
            <div class="flex">
              <!-- Avatar and Thread Line -->
              <div class="flex flex-col items-center mr-3">
                <img :src="thread.avatar" alt="Profile" class="w-10 h-10 rounded-full object-cover" />
                <div v-if="index < threads.length - 1" class="w-0.5 bg-gray-800 grow mt-2"></div>
              </div>

              <!-- Thread Content -->
              <div class="flex-1">
                <!-- Thread Header -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <h4 class="font-semibold text-sm">{{ thread.username }}</h4>
                    <span v-if="thread.verified" class="ml-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-4 h-4 text-blue-500">
                        <path fill-rule="evenodd"
                          d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                          clip-rule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <div class="flex items-center text-gray-500">
                    <span class="text-xs">{{ thread.time }}</span>
                    <button class="ml-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Thread Body -->
                <div class="mt-2">
                  <p class="text-sm">{{ thread.content }}</p>
                  <img v-if="thread.image" :src="thread.image" :alt="'Post by ' + thread.username"
                    class="mt-3 rounded-lg w-full h-auto max-h-96 object-cover" />
                </div>

                <!-- Thread Actions -->
                <div class="flex items-center mt-3 space-x-4">
                  <button class="thread-action">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                  <button class="thread-action">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                    </svg>
                  </button>
                  <button class="thread-action">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                    </svg>
                  </button>
                  <button class="thread-action">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </button>
                </div>

                <!-- Thread Stats -->
                <div class="mt-2 text-xs text-gray-500">
                  <span>{{ thread.replies }} replies</span>
                  <span class="mx-1">·</span>
                  <span>{{ thread.likes }} likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- filepath: /pages/forum.vue -->
<script setup lang="ts">
import { SearchIcon, BellIcon, MessageCircleIcon } from 'lucide-vue-next'
import { useMyBaseStore } from '~/stores/base.store';
import { usePosts } from '~/composables/usePosts';
import { on } from 'events';
const { posts } = usePosts()
const baseStore = useMyBaseStore();
const userdata = baseStore.userInfo;
console.log(1121)
console.log(userdata);

const accountId = baseStore.authUser?.id;
const testApiUser = async () => {
  const res = await userApiUtil.apiUserInfoUserGet(accountId)
  console.log(res)
}
onMounted(() => {
  testApiUser()
})

const threads = [
  {
    username: 'markzuckerberg',
    verified: true,
    avatar: '',
    time: '3h',
    content: 'Exciting news! We\'re rolling out new features for Threads. Stay tuned for updates on audio messages, polls, and more customization options.',
    image: '',
    replies: 487,
    likes: '23.4K'
  },
  {
    username: 'techinsider',
    verified: true,
    avatar: '',
    time: '5h',
    content: 'AI is transforming how we interact with technology. What features would you like to see powered by AI in your daily apps?',
    image: null,
    replies: 124,
    likes: '2.1K'
  },
  {
    username: 'travelmoments',
    verified: false,
    avatar: '',
    time: '7h',
    content: 'Sunrise at Bali. Sometimes the best moments are unplanned. ✨',
    image: '',
    replies: 43,
    likes: '1.8K'
  },
  {
    username: 'foodielife',
    verified: false,
    avatar: '',
    time: '1d',
    content: 'Made this homemade pasta from scratch today! The secret is in the sauce. Recipe in comments.',
    image: '',
    replies: 76,
    likes: '952'
  }
]
</script>