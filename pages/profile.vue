<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
      </template>
      <template v-slot:default>
        <span class="text-xl text-black font-medium">
          Cá nhân
        </span>
      </template>
      <template v-slot:right>
      </template>
    </AtomHeaderSafe>
    <div class="h-full w-full overflow-auto p-4 flex flex-col gap-6">
      <div class="flex justify-between items-center">
        <div class="flex gap-4 items-center">
          <div class="w-[40px] h-[40px] rounded-full border border-primary flex justify-center items-center">
            <img class="w-[32px] h-[32px] rounded-full" src="~/assets/images/avatar.jpg" alt="">
          </div>
          <div class="flex flex-col justify-between">
            <p class="text-lg">Junior</p>
            <p class="text-xs">Ngày tạo: </p>
          </div>
        </div>
      </div>
      <!-- box 1 -->
      <div class="bg-white rounded shadow flex flex-col px-4">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div>
              <BellRing :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>Bật chuông thông báo</p>
            </div>
          </div>
          <div class="flex items-center">
            <button
              class="toggle-btn relative w-11 h-7 flex items-center rounded-full transition-colors duration-300"
              :class="actionBtnNotice ? 'bg-indigo-600' : 'bg-gray-300'" @click="toggleBtnNotice">
              <span
                class="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300"
                :class="{ 'translate-x-4 absolute top-0.5 right-0.5': actionBtnNotice }"></span>
            </button>
          </div>
        </div>
        <el-divider class="!m-0"></el-divider>
        <!-- 2 -->
        <div class="flex justify-between items-center py-4" @click="drawerChangeLocale = true">
          <div class="flex items-center gap-4">
            <div>
              <Globe :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>Ngôn ngữ</p>
            </div>
          </div>
          <div class="text-xs">
            <div class="flex gap-2 items-center">
              <span>Tiếng việt</span>
              <img src="~/public/flag/vi.png" class="w-[30px] rounded" alt="flag">
            </div>
          </div>
        </div>
        <el-divider class="!m-0"></el-divider>
        <!-- 3 -->
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div class="user-icon">
              <SunMoon :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>Giao diện tối</p>
            </div>
          </div>
          <div class="flex items-center">
            <button
              class="toggle-btn relative w-11 h-7 flex items-center rounded-full transition-colors duration-300"
              :class="actionBtnTheme ? 'bg-indigo-600' : 'bg-gray-300'" @click="toggleBtnTheme">
              <span
                class="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300"
                :class="{ 'translate-x-4 absolute top-0.5 right-0.5': actionBtnTheme }"></span>
            </button>
          </div>
        </div>
        <el-divider class="!m-0"></el-divider>
        <!-- 4 -->
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div class="user-icon">
              <Share2 :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>Chia sẻ ứng dụng</p>
            </div>
          </div>
        </div>
        <el-divider class="!m-0"></el-divider>
        <!-- 5 -->
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div class="user-icon">
              <AlarmClock :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>{{ $t('lang-core_nhac_nho_hoc_tap') }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- box 2 -->
      <div class="bg-white rounded shadow flex flex-col px-4">
        <!-- 1 -->
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div class="">
              <ShieldQuestion :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>Trung tâm hỗ trợ</p>
            </div>
          </div>
        </div>
        <el-divider class="!m-0"></el-divider>
        <!-- 2 -->
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div class="">
              <Star :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>Đánh giá 5 sao</p>
            </div>
          </div>
          <div class="">
            <div class="flex items-center">
              <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 22 20">
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 22 20">
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 22 20">
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 22 20">
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 22 20">
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </div>
          </div>
        </div>
        <el-divider class="!m-0"></el-divider>
        <!-- 3 -->
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div class="user-icon">
              <UserRoundPen :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>Điều khoản ứng dụng</p>
            </div>
          </div>
        </div>
        <el-divider class="!m-0"></el-divider>
        <!-- 4 -->
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div class="user-icon">
              <Share2 :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>Phiên bản</p>
            </div>
          </div>
          <div class="text-xs text-primary">
            <p>2.0.5</p>
          </div>
        </div>
        <el-divider class="!m-0"></el-divider>
        <!-- 5 -->
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div class="user-icon">
              <BookOpenText :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>Hướng dẫn sử dụng</p>
            </div>
          </div>
        </div>
      </div>
      <button @click="handleLogout" class="w-full p-3 flex bg-red-500 text-white gap-2 justify-center items-center text-center rounded">
      Đăng xuất
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BellRing, Globe, AlarmClock, Share2, SunMoon, ShieldQuestion, Star, UserRoundPen, BookOpenText, LogOut } from 'lucide-vue-next';
import type { UserResponse } from '~/auto_api';


const { drawerChangeLocale } = storeToRefs(useMyBaseStore());
const actionBtnNotice = ref(false)
const actionBtnTheme = ref(false)
const router = useRouter()
const userInfo = ref<UserResponse | null>(null)
const isLoading = ref(false)
const isLoggedIn = ref(false)

const fetchUserData = async () => {
  try {
    isLoading.value = true
    const accountId = localStorage.getItem('accountId')
    if (!accountId) {
      isLoggedIn.value = false
      return
    }
    const { data } = await userApiUtil.apiUserInfoUserGet(Number(accountId))
    userInfo.value = data
    isLoggedIn.value = true
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
const toggleBtnNotice = () => {
  actionBtnNotice.value = !actionBtnNotice.value;
}
const toggleBtnTheme = () => {
  actionBtnTheme.value = !actionBtnTheme.value;
}
const handleLogout = async () => {
  await logoutUser();
  router.push('/login')
}
onMounted(() => {
  fetchUserData()
})
</script>

<style scoped></style>