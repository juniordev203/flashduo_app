<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <!-- Header -->
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
        <NuxtLink :to="`/flashcard/folder/${folderId}`">
          <button>
            <ChevronLeft class="w-6 h-6 text-black" />
          </button>
        </NuxtLink>
      </template>
      <template v-slot:default>
        <span class="text-base font-medium text-black">
          Set.{{ currentSet?.setName }}
        </span>
      </template>
      <template v-slot:right>
        <MoreVertical class="text-black cursor-pointer" :size="20" @click="showActions = true" />
      </template>
    </AtomHeaderSafe>

    <!-- Main Content -->
    <div class="h-full w-full overflow-auto p-4 flex flex-col gap-6">
      <!-- Set Info Card -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-lg font-semibold">{{ currentSet?.setName }}</h2>
            <p class="text-sm text-gray-500">{{ currentSet?.description }}</p>
          </div>
          <Book class="text-blue-500" :size="24" />
        </div>
        <div class="flex gap-4 text-sm text-gray-500">
          <span>{{ vocabularies.length }} {{ $t('lang_core_flashcard_vocab_count') }}</span>
          <span>{{ $t('lang_core_flashcard_folder_date') }} {{ formatCustomDateTime(currentSet?.createdAt) }}</span>
        </div>
      </div>

      <!-- Study Options -->
      <div class="grid grid-cols-2 gap-4">
        <button @click="startFlashcards"
          class="p-4 bg-blue-100 rounded-xl flex flex-col items-center justify-center gap-2">
          <Copy class="text-blue-600" :size="24" />
          <span class="text-sm font-medium">{{ $t('lang_core_flashcard_set_learn') }}</span>
        </button>
        <button @click="startQuiz" class="p-4 bg-green-100 rounded-xl flex flex-col items-center justify-center gap-2">
          <BookOpen class="text-green-600" :size="24" />
          <span class="text-sm font-medium">{{ $t('lang_core_flashcard_set_game') }}</span>
        </button>
      </div>
      <!-- Vocabulary List -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">{{ $t('lang_core_flashcard_set_vocab_list') }}</h3>
          <button @click="showAddWord = true" class="flex items-center gap-2 text-blue-600">
            <Plus :size="20" />
            <span class="text-sm font-medium">{{ $t('lang_core_flashcard_add_newvocab') }}</span>
          </button>
        </div>

        <!-- Search Bar -->
        <div class="relative">
          <input v-model="searchQuery" type="text" :placeholder="$t('lang_core_flashcard_search')"
            class="w-full p-3 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500" />
          <Search class="absolute left-3 top-3 text-gray-400" />
        </div>

        <!-- Words List -->
        <div class="flex flex-col gap-2">
          <div v-for="word in filteredVocabularies" :key="word.id"
            class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-medium">{{ word.termLanguage }}</h4>
                <p class="text-gray-600">{{ word.definitionLanguage }}</p>
              </div>
              <Star :class="[
                word.isFavorite
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-400',
                'cursor-pointer',
              ]" :size="20" @click="toggleFavorite(Number(word.id))" />
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="vocabularies.length === 0" class="text-center py-8 text-gray-500">
          <BookOpen :size="48" class="mx-auto mb-4 opacity-50" />
          <p>{{ $t('lang_core_flashcard_set_empty_vocab') }}</p>
        </div>
      </div>
    </div>

    <!-- Action Sheet -->
    <el-dialog v-model="showActions" :title="$t('lang_core_modal.options')" width="90%">
      <div class="flex flex-col gap-4">
        <button class="text-left p-3 hover:bg-gray-50 rounded-xl" @click="handleRename">
          <Edit2 class="inline-block mr-2" :size="20" />
          {{ $t('lang_core_flashcard_rename_set_title') }}
        </button>
        <button class="text-left p-3 hover:bg-gray-50 rounded-xl text-red-500" @click="handleDelete">
          <Trash2 class="inline-block mr-2" :size="20" />
          {{ $t('lang_core_flashcard_set_delete') }}
        </button>
      </div>
    </el-dialog>
    <!-- Add Word Modal -->
    <AddFlashcardModal v-model:visible="showAddWord" :set-id="setId" @created="handleWordCreated" />
    <el-dialog v-model="showRenameModal" :title="$t('lang_core_flashcard_rename_set_title')" width="90%"
      :show-close="false" :close-on-click-modal="false">
      <div class="p-4">
        <input v-model="newSetName" type="text" class="w-full p-3 rounded-lg border border-gray-200 focus:outline-none"
          :placeholder="$t('lang_core_form.set_name')" @keyup.enter="submitRename" />
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <el-button @click="showRenameModal = false">{{ $t('lang_core_modal.cancel') }}</el-button>
          <el-button type="primary" @click="submitRename"
            :disabled="!newSetName.trim() || newSetName === currentSet?.setName">
            {{ $t('lang_core_modal.save') }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import {
  ChevronLeft,
  Search,
  Plus,
  Book,
  Copy,
  BookOpen,
  Star,
  MoreVertical,
  Edit2,
  Trash2,
} from "lucide-vue-next";
import { ElMessage, ElMessageBox } from "element-plus";
import { FlashcardStore } from "~/stores/flashcard";
import AddFlashcardModal from "~/components/flashcard/AddFlashcardModal.vue";
import { type FlashcardResponse, type FlashcardRequest, type FlashcardSet, type FlashcardSetDetailResponse, type FlashcardFavoritesResponse } from "~/auto_api";
import { useI18n } from "vue-i18n";
import { showToast } from '@/utils/message.utils'

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const store = FlashcardStore();
const setId = Number(route.params.setId);
const folderId = Number(route.params.folderId);
const searchQuery = ref("");
const showActions = ref(false);
const showAddWord = ref(false);
const loading = ref(false)
const isFavorite = ref(false)

const showRenameModal = ref(false);
const newSetName = ref('');

const { vocabularies } = storeToRefs(store);

const currentSet = computed(() => {
  if (!store.setsInFolder || !Array.isArray(store.setsInFolder)) {
    console.warn("setsInfolder is not available or not an array");
    return undefined;
  }
  return store.setsInFolder.find((set) => set.id === setId);
});
const filteredVocabularies = computed(() => {
  if (!vocabularies.value || !Array.isArray(vocabularies.value)) {
    console.warn("vocabularies is not available or not an array");
    return [];
  }

  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return vocabularies.value;

  return vocabularies.value.filter(
    (vocab) =>
      (vocab.termLanguage?.toLowerCase() || "").includes(query) ||
      (vocab.definitionLanguage?.toLowerCase() || "").includes(query)
  );
});

const fetchVocabularies = async (setId: number) => {
  try {
    loading.value = true;
    const response = await store.fetchFlashcardsInSet(setId);
    vocabularies.value = Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Error fetching vocabularies:', error);
    showToast('error', t('lang_core_messages.error_load_vocab'));
  } finally {
    loading.value = false;
  }
};

const startFlashcards = () => {
  router.push(`/flashcard/folder/${folderId}/set/${setId}/learn`);
};

const startQuiz = () => {
  router.push(`/flashcard/folder/${folderId}/set/${setId}/game`);
};

const toggleFavorite = async (wordId: number) => {
  try {
    isFavorite.value = !isFavorite.value;
    await store.toggleFavorite(wordId);

  } catch (err) {
    console.error("Lỗi khi đánh dấu yêu thích:", err);
    showToast('error', t('lang_core_messages.error_toggle_favorite'));
  }
};
// Replace the existing handleWordCreated function
const handleWordCreated = async (flashcard: FlashcardRequest) => {
  try {
    await store.createFlashcard(
      flashcard.termLanguage,
      flashcard.definitionLanguage,
      flashcard.imageUrl || "",
      flashcard.audioUrl || "",
      flashcard.flashcardSetId,
      flashcard.userId
    );
    await store.fetchFlashcardsInSet(setId);
    showToast('success', t('lang_core_messages.success_add_vocab'));
  } catch (err) {
    console.error("Lỗi khi thêm từ mới:", err);
    showToast('error', t('lang_core_messages.error_add_vocab'));
  }
};


const handleDelete = async () => {
  try {
    await ElMessageBox.confirm(
      t('lang_core_flashcard_delete_confirm'),
      t('lang_core_flashcard_delete_confirm_yes'),
      {
        confirmButtonText: t('lang_core_modal.delete'),
        cancelButtonText: t('lang_core_modal.cancel'),
        type: "warning",
      }
    );

    await store.deleteVocabSet(setId);
    showToast('success', t('lang_core_flashcard_set_delete_success'));
    router.back();
  } catch (err) {
    if (err !== "cancel") {
      console.error("Lỗi khi xóa bộ thẻ:", err);
      showToast('error', t('lang_core_messages.error_delete_set'));
    }
  }
};

onMounted(async () => {
  if (setId) {
    try {
      await store.fetchSetsInFolder(folderId);
      await fetchVocabularies(setId)
    } catch (err) {
      showToast('error', t('lang_core_messages.error_load_vocab'));
    }
  }
});

const handleRename = () => {
  showActions.value = false;
  newSetName.value = currentSet.value?.setName || '';
  showRenameModal.value = true;
};
const submitRename = async () => {
  try {
    if (!newSetName.value.trim()) {
      showToast('error', t('lang_core_flashcard_rename_set_error'));
      return;
    }
    if (newSetName.value === currentSet.value?.setName) {
      showRenameModal.value = false;
      return;
    }
    await store.updateSetName(setId, newSetName.value.trim());
    showToast('success', t('lang_core_flashcard_rename_success'));
    showRenameModal.value = false;
    await store.fetchSetsInFolder(folderId);
    showActions.value = false;
  } catch (err) {
    console.error("Lỗi khi đổi tên bộ từ vựng:", err);
    showToast('error', t('lang_core_messages.error_rename_set'));
    showRenameModal.value = false;
  }
}
</script>

<style scoped></style>
