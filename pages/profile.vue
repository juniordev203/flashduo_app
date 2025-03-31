<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
      </template>
      <template v-slot:default>
        <span class="text-xl text-black font-medium">
          {{ $t('lang_core_profile_title') }}
        </span>
      </template>
      <template v-slot:right>
      </template>
    </AtomHeaderSafe>
    <div class="p-4 h-full w-full overflow-auto flex flex-col gap-6">
      <div class="flex justify-between items-center">
        <div class="flex gap-4 items-center">
          <div class="w-[40px] h-[40px] rounded-full border border-primary flex justify-center items-center">
            <img class="w-[32px] h-[32px] rounded-full" src="~/assets/images/avatar.jpg" alt="">
          </div>
          <div class="flex flex-col justify-between">
            <p class="text-lg">Junior</p>
            <p class="text-xs">{{ $t('lang_core_profile_created_date') }}</p>
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
              <p>{{ $t('lang_core_profile_notification') }}</p>
            </div>
          </div>
          <div class="flex items-center">
            <button
              class="toggle-btn relative w-11 h-7 flex items-center rounded-full transition-colors duration-300"
              :class="actionBtnNotice ? 'bg-indigo-600' : 'bg-gray-300'" 
              @click="toggleBtnNotice">
              <span
                class="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300"
                :class="{ 'translate-x-4 absolute top-0.5 right-0.5': actionBtnNotice }">
              </span>
            </button>
          </div>
        </div>
        <el-divider class="!m-0"></el-divider>

        <div class="flex justify-between items-center py-4" @click="drawerChangeLocale = true">
          <div class="flex items-center gap-4">
            <div>
              <Globe :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>{{ $t('lang_core_profile_language') }}</p>
            </div>
          </div>
          <div class="text-xs">
            <div class="flex gap-2 items-center">
              <span>{{ $t('lang_core_profile_' + $i18n.locale) }}</span>
              <img :src="'/flag/' + $i18n.locale + '.png'" class="w-[30px] rounded" alt="flag">
            </div>
          </div>
        </div>
        <el-divider class="!m-0"></el-divider>

        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div class="user-icon">
              <SunMoon :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>{{ $t('lang_core_profile_dark_mode') }}</p>
            </div>
          </div>
          <div class="flex items-center">
            <button
              class="toggle-btn relative w-11 h-7 flex items-center rounded-full transition-colors duration-300"
              :class="actionBtnTheme ? 'bg-indigo-600' : 'bg-gray-300'" 
              @click="toggleBtnTheme">
              <span
                class="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300"
                :class="{ 'translate-x-4 absolute top-0.5 right-0.5': actionBtnTheme }">
              </span>
            </button>
          </div>
        </div>
        <el-divider class="!m-0"></el-divider>

        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div class="user-icon">
              <Share2 :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>{{ $t('lang_core_profile_share_app') }}</p>
            </div>
          </div>
        </div>
        <el-divider class="!m-0"></el-divider>

        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div class="user-icon">
              <AlarmClock :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>{{ $t('lang_core_profile_study_reminder') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- box 2 -->
      <div class="bg-white rounded shadow flex flex-col px-4">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div class="">
              <ShieldQuestion :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>{{ $t('lang_core_profile_support_center') }}</p>
            </div>
          </div>
        </div>
        <el-divider class="!m-0"></el-divider>

        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div class="">
              <Star :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>{{ $t('lang_core_profile_rate') }}</p>
            </div>
          </div>
          <!-- Star rating section remains unchanged -->
        </div>
        <el-divider class="!m-0"></el-divider>

        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div class="user-icon">
              <UserRoundPen :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>{{ $t('lang_core_profile_terms') }}</p>
            </div>
          </div>
        </div>
        <el-divider class="!m-0"></el-divider>

        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div class="user-icon">
              <Share2 :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>{{ $t('lang_core_profile_version') }}</p>
            </div>
          </div>
          <div class="text-xs text-primary">
            <p>{{ $t('lang_core_profile_version_number') }}</p>
          </div>
        </div>
        <el-divider class="!m-0"></el-divider>

        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <div class="user-icon">
              <BookOpenText :width="20" :stroke-width="2" />
            </div>
            <div class="">
              <p>{{ $t('lang_core_profile_user_guide') }}</p>
            </div>
          </div>
        </div>
      </div>

      <button @click="handleLogout" 
        class="w-full p-3 flex bg-red-500 text-white gap-2 justify-center items-center text-center rounded">
        {{ $t('lang_core_profile_logout') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BellRing, Globe, AlarmClock, Share2, SunMoon, ShieldQuestion, Star, UserRoundPen, BookOpenText, LogOut } from 'lucide-vue-next';
import type { UserResponse } from '~/auto_api';
import { useI18n } from 'vue-i18n'

const { drawerChangeLocale } = storeToRefs(useMyBaseStore());
const actionBtnNotice = ref(false)
const actionBtnTheme = ref(false)
const router = useRouter()
const userInfo = ref<UserResponse | null>(null)
const isLoading = ref(false)
const isLoggedIn = ref(false)
const { locale, t } = useI18n();

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