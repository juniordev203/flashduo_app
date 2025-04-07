<template>
    <div class="h-full w-full flex flex-col bg-slate-50">
        <AtomHeaderSafe class="shadow-md">
            <template v-slot:left>
                <NuxtLink to="/">
                    <ChevronLeft class="w-6 h-6 text-black" />
                </NuxtLink>
            </template>
            <template v-slot:default>
                <span class="text-base font-medium text-black">
                    Flashcard
                </span>
            </template>
            <template v-slot:right>
                <Bell :size="20" class="text-black" fill="bg-black" />
            </template>
        </AtomHeaderSafe>
        
        <div class="h-full w-full overflow-auto p-4 flex flex-col gap-6">
            <!-- Search Bar -->
            <div class="relative">
                <input 
                    type="text" 
                    placeholder="Tìm kiếm bộ thẻ..." 
                    class="w-full p-3 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                />
                <Search class="absolute left-3 top-3 text-gray-400"/>
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

            <!-- Recent Sets -->
            <div class="space-y-4">
                <h2 class="text-lg font-semibold">Gần đây</h2>
                <div class="grid grid-cols-1 gap-4">
                    <div v-for="set in recentSets" :key="set.id" 
                        class="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div class="flex justify-between items-center">
                            <div>
                                <h3 class="font-medium">{{ set.name }}</h3>
                                <p class="text-sm text-gray-500">{{ set.cardCount }} thẻ</p>
                            </div>
                            <MoreVertical class="text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Folders -->
            <div class="space-y-4">
                <h2 class="text-lg font-semibold">Thư mục của tôi</h2>
                <div class="grid grid-cols-1 gap-4">
                    <div v-for="folder in folders" :key="folder.id" 
                        class="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-3">
                                <Folder class="text-blue-500" />
                                <div>
                                    <h3 class="font-medium">{{ folder.folderName }}</h3>
                                    <p class="text-sm text-gray-500">{{ folder.createdAt }}</p>
                                </div>
                            </div>
                            <ChevronRight  class="text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeft, Bell, Search, FolderPlus, Plus, MoreVertical, Folder, ChevronRight } from 'lucide-vue-next'
import { ElMessage } from 'element-plus';
import { FlashcardStore } from '~/stores/flashcard'
import { useMyBaseStore } from '~/stores/base.store';

const store =  FlashcardStore()
const { folders, loading, error } = storeToRefs(store)

const userInfo = computed(() => useMyBaseStore().userInfo);
const userId = userInfo.value?.id;
onMounted(async () => {
    if (userId) {
        try {
            await store.getFoldersForUser(userId);
        } catch (err) {
            console.error("Loi khi lay folder:", err);
        }
    }
});
const handleCreateFolder = async (name: string) => {
    if (userId) {
        try {
            await store.createFolder(name, userId);
            ElMessage.success("Tạo thư mục thành công");
        } catch (err) {
            console.error("Loi khi tao folder:", err);
            ElMessage.error("Tạo thư mục thất bại");
        }
    }
}
// Mock data - replace with actual data from your store
const recentSets = ref([
    { id: 1, name: 'English Vocabulary', cardCount: 50 },
    { id: 2, name: 'TOEIC Part 7', cardCount: 30 },
])


const createNewFolder = async () => {
    // Implement folder creation logic
}

const createNewSet = async () => {
    // Implement set creation logic
}
</script>

<style scoped>
.grid {
    display: grid;
}
</style>