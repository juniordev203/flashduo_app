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
                <input v-model="searchQuery" type="text" placeholder="Tìm kiếm bộ thẻ..."
                    class="w-full p-3 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500" />
                <Search class="absolute left-3 top-3 text-gray-400" />
            </div>
            <!-- Folder Info -->
            <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div class="flex items-center gap-3 mb-4">
                    <Folder class="text-blue-500" :size="24" />
                    <div>
                        <h2 class="text-lg font-semibold">{{ currentFolder?.folderName }}</h2>
                        <p class="text-sm text-gray-500">Tạo ngày: {{ formatCustomDateTime(currentFolder?.createdAt) }}
                        </p>
                    </div>
                </div>
                <div class="flex gap-4 text-sm text-gray-500">
                    <span>{{ setsInFolder.length }} bộ thẻ</span>
                    <span>{{ vocabularies.length }} từ vựng</span>
                </div>
            </div>
            <!-- Vocab Sets List -->
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold">Bộ thẻ</h3>
                    <button @click="createNewSet" class="flex items-center gap-2 text-blue-600">
                        <Plus :size="20" />
                        <span class="text-sm font-medium">Thêm bộ thẻ</span>
                    </button>
                </div>
                <div class="flex flex-col gap-4">
                    <NuxtLink :to="`/flashcard/folder/${folderId}/set/${set.id}`" v-for="set in filteredSets" :key="set.id"
                        class="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div class="flex justify-between items-center">
                            <div class="flex-1">
                                <h4 class="font-medium">{{ set.setName }}</h4>
                                <p class="text-sm text-gray-500">{{ set.totalCards || 0 }} từ vựng</p>
                            </div>
                            <ChevronRight class="text-gray-400" />
                        </div>
                    </NuxtLink>
                </div>
                <!-- Empty State -->
                <div v-show="setsInFolder.length === 0" class="text-center py-8 text-gray-500">
                    <Files :size="48" class="mx-auto mb-4 opacity-50" />
                    <p>Chưa có bộ thẻ nào. Hãy tạo bộ thẻ đầu tiên!</p>
                </div>
            </div>
        </div>
        <!-- Action Sheet -->
        <el-dialog v-model="showActions" title="Tùy chọn" width="90%">
            <div class="flex flex-col gap-4">
                <button class="text-left p-3 hover:bg-gray-50 rounded-lg" @click="handleRename">
                    <Edit2 class="inline-block mr-2" :size="20" />
                    Đổi tên thư mục
                </button>
                <button class="text-left p-3 hover:bg-gray-50 rounded-lg text-red-500" @click="handleDelete">
                    <Trash2 class="inline-block mr-2" :size="20" />
                    Xóa thư mục
                </button>
            </div>
        </el-dialog>
        <!-- Create Set Modal -->
        <CreateSetModal v-model:visible="showCreateSetModal" :folder-id="folderId" @created="handleSetCreated" />
        <el-dialog
        v-model="showRenameModal"
        title="Đổi tên thư mục"
        width="90%"
        :show-close="false"
        :close-on-click-modal="false"
    >
        <div class="p-4">
            <input
                v-model="newFolderName"
                type="text"
                class="w-full p-3 rounded-lg border border-gray-200 focus:outline-none"
                placeholder="Nhập tên thư mục mới"
                @keyup.enter="submitRename"
            />
        </div>
        <template #footer>
            <div class="flex justify-end gap-2">
                <el-button @click="showRenameModal = false">Hủy</el-button>
                <el-button
                    type="primary"
                    @click="submitRename"
                    :disabled="!newFolderName.trim() || newFolderName === currentFolder?.folderName"
                >
                    Lưu
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
    Edit2, Trash2
} from 'lucide-vue-next';
import { ElMessage, ElMessageBox } from 'element-plus';
import { FlashcardStore } from '~/stores/flashcard';
import CreateSetModal from '~/components/flashcard/CreateSetModal.vue';
const route = useRoute();
const router = useRouter();
const store = FlashcardStore();
const { folders, setsInFolder, setsInUser, loading, vocabularies } = storeToRefs(store);
const folderId = Number(route.params.folderId);
const searchQuery = ref('');
const showActions = ref(false);
const showCreateSetModal = ref(false);
const showRenameModal = ref(false);
const newFolderName = ref('');

onMounted(async () => {
    if (folderId) {
        try {
            await store.fetchSetsInFolder(folderId);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách bộ thẻ:", err);
            showCustomMessage('error', "Không thể tải danh sách bộ thẻ");
        }
    }
});
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
    // Implement rename logic
    newFolderName.value = currentFolder.value?.folderName || ''; 
    showRenameModal.value = true;
};
const submitRename = async () => {
    try {
        if (!newFolderName.value.trim()) {
            showCustomMessage('error', 'Tên thư mục không được để trống');
            return;
        }
        if (newFolderName.value === currentFolder.value?.folderName) {
            showRenameModal.value = false;
            return;
        }
        await store.updateFolderName(folderId, newFolderName.value.trim());
        showCustomMessage('success', 'Đã đổi tên thư mục');
        showRenameModal.value = false;
        await store.fetchSetsInFolder(folderId);
        showActions.value = false;
    } catch (err) {
        console.error("Lỗi khi đổi tên thư mục:", err);
        showCustomMessage('error', 'Đổi tên thư mục thất bại');
        showRenameModal.value = false;
    }
}
const handleDelete = async () => {
    try {
        await ElMessageBox.confirm(
            'Bạn có chắc chắn muốn xóa thư mục này? Tất cả bộ thẻ trong thư mục sẽ bị xóa.',
            'Xác nhận xóa',
            {
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
                type: 'warning'
            }
        );

        await store.deleteFolder(folderId);
        showCustomMessage('success', 'Đã xóa thư mục');
        router.push('/flashcard');
    } catch (err) {
        if (err !== 'cancel') {
            console.error("Lỗi khi xóa thư mục:", err);
            showCustomMessage('error', 'Xóa thư mục thất bại');
        }
    }
};
</script>

<style scoped>
</style>