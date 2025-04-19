<template>
    <el-dialog
      :model-value="visible"
      @update:model-value="$emit('update:visible', $event)"
      :title="$t('lang_core_flashcard_create_set')"
      width="90%"
      :before-close="handleClose"
      class="rounded-lg"
    >
      <div class="flex flex-col gap-4">
        <!-- Set Name -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Tên bộ thẻ</label>
          <el-input 
            v-model="formData.setName"
            placeholder="Nhập tên bộ thẻ..."
            :maxlength="50"
            show-word-limit
            class="w-full"
          >
            <template #prefix>
              <Files class="text-gray-400" :size="20" />
            </template>
          </el-input>
        </div>
  
        <!-- Description -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Mô tả</label>
          <el-input 
            v-model="formData.description"
            type="textarea"
            :rows="3"
            placeholder="Nhập mô tả cho bộ thẻ..."
            :maxlength="200"
            show-word-limit
          />
        </div>
  
        <!-- Folder Selection -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">Chọn thư mục</label>
          <el-select 
            v-model="formData.folderId"
            placeholder="Chọn thư mục"
            class="w-full"
          >
            <el-option
              v-for="folder in folders"
              :key="folder.id"
              :label="folder.folderName"
              :value="folder.id || ''"
            />
          </el-select>
        </div>
  
        <!-- Privacy Setting -->
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700">Quyền riêng tư</span>
          <el-switch
            v-model="formData.isPublic"
            active-text="Công khai"
            inactive-text="Riêng tư"
          />
        </div>
      </div>
  
      <template #footer>
        <div class="flex justify-end gap-2">
          <el-button @click="handleClose">Hủy</el-button>
          <el-button 
            type="primary" 
            @click="handleSubmit"
            :loading="loading"
            :disabled="!isValid"
          >
            Tạo bộ thẻ
          </el-button>
        </div>
      </template>
    </el-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, computed } from 'vue';
  import { ElMessage } from 'element-plus';
  import { Files } from 'lucide-vue-next';
  import { storeToRefs } from 'pinia';
  import { FlashcardStore } from '~/stores/flashcard';
  import { useMyBaseStore } from '~/stores/base.store';
import { useI18n } from 'vue-i18n';
  
  const props = defineProps<{
    visible: boolean
    loading?: boolean
  }>();
  
  const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void
    (e: 'created'): void
  }>();
  const { t } = useI18n();
  const store = FlashcardStore();
  const { folders } = storeToRefs(store);
  const userInfo = computed(() => useMyBaseStore().userInfo);
  
  const formData = reactive({
    setName: '',
    description: '',
    folderId: '' as string | number,
    isPublic: false
  });
  
  const isValid = computed(() => {
  return formData.setName.trim().length > 0 && formData.folderId !== '';
});
  
  const handleClose = () => {
    emit('update:visible', false);
    resetForm();
  };
  
  const resetForm = () => {
  formData.setName = '';
  formData.description = '';
  formData.folderId = ''; 
  formData.isPublic = false;
};
  
  const handleSubmit = async () => {
  if (!isValid.value || !userInfo.value?.id) {
    ElMessage.warning('Vui lòng điền đầy đủ thông tin');
    return;
  }

  try {
    await store.createVocabSet(
      formData.setName,
      formData.description,
      formData.isPublic,
      Number(formData.folderId),
      userInfo.value.id
    );
    showCustomMessage('success', t('lang_core_messages.success_create_set'));
    emit('created');
    handleClose();
  } catch (err) {
    console.error('Lỗi khi tạo bộ thẻ:', err);
    showCustomMessage('error', t('lang_core_messages.error_create_set'));
  }
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
  
  :deep(.el-select) {
    width: 100%;
  }
  </style>