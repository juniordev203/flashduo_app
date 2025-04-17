<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
        <NuxtLink to="/">
          <ChevronLeft class="w-6 h-6 text-black" />
        </NuxtLink>
      </template>
      <template v-slot:default>
        <span class="text-base font-medium text-black"> Flashcard </span>
      </template>
      <template v-slot:right>
        <Bell :size="20" class="text-black" fill="bg-black" />
      </template>
    </AtomHeaderSafe>
    <div class="h-full w-full overflow-auto p-4 flex flex-col gap-6">
      <!-- Search Bar -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm kiếm bộ thẻ..."
          class="w-full p-3 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
        />
        <Search class="absolute left-3 top-3 text-gray-400" />
      </div>
      <!-- Quick Actions -->
      <div class="grid grid-cols-2 gap-4">
        <button
          @click="createNewFolder"
          class="p-4 bg-blue-100 rounded-lg flex flex-col items-center justify-center gap-2"
        >
          <FolderPlus class="text-blue-600" />
          <span class="text-sm font-medium">Tạo thư mục mới</span>
        </button>
        <button
          @click="createNewSet"
          class="p-4 bg-green-100 rounded-lg flex flex-col items-center justify-center gap-2"
        >
          <Plus class="text-green-600" />
          <span class="text-sm font-medium">Tạo bộ thẻ mới</span>
        </button>
      </div>
      <!-- Folders -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Thư mục của tôi</h2>
        <div v-if="loading && folders.length === 0" class="flex justify-center py-4">
          <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="folders.length === 0" class="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
          <p class="text-gray-500">Bạn chưa có thư mục nào</p>
        </div>
        <div v-else class="flex flex-col gap-4">
          <NuxtLink
            v-for="folder in folders"
            :key="folder.id"
            :to="`/flashcard/folder/${folder.id}`"
            class="p-4 bg-white rounded-lg shadow-sm border border-gray-100 block"
          >
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-3">
                <Folder class="text-blue-500" />
                <div>
                  <h3 class="font-medium">{{ folder.folderName }}</h3>
                  <p class="text-sm text-gray-500">
                    {{ formatCustomDateTime(folder.createdAt) }}
                  </p>
                </div>
              </div>
              <ChevronRight class="text-gray-400" />
            </div>
          </NuxtLink>
        </div>
      </div>
      <!-- Set -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Bộ thẻ của tôi</h2>
        <div v-if="loading" class="flex justify-center py-4">
          <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="setsInUser.length === 0" class="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
          <p class="text-gray-500">Bạn chưa có bộ thẻ nào</p>
        </div>
        <div v-else class="flex flex-col gap-4">
          <NuxtLink
            v-for="set in filteredSets"
            :key="set.id"
            :to="`/flashcard/folder/${set.flashcardFolderId}/set/${set.id}`"
            class="p-4 bg-white rounded-lg shadow-sm border border-gray-100 block"
          >
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-3">
                <Layers class="text-green-500" />
                <div>
                  <h3 class="font-medium">{{ set.setName }}</h3>
                  <div class="flex items-center gap-2">
                    <p class="text-sm text-gray-500">
                      {{ set.totalCards || 0 }} thẻ
                    </p>
                    <span class="text-gray-300">•</span>
                    <p class="text-sm text-gray-500">
                      {{ formatCustomDateTime(set.createdAt) }}
                    </p>
                  </div>
                </div>
              </div>
              <ChevronRight class="text-gray-400" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <!-- Modals -->
  <CreateFolderModal
    v-model:visible="showCreateFolderModal"
    :loading="loading"
    @create="handleFolderCreate"
  />
  <CreateSetModal
    v-model:visible="showCreateSetModal"
    @created="handleSetCreated"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import {
  ChevronLeft,
  Bell,
  Search,
  FolderPlus,
  Plus,
  Folder,
  ChevronRight,
  Layers
} from "lucide-vue-next";
import { ElMessage } from "element-plus";
import { FlashcardStore } from "~/stores/flashcard";
import { useMyBaseStore } from "~/stores/base.store";
import CreateFolderModal from "~/components/flashcard/CreateFolderModal.vue";
import CreateSetModal from "~/components/flashcard/CreateSetModal.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = FlashcardStore();
const { folders, loading, error, setsInUser } = storeToRefs(store);
const searchQuery = ref("");
const userInfo = computed(() => useMyBaseStore().userInfo);
const userId = computed(() => userInfo.value?.id);
const showCreateFolderModal = ref(false);
const showCreateSetModal = ref(false);

const filteredSets = computed(() => {
  if (!searchQuery.value.trim()) {
    return setsInUser.value;
  }
  const query = searchQuery.value.toLowerCase().trim();
  return setsInUser.value.filter(set => 
    set.setName.toLowerCase().includes(query)
  );
});

const handleFolderCreate = async (name: string) => {
  if (userId.value) {
    try {
      await store.createFolder(name, userId.value);
      showCustomMessage('success', "Tạo thư mục thành công");
      showCreateFolderModal.value = false;
    } catch (err) {
      console.error("Lỗi khi tạo folder:", err);
      showCustomMessage('error', "Tạo thư mục thất bại");
    }
  }
};
const handleSetCreated = async () => {
  if (userId.value) {
    await store.fetchFoldersByUser(userId.value);
  }
};
const createNewFolder = () => {
  showCreateFolderModal.value = true;
};
const createNewSet = () => {
  showCreateSetModal.value = true;
};
const navigateToFolder = (folderId: number) => {
  router.push(`/flashcard/folder/${folderId}`);
};

onMounted(async () => {
  if (userId.value) {
    try {
      await store.fetchFoldersByUser(userId.value);
      await store.fetchSetsInUser(userId.value);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách bộ thẻ:", err);
      showCustomMessage('error', "Không thể tải danh sách bộ thẻ");
    }
  }
})
</script>

<style scoped></style>
