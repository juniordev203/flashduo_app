<template>
    <div class="h-full w-full flex flex-col bg-slate-100">
      <AtomHeaderSafe>
        <span class="text-base font-medium">{{ $t('lang_core_tai_khoan') }}</span>
      </AtomHeaderSafe>
      <div class="h-full w-full overflow-auto p-4 flex flex-col gap-6">
        <!-- Auth -->
        <div class="bg-white rounded flex gap-4 items-center shadow p-4">
          <div class="w-[40px] h-[40px] rounded-full border border-primary flex justify-center items-center">
            <img class="w-[32px] h-[32px] rounded-full" src="~/assets/images/avatar.jpg" alt="">
          </div>
          <NuxtLink to="/login">
            <div class="text-sm font-medium">{{ $t('lang_core_dang_nhap') }}</div>
          </NuxtLink>
          <el-divider direction="vertical"/>
          <NuxtLink to="/register">
            <div class="text-sm font-medium">{{ $t('lang_core_dang_ky') }}</div>
          </NuxtLink>
        </div>
        <!-- box 1 -->
        <div class="bg-white rounded shadow flex flex-col px-4">
          <div class="flex justify-between items-center py-4">
            <div class="flex items-center gap-4">
              <div>
                <BellRing :width="20" :stroke-width="2" />
              </div>
              <div class="">
                <p>{{ $t('lang_core_bat_chuong_thong_bao') }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <button
                class="toggle-btn relative w-11 h-7 flex items-center bg-indigo-600 rounded-full transition-colors duration-300"
                :class="{ 'bg-gray-300': !actionBtnNotice }" @click="toggleBtnNotice">
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
                <p>{{ $t('lang_core_ngon-ngu') }}</p>
              </div>
            </div>
            <div class="text-xs">
              <div class="flex gap-2 items-center">
                <span>{{ $t('lang_core_' + $i18n.locale) }}</span>
                <img :src="'/flag/' + $i18n.locale + '.png'" class="w-[30px] rounded" alt="flag">
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
                <p>{{ $t('lang-core_giao_dien_web') }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <button
                class="toggle-btn relative w-11 h-7 flex items-center bg-indigo-600 rounded-full transition-colors duration-300"
                :class="{ 'bg-gray-300': !actionBtnTheme }" @click="toggleBtnTheme">
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
                <p>{{ $t('lang_core_chia_se_ung_dung') }}</p>
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
                <p>{{ $t('lang_core_phan_hoi_ho_tro') }}</p>
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
                <p>{{ $t('lang_core_danh_gia_5_sao') }}</p>
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
                <p>{{ $t('lang_core_dieu_khoan_su_dung') }}</p>
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
                <p>{{ $t('lang_core_phien_ban') }}</p>
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
                <p>{{ $t('lang_core_huong_dan_su_dung') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { BellRing, Globe, AlarmClock, Share2, SunMoon, ShieldQuestion, Star, UserRoundPen, BookOpenText } from 'lucide-vue-next';
  const { drawerChangeLocale } = storeToRefs(useMyBaseStore());
  const actionBtnNotice = ref(false)
  const actionBtnTheme = ref(false)
  
  const toggleBtnNotice = () => {
    actionBtnNotice.value = !actionBtnNotice.value;
  }
  const toggleBtnTheme = () => {
    actionBtnTheme.value = !actionBtnTheme.value;
  }
  </script>
  
  <style scoped></style>