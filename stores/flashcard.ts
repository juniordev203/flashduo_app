import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Storage } from "@capacitor/storage";
import type {
  FlashcardFolder,
  FlashcardSet,
  Flashcard,
  FlashcardSetRequest,
  FlashcardRequest,
  FlashcardResponse,
} from "@/auto_api/models";
import { flashcardApiUtil } from "~/utils/api.utils";

export const FlashcardStore = defineStore("flashcard", () => {
  const folders = ref<FlashcardFolder[]>([]);
  const setsInfolder = ref<FlashcardSet[]>([]);
  const setsInUser = ref<FlashcardSet[]>([]);
  const vocabularies = ref<FlashcardResponse[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentFolder = ref<FlashcardFolder | null>(null);
  const currentSet = ref<FlashcardSet | null>(null);
  const currentFlashcard = ref<Flashcard | null>(null);

  const getFolders = computed(() => folders.value);
  const getSetsInFolder = computed(() => setsInfolder.value);
  const getSetsInUser = computed(() => setsInUser.value);
  const getVocabularies = computed(() => vocabularies.value);
  const getCurrentFolder = computed(() => currentFolder.value);
  const getCurrentSet = computed(() => currentSet.value);
  const getCurrentFlashcard = computed(() => currentFlashcard.value);

  const handleApiError = (err: any) => {
    error.value =
      err?.response?.data?.message || err?.message || "Lỗi không xác định!";
    console.error(error.value);
  };
  
  // tao folder voi ten va id user
  const createFolder = async (name: string, userId: number) => {
    if (!name || name.trim() === "") {
      error.value = "Tên folder không được để trống!";
      return;
    }
    try {
      loading.value = true;
      const response = await flashcardApiUtil.apiFlashcardFlashcardFolderPost({
        folderName: name,
        userId: userId,
      });
      if (response.status === 200) {
        await fetchFoldersByUser(userId);
        return response.data;
      } else {
        throw new Error("Lỗi khi tạo folder mới!");
      }
    } catch (err: any) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  
  //lay danh sach folder cua user
  const fetchFoldersByUser = async (userId: number) => {
    try {
      loading.value = true;
      const response =
        await flashcardApiUtil.apiFlashcardFlashcardFoldersUserIdGet(userId);
      if (response.status === 200) {
        const data = response.data || [];
        folders.value = Array.isArray(data) ? data : [];
        return response.data;
      }
    } catch (err: any) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  
  const setCurrentFolder = (folder: FlashcardFolder) => {
    currentFolder.value = folder;
    setsInfolder.value = [];
    vocabularies.value = [];
  };

  //xoa folder theo id folder
  const deleteFolder = async (folderId: number) => {
    try {
      loading.value = true;
      const response =
        await flashcardApiUtil.apiFlashcardFlashcardFolderDeleteIdDelete(
          folderId
        );
      if (response.status === 200) {
        folders.value = folders.value.filter(
          (folder) => folder.id !== folderId
        );
        return response.data;
      }
    } catch (err: any) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  
  // tao bo the tu vung
  const createVocabSet = async (
    setName: string,
    description: string,
    isPublic: boolean,
    folderId: number,
    userId: number
  ) => {
    try {
      loading.value = true;
      const payload: FlashcardSetRequest = {
        setName: setName,
        description: description,
        isPublic: isPublic,
        flashcardFolderId: folderId,
        userId: userId,
      };
      const response = await flashcardApiUtil.apiFlashcardFlashcardSetPost(
        payload
      );
      if (response.status === 200) {
        await fetchSetsInFolder(folderId);
        await fetchSetsInUser(userId);
        return response.data;
      }
    } catch (err: any) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  
  // lay danh sach bo the tu vung theo id folder
  const fetchSetsInFolder = async (folderId: number) => {
    try {
      loading.value = true;
      const response =
        await flashcardApiUtil.apiFlashcardFlashcardSetsFolderFolderIdGet(folderId);
      if (response.status === 200) {
        const data = response.data || [];
        setsInfolder.value = Array.isArray(data) ? data : [];
        return response.data;
      }
    } catch (err: any) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  
  // Lấy tất cả bộ thẻ của user
  const fetchSetsInUser = async (userId: number) => {
    try {
      loading.value = true;
      const response = await flashcardApiUtil.apiFlashcardFlashcardSetsUserUserIdGet(userId);
      if (response.status === 200) {
        const data = response.data || [];
        setsInUser.value = Array.isArray(data) ? data : [];
        return response.data;
      }
    } catch (err: any) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  }
  
  const setCurrentSet = (set: FlashcardSet) => {
    currentSet.value = set;
    vocabularies.value = [];
  };
  
  const deleteVocabSet = async (setId: number) => {
    try {
      loading.value = true;
      const response =
        await flashcardApiUtil.apiFlashcardFlashcardSetDeleteIdDelete(setId);
      if (response.status === 200) {
        setsInfolder.value = setsInfolder.value.filter((s) => s.id !== setId);
        setsInUser.value = setsInUser.value.filter((s) => s.id !== setId);
        return true;
      }
    } catch (err: any) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  //flashcard
  const createFlashcard = async (
    termLanguage: string,
    definitionLanguage: string,
    imageUrl: string,
    audioUrl: string,
    setId: number,
    userId: number
  ) => {
    try {
      loading.value = true;
      const payload: FlashcardRequest = {
        termLanguage: termLanguage,
        definitionLanguage: definitionLanguage,
        imageUrl: imageUrl || '',
        audioUrl: audioUrl || '',
        flashcardSetId: setId,
        userId: userId,
      };
      const response = await flashcardApiUtil.apiFlashcardFlashcardPost(
        payload
      );
      if (response.status === 200) {
        await fetchFlashcardsInSet(setId);
        return response.data;
      }
    } catch (err: any) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  
  const fetchFlashcardsInSet = async (setId: number) => {
    try {
      console.log("Fetching flashcards in set:", setId);
      loading.value = true;
      const response = await flashcardApiUtil.apiFlashcardFlashcardSetIdGet(
        setId
      );
      console.log("Response:", response);
      if (response.status === 200) {
        const data = response.data || [];
        vocabularies.value = Array.isArray(data.flashcards) ? data.flashcards : [];
        return response.data;
        
      }
    } catch (err: any) {
      handleApiError(err);
      vocabularies.value = [];
      throw err;
    } finally {
      loading.value = false;
    }
  };
  
  const setCurrentFlashcard = (flashcard: Flashcard) => {
    currentFlashcard.value = flashcard;
  };

  const deleteFlashcard = async (flashcardId: number) => {
    try {
      loading.value = true;
      const response =
        await flashcardApiUtil.apiFlashcardFlashcardDeleteIdDelete(flashcardId);
      if (response.status === 200) {
        vocabularies.value = vocabularies.value.filter(
          (v) => v.id !== flashcardId
        );
        return true;
      }
    } catch (err: any) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const toggleFavorite = async (flashcardId: number) => {
    try {
      loading.value = true;
      const response =
        await flashcardApiUtil.apiFlashcardFlashcardIdFavoritePut(flashcardId);
      if (response.status === 200) {
        const card = vocabularies.value.find((v) => v.id === flashcardId);
        if (card) {
          card.isFavourite = !card.isFavourite;
        }
        return true;
      }
    } catch (err: any) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    folders.value = [];
    setsInfolder.value = [];
    setsInUser.value = [];
    vocabularies.value = [];
    loading.value = false;
    error.value = null;
    currentFolder.value = null;
    currentSet.value = null;
    currentFlashcard.value = null;
  }
  // Thêm method mới để làm rõ mục đích và tên phương thức
  const getFlashcardSetsForUser = fetchSetsInUser;
  const getFoldersForUser = fetchFoldersByUser;

  return {
    folders,
    setsInfolder,
    setsInUser,
    vocabularies,
    loading,
    error,
    currentFolder,
    currentSet,
    currentFlashcard,
    getFolders,
    getSetsInFolder,
    getSetsInUser,
    getVocabularies,
    getCurrentFolder,
    getCurrentSet,
    getCurrentFlashcard,
    createFolder,
    fetchFoldersByUser,
    getFoldersForUser,
    deleteFolder,
    createVocabSet,
    fetchSetsInFolder,
    fetchSetsInUser,
    getFlashcardSetsForUser,
    deleteVocabSet,
    createFlashcard,
    fetchFlashcardsInSet,
    deleteFlashcard,
    toggleFavorite,
    setCurrentFolder,
    setCurrentSet,
    setCurrentFlashcard,
    reset
  };
});