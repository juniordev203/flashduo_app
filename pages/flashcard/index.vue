<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
        <NuxtLink to="/">
          <ChevronLeft class="w-6 h-6 text-black" />
        </NuxtLink>
      </template>
      <template v-slot:default>
        <span class="text-base font-medium text-black">{{ $t('lang_core_flashcard_vocab') }}</span>
      </template>
      <template v-slot:right>
        <MoreVertical class="text-black" :size="20" />
      </template>
    </AtomHeaderSafe>
    <div class="h-full w-full overflow-auto p-4 flex flex-col gap-6">
      <!-- Search Bar -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="$t('lang_core_flashcard_search')"
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
          <span class="text-sm font-medium">{{ $t('lang_core_flashcard_create_folder') }}</span>
        </button>
        <button
          @click="createNewSet"
          class="p-4 bg-green-100 rounded-lg flex flex-col items-center justify-center gap-2"
        >
          <Plus class="text-green-600" />
          <span class="text-sm font-medium">{{ $t('lang_core_flashcard_create_set') }}</span>
        </button>
      </div>
      <!-- Folders -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">{{ $t('lang_core_flashcard_folder') }}</h2>
        <div v-if="loading && folders.length === 0" class="flex justify-center py-4">
          <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="folders.length === 0" class="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
          <p class="text-gray-500">{{ $t('lang_core_flashcard_empty_folder') }}</p>
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
                    {{ $t('lang_core_flashcard_folder_date') }} {{ formatCustomDateTime(folder.createdAt) }}
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
        <h2 class="text-lg font-semibold">{{ $t('lang_core_flashcard_sets') }}</h2>
        <div v-if="loading" class="flex justify-center py-4">
          <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="setsInUser.length === 0" class="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
          <p class="text-gray-500">{{ $t('lang_core_flashcard_empty_set') }}</p>
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
                      {{ set.totalCards || 0 }} {{ $t('lang_core_flashcard_vocab_count') }}
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
  Layers,
  MoreVertical
} from "lucide-vue-next";
import { ElMessage } from "element-plus";
import { FlashcardStore } from "~/stores/flashcard";
import { useMyBaseStore } from "~/stores/base.store";
import CreateFolderModal from "~/components/flashcard/CreateFolderModal.vue";
import CreateSetModal from "~/components/flashcard/CreateSetModal.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
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
      showCustomMessage('success', t('lang_core_messages.success_create_folder'));
      showCreateFolderModal.value = false;
    } catch (err) {
      console.error("Lỗi khi tạo folder:", err);
      showCustomMessage('error', t('lang_core_messages.error_create_folder'));
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
      showCustomMessage('error', t('lang_core_messages.error_load_sets'));
    }
  }
})
</script>

<style scoped></style>