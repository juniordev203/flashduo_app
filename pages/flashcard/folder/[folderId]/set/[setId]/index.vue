<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <!-- Header -->
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
        <button @click="router.back()">
          <ChevronLeft class="w-6 h-6 text-black" />
        </button>
      </template>
      <template v-slot:default>
        <span class="text-base font-medium text-black">
          {{ currentSet?.setName }}
        </span>
      </template>
      <template v-slot:right>
        <MoreVertical
          class="text-black cursor-pointer"
          :size="20"
          @click="showActions = true"
        />
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
          <span>{{ vocabularies.length }} từ vựng</span>
          <span
            >Tạo ngày: {{ formatCustomDateTime(currentSet?.createdAt) }}</span
          >
        </div>
      </div>

      <!-- Study Options -->
      <div class="grid grid-cols-2 gap-4">
        <button
          @click="startFlashcards"
          class="p-4 bg-blue-100 rounded-xl flex flex-col items-center justify-center gap-2"
        >
          <Copy class="text-blue-600" :size="24" />
          <span class="text-sm font-medium">Học thẻ</span>
        </button>
        <button
          @click="startQuiz"
          class="p-4 bg-green-100 rounded-xl flex flex-col items-center justify-center gap-2"
        >
          <BookOpen class="text-green-600" :size="24" />
          <span class="text-sm font-medium">Kiểm tra</span>
        </button>
      </div>
      <!-- Vocabulary List -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">Danh sách từ vựng</h3>
          <button
            @click="showAddWord = true"
            class="flex items-center gap-2 text-blue-600"
          >
            <Plus :size="20" />
            <span class="text-sm font-medium">Thêm từ</span>
          </button>
        </div>

        <!-- Search Bar -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm từ vựng..."
            class="w-full p-3 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500"
          />
          <Search class="absolute left-3 top-3 text-gray-400" />
        </div>

        <!-- Words List -->
        <div class="flex flex-col gap-2">
          <div
            v-for="word in filteredVocabularies"
            :key="word.id"
            class="p-4 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-medium">{{ word.termLanguage }}</h4>
                <p class="text-gray-600">{{ word.definitionLanguage }}</p>
              </div>
              <Star
                :class="[
                  word.isFavourite
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-400',
                  'cursor-pointer',
                ]"
                :size="20"
                @click="toggleFavorite(Number(word.id))"
              />
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="vocabularies.length === 0"
          class="text-center py-8 text-gray-500"
        >
          <BookOpen :size="48" class="mx-auto mb-4 opacity-50" />
          <p>Chưa có từ vựng nào. Hãy thêm từ đầu tiên!</p>
        </div>
      </div>
    </div>

    <!-- Action Sheet -->
    <el-dialog v-model="showActions" title="Tùy chọn" width="90%">
      <div class="flex flex-col gap-4">
        <button
          class="text-left p-3 hover:bg-gray-50 rounded-xl"
          @click="handleEdit"
        >
          <Edit2 class="inline-block mr-2" :size="20" />
          Chỉnh sửa thông tin
        </button>
        <button
          class="text-left p-3 hover:bg-gray-50 rounded-xl text-red-500"
          @click="handleDelete"
        >
          <Trash2 class="inline-block mr-2" :size="20" />
          Xóa bộ thẻ
        </button>
      </div>
    </el-dialog>

    <!-- Add Word Modal -->
    <AddFlashcardModal
      v-model:visible="showAddWord"
      :set-id="setId"
      @created="handleWordCreated"
    />
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
import type { FlashcardRequest, FlashcardSet } from "~/auto_api";

const route = useRoute();
const router = useRouter();
const store = FlashcardStore();
const { vocabularies, loading } = storeToRefs(store);

const setId = Number(route.params.setId);
const folderId = Number(route.params.folderId);
const searchQuery = ref("");
const showActions = ref(false);
const showAddWord = ref(false);

onMounted(async () => {
  if (setId) {
    try {
      console.log("Fetching sets in folder:", folderId);
    await store.fetchSetsInFolder(folderId);
    console.log("Sets in folder result:", store.setsInfolder);
    
    console.log("Fetching flashcards in set:", setId);
    await store.fetchFlashcardsInSet(setId);
    console.log("Flashcards fetched:", vocabularies.value);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách từ vựng:", err);
      ElMessage.error("Không thể tải danh sách từ vựng");
    }
  }
});
console.log("vocab: ", vocabularies.value);

const currentSet = computed(() => {
  if (!store.setsInfolder || !Array.isArray(store.setsInfolder)) {
    console.warn("setsInfolder is not available or not an array");
    return undefined;
  }
  return store.setsInfolder.find((set) => set.id === setId);
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

const startFlashcards = () => {
  router.push(`/flashcard/study/${setId}/flashcards`);
};

const startQuiz = () => {
  router.push(`/flashcard/study/${setId}/quiz`);
};

const toggleFavorite = async (wordId: number) => {
  try {
    await store.toggleFavorite(wordId);
  } catch (err) {
    console.error("Lỗi khi đánh dấu yêu thích:", err);
    ElMessage.error("Không thể đánh dấu yêu thích");
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
    ElMessage.success("Thêm từ mới thành công");
  } catch (err) {
    console.error("Lỗi khi thêm từ mới:", err);
    ElMessage.error("Thêm từ mới thất bại");
  } finally {
    showAddWord.value = false;
  }
};

const handleEdit = () => {
  showActions.value = false;
  // Implement edit logic
};

const handleDelete = async () => {
  try {
    await ElMessageBox.confirm(
      "Bạn có chắc chắn muốn xóa bộ thẻ này? Tất cả từ vựng trong bộ thẻ sẽ bị xóa.",
      "Xác nhận xóa",
      {
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
        type: "warning",
      }
    );

    await store.deleteVocabSet(setId);
    ElMessage.success("Đã xóa bộ thẻ");
    router.back();
  } catch (err) {
    if (err !== "cancel") {
      console.error("Lỗi khi xóa bộ thẻ:", err);
      ElMessage.error("Xóa bộ thẻ thất bại");
    }
  }
};
</script>

<style scoped>
.grid {
  display: grid;
}
</style>
