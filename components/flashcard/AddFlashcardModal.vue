<template>
  <el-dialog :model-value="visible" @update:model-value="$emit('update:visible', $event)"
    :title="$t('lang_core_flashcard_add_newvocab')" width="90%" :before-close="handleClose" class="rounded-lg">
    <div class="flex flex-col gap-4">
      <!-- Term -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">{{ $t('lang_core_flashcard_vocab') }}</label>
        <el-input v-model="formData.termLanguage" :placeholder="$t('lang_core_form.vocab_term')" :maxlength="100"
          show-word-limit>
          <template #prefix>
            <Type class="text-gray-400" :size="20" />
          </template>
        </el-input>
      </div>

      <!-- Definition -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">{{ $t('lang_core_flashcard_definition') }}</label>
        <el-input v-model="formData.definitionLanguage" :placeholder="$t('lang_core_form.vocab_definition')"
          :maxlength="200" show-word-limit>
          <template #prefix>
            <BookOpen class="text-gray-400" :size="20" />
          </template>
        </el-input>
      </div>

      <!-- image -->
      <div class="space-y-2">
        <label for="" class="text-sm font-medium text-gray-700">{{ $t('lang_core_internal_image') }}</label>
        <div v-if="imagePreview" class="relative w-full h-48 mb-2">
          <img :src="imagePreview" alt="Preview" class="w-full h-full object-cover rounded-lg">
          <button @click="removeImage" class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full">
            <X class="w-5 h-5" />
          </button>
        </div>
        <div v-else @click="openLibrary" class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <ImagePlus class="mx-auto text-gray-400 mb-2" />
          <p class="text-sm text-gray-500">{{ $t('lang_core_messages.error_select_image') }}</p>
        </div>
      </div>
      <!-- audio -->
    </div>

    <template #footer>
      <div class="flex justify-end gap-2">
        <el-button @click="handleClose">{{ $t('lang_core_internal_cancel') }}</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="loading" :disabled="!isValid">
          {{ $t('lang_core_internal_add') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { Type, BookOpen, ImagePlus, X } from "lucide-vue-next";
import { ElMessage } from "element-plus";
import type { FlashcardRequest } from "~/auto_api";
import { useMyBaseStore } from "~/stores/base.store";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useI18n } from "vue-i18n";
import { showToast } from '@/utils/message.utils'

const { t } = useI18n();
const myBaseStore = useMyBaseStore();
const userId = computed(() => myBaseStore.userInfo?.id);
const loading = ref(false);
const imagePreview = ref<string | null>(null);

const props = defineProps<{
  visible: boolean;
  setId: number;
}>();
const emit = defineEmits<{
  "update:visible": [value: boolean];
  'created': [flashcard: FlashcardRequest];
}>();
const formData = reactive<FlashcardRequest>({
  termLanguage: "",
  definitionLanguage: "",
  imageUrl: '',
  audioUrl: '',
  flashcardSetId: props.setId,
  userId: Number(userId.value),
});
const isValid = computed(() => {
  return (
    formData.termLanguage.trim().length > 0 &&
    formData.definitionLanguage.trim().length > 0
  );
});
const handleSubmit = async () => {
  if (!isValid.value) {
    ElMessage.warning("Vui lòng nhập đầy đủ từ vựng và định nghĩa");
    return;
  }
  try {
    loading.value = true;
    const flashcardData: FlashcardRequest = {
      termLanguage: formData.termLanguage.trim(),
      definitionLanguage: formData.definitionLanguage.trim(),
      imageUrl: formData.imageUrl || null,
      audioUrl: formData.audioUrl || null,
      flashcardSetId: props.setId,
      userId: Number(userId.value),
    };

    emit("created", flashcardData);
    handleClose();
  } catch (err) {
    console.error("Lỗi khi thêm từ mới:", err);
    showToast('error', t('lang_core_messages.error_add_vocab'));
  } finally {
    loading.value = false;
  }
};
const resetForm = () => {
  formData.termLanguage = "";
  formData.definitionLanguage = "";
  formData.imageUrl = null;
  formData.audioUrl = null;
  imagePreview.value = null;
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

    imagePreview.value = photo.dataUrl || null;
    formData.imageUrl = photo.dataUrl || null;
  } catch (err) {
    showToast('error', t('lang_core_messages.error_select_image'));
  }
};
const removeImage = () => {
  formData.imageUrl = null;
  imagePreview.value = null;

};
const handleClose = () => {
  emit("update:visible", false);
  resetForm();
};
</script>

<style scoped>
:deep(.el-dialog) {
  border-radius: 0.5rem;
}

:deep(.el-input__wrapper) {
  box-shadow: none;
  border: 1px solid #e5e7eb;
}

:deep(.el-input__wrapper:focus-within) {
  border-color: #3b82f6;
}
</style>
