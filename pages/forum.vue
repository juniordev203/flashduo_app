<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
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
      <div class="flex justify-between items-center">
        <div class="p-2 w-full flex gap-4 items-center rounded">
          <div class="w-[40px] h-[40px] rounded-full border border-primary flex justify-center items-center">
            <img class="w-[32px] h-[32px] rounded-full" src="~/assets/images/avatar.jpg" alt="">
          </div>
          <div class="flex flex-col">
            <p class="">Junior</p>
            <button class="w-full rounded text-md text-gray-400">
              Đăng chủ đề thảo luận!
            </button>
          </div>
        </div>
        <Bell fill="bg-black" />
      </div>
      <div class="flex flex-col gap-2">
        <p class="">Chọn danh mục của bạn!</p>
        <div class="flex gap-4 flex-wrap">
          <div class="px-2 py-1 flex justify-center items-center rounded border-2 border-indigo-500">
            <p class="">Từ vựng</p>
          </div>
          <div class="px-2 py-1 flex justify-center items-center rounded border-2 border-violet-500">
            <p class="">Ngữ pháp</p>
          </div>
          <div class="px-2 py-1 flex justify-center items-center rounded border-2 border-blue-500">
            <p class="">Luyện nghe</p>
          </div>
          <div class="px-2 py-1 flex justify-center items-center rounded border-2 border-yellow-500">
            <p class="">Luyện đọc</p>
          </div>
          <div class="px-2 py-1 flex justify-center items-center rounded border-2 border-rose-500 ">
            <p class="">Kinh nghiệm thi</p>
          </div>
        </div>
      </div>
      <el-divider class="!m-0"></el-divider>
      <div class="">
        <!-- Feed -->
        <div class="flex flex-col gap-2">
          <p class="">Chủ đề</p>
          <div class="flex flex-col gap-4">
            <!-- Chủ đề 1 -->
            <NuxtLink to="/forum-topic">
              <div class="flex flex-col gap-3 bg-white p-4 rounded-lg shadow-md">
                <p class="font-bold text-lg text-blue-600">Cách đạt 900+ TOEIC trong 3 tháng</p>
                <div class="flex flex-col gap-2">
                  <p class="text-gray-600 text-sm">
                    Chia sẻ lộ trình học hiệu quả giúp bạn đạt điểm cao trong kỳ thi TOEIC.
                  </p>
                  <div class="flex justify-between text-xs text-gray-500">
                    <div class="flex gap-4 ">
                      <div class="flex gap-2">
                        <UserPen class="w-4 h-4" />
                        <p class="">Junior</p>
                      </div>
                      <div class="flex gap-2">
                        <Clock class="w-4 h-4" />
                        <p>9/03/2024</p>
                      </div>
                    </div>
                    <div class="flex gap-2 text-black">
                      <Tag class="w-4 h-4" />
                      <p class="">Kinh nghiệm thi</p>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
            <NuxtLink to="/forum-topic">
              <div class="flex flex-col gap-3 bg-white p-4 rounded-lg shadow-md">
                <p class="font-bold text-lg text-blue-600">1000+ từ vựng TOEIC thường gặp</p>
                <div class="flex flex-col gap-2">
                  <p class="text-gray-600 text-sm">
                    Danh sách từ vựng phổ biến nhất trong đề thi TOEIC giúp bạn nâng cao điểm số.
                  </p>
                  <div class="flex justify-between text-xs text-gray-500">
                    <div class="flex gap-4 ">
                      <div class="flex gap-2">
                        <UserPen class="w-4 h-4" />
                        <p class="">Junior</p>
                      </div>
                      <div class="flex gap-2">
                        <Clock class="w-4 h-4" />
                        <p>9/03/2024</p>
                      </div>
                    </div>
                    <div class="flex gap-2 text-black">
                      <Tag class="w-4 h-4" />
                      <p class="">Từ vựng</p>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { SearchIcon, Bell, MessageCircleIcon, Plus, UserPen, Clock, Tag } from 'lucide-vue-next'
import { useMyBaseStore } from '~/stores/base.store';

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

</script>