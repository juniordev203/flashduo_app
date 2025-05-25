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
      <div class="flex justify-between items-center border-2 p-4 rounded-xl">
        <div v-if="userInfo" class="flex gap-4 items-center">
          <div class="w-[40px] h-[40px] rounded-full border border-primary flex justify-center items-center">
            <img class="w-[32px] h-[32px] rounded-full" :src="userInfo.avatarUrl" alt="">
          </div>
          <div class="flex flex-col justify-between">
            <p class="text-lg">{{ userInfo.fullName }}</p>
            <p class="text-xs">{{ $t('lang_core_profile_created_date') }}{{ formatedCreatedAt }}</p>
          </div>
        </div>
        <button @click="showActions = true">
          <UserPen class="inline-block mr-2" :size="20" />
        </button>
      </div>
      <!-- box 1 -->
      <div class="bg-white rounded-xl shadow flex flex-col px-4">
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
            <button class="toggle-btn relative w-11 h-7 flex items-center rounded-full transition-colors duration-300"
              :class="actionBtnNotice ? 'bg-indigo-600' : 'bg-gray-300'" @click="toggleBtnNotice">
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
            <button class="toggle-btn relative w-11 h-7 flex items-center rounded-full transition-colors duration-300"
              :class="actionBtnTheme ? 'bg-indigo-600' : 'bg-gray-300'" @click="toggleBtnTheme">
              <span
                class="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300"
                :class="{ 'translate-x-4 absolute top-0.5 right-0.5': actionBtnTheme }">
              </span>
            </button>
          </div>
        </div>
        <el-divider class="!m-0"></el-divider>

        <div @click="shareApp" class="flex justify-between items-center py-4">
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
      <div class="bg-white rounded-xl shadow flex flex-col px-4">
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
      <button v-if="userInfo" @click="handleLogout"
        class="w-full p-3 flex bg-red-500 text-white gap-2 justify-center items-center text-center rounded-xl">
        {{ $t('lang_core_profile_logout') }}
      </button>
      <button v-if="!userInfo" @click="handleLogin"
        class="w-full p-3 flex bg-blue-500 text-white gap-2 justify-center items-center text-center rounded-xl">
        <p class="text-sm">{{ $t('lang_core_profile_login') }}</p>
      </button>
    </div>
    <!-- profile edit -->
    <el-dialog v-model="showActions" :title="$t('lang_core_profile_edit')" width="90%" class="!rounded-2xl">
      <div class="space-y-6">
        <!-- avatar upload -->
        <div class="flex flex-col items-center gap-4">
          <div class="relative">
            <div @click="openLibrary" class="w-24 h-24 rounded-full border-2 border-indigo-100 overflow-hidden">
              <img :src="tempAvatar || userInfo?.avatarUrl || '~/assets/images/avatar-default.jpg'"
                class="w-full h-full object-cover" alt="User avatar" />
              <SquarePen class="absolute right-2 bottom-3 w-5 h-5 text-white" />
            </div>
          </div>
          <p class="text-sm text-gray-500">
            {{ $t('lang_core_profile_avatar_hint') }}
          </p>
        </div>
        <!-- name input -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">
            {{ $t('lang_core_profile_name') }}
          </label>
          <div class="relative">
            <input v-model="tempName" type="text"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              :placeholder="$t('lang_core_profile_name_placeholder')" />
            <UserRound class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
      <!-- dialog actions -->
      <template #footer>
        <div class="flex gap-3">
          <button @click="showActions = false"
            class="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            {{ $t('lang_core_internal_cancel') }}
          </button>
          <button @click="handleSaveChanges"
            class="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            :disabled="!hasChanges || loading">
            <span v-if="!loading">{{ $t('lang_core_save') }}</span>
            <span v-else class="flex items-center justify-center gap-2">
              <Loader2 class="w-4 h-4 animate-spin" />
              {{ $t('lang_core_saving') }}
            </span>
          </button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { SquarePen, BellRing, Globe, AlarmClock, Share2, SunMoon, ShieldQuestion, Star, UserRoundPen, BookOpenText, Volume2, Edit2, Loader2, UserRound, UserPen } from 'lucide-vue-next';
