<template>
    <div class="h-full w-full flex flex-col bg-slate-50">
        <!-- Header -->
        <AtomHeaderSafe class="shadow-md">
            <template v-slot:left>
                <NuxtLink :to="`/flashcard`">
                    <button>
                        <ChevronLeft class="w-6 h-6 text-black" />
                    </button>
                </NuxtLink>
            </template>
            <template v-slot:default>
                <span class="text-base font-medium text-black">
                    {{ currentFolder?.folderName }}
                </span>
            </template>
            <template v-slot:right>
                <MoreVertical class="text-black cursor-pointer" :size="20" @click="showActions = true" />
            </template>
        </AtomHeaderSafe>
        <div class="h-full w-full overflow-auto p-4 flex flex-col gap-6">
            <!-- Search Bar -->
            <div class="relative">
                <input v-model="searchQuery" type="text" :placeholder="$t('lang_core_flashcard_search')"
                    class="w-full p-3 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500" />
                <Search class="absolute left-3 top-3 text-gray-400" />
            </div>
            <!-- Folder Info -->
            <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div class="flex items-center gap-3 mb-4">
                    <Folder class="text-blue-500" :size="24" />
                    <div>
                        <h2 class="text-lg font-semibold">{{ currentFolder?.folderName }}</h2>
                        <p class="text-sm text-gray-500">{{ $t('lang_core_flashcard_folder_date') }} {{ formatCustomDateTime(currentFolder?.createdAt) }}
                        </p>
                    </div>
                </div>
                <div class="flex gap-4 text-sm text-gray-500">
                    <span>{{ setsInFolder.length }} {{ $t('lang_core_flashcard_folder_stats') }}</span>
                    <span>{{ vocabularies.length }} {{ $t('lang_core_flashcard_vocab_count') }}</span>
                </div>
            </div>
            <!-- Vocab Sets List -->
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold">{{ $t('lang_core_flashcard_sets') }}</h3>
                    <button @click="createNewSet" class="flex items-center gap-2 text-blue-600">
                        <Plus :size="20" />
                        <span class="text-sm font-medium">{{ $t('lang_core_flashcard_add_set') }}</span>
                    </button>
                </div>
                <div class="flex flex-col gap-4">
                    <NuxtLink :to="`/flashcard/folder/${folderId}/set/${set.id}`" v-for="set in filteredSets" :key="set.id"
                        class="p-4 flex justify-between items-center gap-2 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div class="flex justify-between items-center gap-2">
                            <Layers class="text-green-500"/>
                            <div class="flex-1">
                                <h4 class="font-medium">{{ set.setName }}</h4>
                                <p class="text-sm text-gray-500">{{ set.totalCards || 0 }} {{ $t('lang_core_flashcard_vocab_count') }}</p>
                            </div>
                        </div>
                        <ChevronRight class="text-gray-400" />
                    </NuxtLink>
                </div>
                <!-- Empty State -->
                <div v-show="setsInFolder.length === 0" class="text-center py-8 text-gray-500">
                    <Files :size="48" class="mx-auto mb-4 opacity-50" />
                    <p>{{ $t('lang_core_flashcard_set_empty') }}</p>
                </div>
            </div>
        </div>
        <!-- Action Sheet -->
        <el-dialog v-model="showActions" :title="$t('lang_core_modal.options')" width="90%">
            <div class="flex flex-col gap-4">
                <button class="text-left p-3 hover:bg-gray-50 rounded-lg" @click="handleRename">
                    <Edit2 class="inline-block mr-2" :size="20" />
                    {{ $t('lang_core_flashcard_rename_folder') }}
                </button>
                <button class="text-left p-3 hover:bg-gray-50 rounded-lg text-red-500" @click="handleDelete">
                    <Trash2 class="inline-block mr-2" :size="20" />
                    {{ $t('lang_core_flashcard_delete_folder') }}
                </button>
            </div>
        </el-dialog>
        <!-- Create Set Modal -->
        <CreateSetModal v-model:visible="showCreateSetModal" :folder-id="folderId" @created="handleSetCreated" />
        <el-dialog
            v-model="showRenameModal"
            :title="$t('lang_core_flashcard_rename_folder_title')"
            width="90%"
            :show-close="false"
            :close-on-click-modal="false"
        >
            <div class="p-4">
                <input
                    v-model="newFolderName"
                    type="text"
                    class="w-full p-3 rounded-lg border border-gray-200 focus:outline-none"
                    :placeholder="$t('lang_core_form.folder_name')"
                    @keyup.enter="submitRename"
                />
            </div>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <el-button @click="showRenameModal = false">{{ $t('lang_core_modal.cancel') }}</el-button>
                    <el-button
                        type="primary"
                        @click="submitRename"
                        :disabled="!newFolderName.trim() || newFolderName === currentFolder?.folderName"
                    >
                        {{ $t('lang_core_modal.save') }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import {
    ChevronLeft, Search, Plus, Folder,
    ChevronRight, MoreVertical, Files,
    Edit2, Trash2, Layers
} from 'lucide-vue-next';
import { ElMessageBox } from 'element-plus';
import { FlashcardStore } from '~/stores/flashcard';
import CreateSetModal from '~/components/flashcard/CreateSetModal.vue';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const store = FlashcardStore();
const { folders, setsInFolder, vocabularies } = storeToRefs(store);

const folderId = Number(route.params.folderId);

const searchQuery = ref('');
const showActions = ref(false);
const showCreateSetModal = ref(false);
const showRenameModal = ref(false);
const newFolderName = ref('');

const currentFolder = computed(() =>
    folders.value.find(f => f.id === folderId)
);
const filteredSets = computed(() =>
    setsInFolder.value.filter(set =>
        set.setName.toLowerCase().includes(searchQuery.value.toLowerCase())
    ) || []
);
const createNewSet = () => {
    showCreateSetModal.value = true;
};
const handleSetCreated = async () => {
    await store.fetchSetsInFolder(folderId);
};
const handleRename = () => {
    showActions.value = false;
    newFolderName.value = currentFolder.value?.folderName || ''; 
    showRenameModal.value = true;
};
const submitRename = async () => {
    try {
        if (!newFolderName.value.trim()) {
            showCustomMessage('error', t('lang_core_flashcard_rename_folder_error'));
            return;
        }
        if (newFolderName.value === currentFolder.value?.folderName) {
            showRenameModal.value = false;
            return;
        }
        await store.updateFolderName(folderId, newFolderName.value.trim());
        showCustomMessage('success', t('lang_core_flashcard_rename_success'));
        showRenameModal.value = false;
        await store.fetchSetsInFolder(folderId);
        showActions.value = false;
    } catch (err) {
        console.error("Lỗi khi đổi tên thư mục:", err);
        showCustomMessage('error', t('lang_core_messages.error_rename_folder'));
        showRenameModal.value = false;
    }
}
const handleDelete = async () => {
    try {
        await ElMessageBox.confirm(
            t('lang_core_flashcard_delete_confirm'),
            t('lang_core_modal.delete'),
            {
                confirmButtonText: t('lang_core_modal.delete'),
                cancelButtonText: t('lang_core_modal.cancel'),
                type: 'warning'
            }
        );

        await store.deleteFolder(folderId);
        showCustomMessage('success', t('lang_core_flashcard_delete_success'));
        router.push('/flashcard');
    } catch (err) {
        if (err !== 'cancel') {
            console.error("Lỗi khi xóa thư mục:", err);
            showCustomMessage('error', t('lang_core_messages.error_delete_folder'));
        }
    }
};
const flashcardStore = FlashcardStore();
const cards = computed(() => vocabularies.value || []);
onMounted(async () => {
    if (folderId) {
        try {
            await store.fetchSetsInFolder(folderId);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách bộ thẻ:", err);
            showCustomMessage('error', t('lang_core_messages.error_load_sets'));
        }
    }
});
</script>