<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="Thêm từ mới"
    width="90%"
    :before-close="handleClose"
    class="rounded-lg"
  >
    <div class="flex flex-col gap-4">
      <!-- Term -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Từ vựng</label>
        <el-input
          v-model="formData.termLanguage"
          placeholder="Nhập từ vựng..."
          :maxlength="100"
          show-word-limit
        >
          <template #prefix>
            <Type class="text-gray-400" :size="20" />
          </template>
        </el-input>
      </div>

      <!-- Definition -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Định nghĩa</label>
        <el-input
          v-model="formData.definitionLanguage"
          placeholder="Nhập định nghĩa..."
          :maxlength="200"
          show-word-limit
        >
          <template #prefix>
            <BookOpen class="text-gray-400" :size="20" />
          </template>
        </el-input>
      </div>

      <!-- image -->
      <!-- audio -->
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
          Thêm từ
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { Type, BookOpen } from "lucide-vue-next";
import { ElMessage } from "element-plus";
import type { FlashcardRequest } from "~/auto_api";
import { useMyBaseStore } from "~/stores/base.store";

const myBaseStore = useMyBaseStore();
const userId = computed(() => myBaseStore.userInfo?.id);
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

const loading = ref(false);

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
    ElMessage.error("Thêm từ mới thất bại");
  } finally {
    loading.value = false;
  }
};
const resetForm = () => {
  formData.termLanguage = "";
  formData.definitionLanguage = "";
  formData.imageUrl = null;
  formData.audioUrl = null;
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