import { FlashcardStore } from '@/stores/flashcard';
import { updateUserInfo, fetchUserInfo } from '~/composables/User'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useI18n } from 'vue-i18n';
import { showToast } from '@/utils/message.utils'

const { t } = useI18n();
const flashcardStore = FlashcardStore();
const myBaseStore = useMyBaseStore();
const { drawerChangeLocale } = storeToRefs(useMyBaseStore());
const actionBtnNotice = ref(false)
const actionBtnTheme = ref(false)
const showActions = ref(false);
const router = useRouter()
const userInfo = computed(() => useMyBaseStore().userInfo)
const authInfo = computed(() => useMyBaseStore().authUser)
const createdAt = userInfo.value?.createdAt;
const formatedCreatedAt = formatCustomDateTime(createdAt);

// add new refs
const tempName = ref('')
const tempAvatar = ref('')
const loading = ref(false)
showToast('success', 'Your action was completed successfully.')
// add computed
const hasChanges = computed(() => {
  return tempName.value !== userInfo.value?.fullName || tempAvatar.value !== userInfo.value?.avatarUrl
})
const resizeImage = async (dataUrl: string, maxWidth = 800): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ratio = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * ratio;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.src = dataUrl;
  });
};
const requestFullPhotoPermission = async () => {
  const { photos } = await Camera.requestPermissions({ permissions: ['photos'] });

  if (photos === 'denied') {
    ElMessage.warning('Vui lòng cấp quyền truy cập thư viện ảnh trong cài đặt.');
    return false;
  }

  return true;
};
const openLibrary = async () => {
  const granted = await requestFullPhotoPermission();
  if (!granted) return;

  try {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      quality: 90,
    });

    tempAvatar.value = photo.dataUrl || '';
  } catch (err: any) {
    const msg = typeof err === 'string' ? err : err?.message ?? '';
    if (msg.toLowerCase().includes('cancel')) {
      showToast('error', t('lang_core_messages.error_no_image'));
    } else {
      showToast('error', 'Không thể chọn ảnh. Vui lòng thử lại.');
    }
  }
};
const handleSaveChanges = async () => {
  if (!tempName.value?.trim()) {
    showToast('error', t('lang_core_messages.error_empty_name'));
    return;
  }
  try {
    loading.value = true
    const payload = {
      fullName: tempName.value,
      avatarUrl: tempAvatar.value || userInfo.value?.avatarUrl
    }
    if (tempAvatar.value) {
      payload.avatarUrl = await resizeImage(tempAvatar.value);
    }
    if (userInfo.value?.id) {
      await updateUserInfo(userInfo.value?.id, payload)
    }
    if (authInfo.value?.id) {
      await myBaseStore.loadUserInfo();
    }
    showToast('success', t('lang_core_messages.success_update_profile'))
    showActions.value = false
  } catch (error) {
    showToast('error', t('lang_core_messages.error_update_profile'))
  } finally {
    loading.value = false
  }
}

// initialize temp values when dialog opens
watch(showActions, (newValue) => {
  if (newValue) {
    tempName.value = userInfo.value?.fullName || ''
    tempAvatar.value = ''
  }
})

const toggleBtnNotice = () => {
  actionBtnNotice.value = !actionBtnNotice.value;
}
const toggleBtnTheme = () => {
  actionBtnTheme.value = !actionBtnTheme.value;
}
// share
const shareApp = async () => {
  const shareData = {
    title: 'FlashDuo',
    text: 'Học từ vựng hiệu quả với FlashDuo!',
    url: window.location.origin
  };

  try {
    showToast('error', t('lang_core_messages.error_share_app'));
    if (navigator.share) {
      // Sử dụng native share trên mobile
      await navigator.share(shareData);
    } else {
      // Fallback: Copy link trên desktop
      await navigator.clipboard.writeText(shareData.url);
      showToast('success', 'Đã sao chép liên kết ứng dụng');
    }
  } catch (error) {
    showToast('error', t('lang_core_messages.error_share_app'));
  }
};
const handleLogout = async () => {
  await logoutUser();
  flashcardStore.reset();
  router.push('/login')
}
const handleLogin = async () => {
  router.push('/login')
}
</script>

<style scoped></style>