<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="Tạo thư mục mới"
    width="90%"
    :before-close="handleClose"
    class="rounded-lg"
  >
    <div class="flex flex-col gap-4">
      <!-- Folder Name Input -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Tên thư mục</label>
        <el-input 
          v-model="folderName"
          placeholder="Nhập tên thư mục..."
          :maxlength="50"
          show-word-limit
          class="w-full"
        >
          <template #prefix>
            <Folder class="text-gray-400" :size="20" />
          </template>
        </el-input>
        <p class="text-xs text-gray-500">
          Tối đa 50 ký tự
        </p>
      </div>

      <!-- Description (Optional) -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Mô tả (không bắt buộc)</label>
        <el-input 
          v-model="description"
          type="textarea"
          :rows="3"
          placeholder="Nhập mô tả cho thư mục..."
          :maxlength="200"
          show-word-limit
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
          Tạo thư mục
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { Folder } from 'lucide-vue-next';

const props = defineProps<{
  visible: boolean
  loading?: boolean
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'create', name: string): void
}>();

const folderName = ref('');
const description = ref('');

const isValid = computed(() => {
  return folderName.value.trim().length > 0 && folderName.value.trim().length <= 50;
});

const handleClose = () => {
  emit('update:visible', false);
  resetForm();
};

const resetForm = () => {
  folderName.value = '';
  description.value = '';
};

const handleSubmit = () => {
  if (!isValid.value) {
    ElMessage.warning('Vui lòng nhập tên thư mục hợp lệ');
    return;
  }
  
  emit('create', folderName.value.trim());
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

:deep(.el-textarea__inner) {
  min-height: 80px !important;
}
</style>