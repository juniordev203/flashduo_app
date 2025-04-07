import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Storage } from "@capacitor/storage";
import type {
  FlashcardFolder,
  FlashcardSet,
  Flashcard,
  FlashcardSetRequest,
  FlashcardRequest,
} from "@/auto_api/models";
import { flashcardApiUtil } from "~/utils/api.utils";

export const FlashcardStore = defineStore("flashcard", () => {
  const folders = ref<FlashcardFolder[]>([]);
  const vocabSets = ref<FlashcardSet[]>([]);
  const vocabularies = ref<Array<Flashcard>>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentFolder = ref<FlashcardFolder | null>(null);
  const currentSet = ref<FlashcardSet | null>(null);
  const currentFlashcard = ref<Flashcard | null>(null);

  const getFolders = computed(() => folders.value);
  const getVocabSets = computed(() => vocabSets.value);
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
        await getFoldersForUser(userId);
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
  const getFoldersForUser = async (userId: number) => {
    try {
      loading.value = true;
      const response =
        await flashcardApiUtil.apiFlashcardFlashcardFoldersUserIdGet(userId);
      if (response.status === 200) {
        folders.value = response.data as any;
        return response.data;
      }
    } catch (err: any) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const setCurrentFolder = (folders: FlashcardFolder) => {
    currentFolder.value = folders;
    vocabSets.value = [];
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
        await getVocabSetsInFolder(folderId);
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
  const getVocabSetsInFolder = async (folderId: number) => {
    try {
      loading.value = true;
      const response =
        await flashcardApiUtil.apiFlashcardFlashcardSetsFolderIdGet(folderId);
      if (response.status === 200) {
        vocabSets.value = response.data as any;
        return response.data;
      }
    } catch (err: any) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
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
        vocabSets.value = vocabSets.value.filter((s) => s.id !== setId);
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
        await getFlashcardsInSet(setId);
        return response.data;
      }
    } catch (err: any) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const getFlashcardsInSet = async (setId: number) => {
    try {
      loading.value = true;
      const response = await flashcardApiUtil.apiFlashcardFlashcardSetIdGet(
        setId
      );
      if (response.status === 200) {
        const data = response.data || [];
        vocabularies.value = Array.isArray(data) ? data : [];
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
          card.isFavorite = !card.isFavorite;
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

  return {
    folders,
    vocabSets,
    vocabularies,
    loading,
    error,
    currentFolder,
    currentSet,
    currentFlashcard,
    getFolders,
    getVocabSets,
    getVocabularies,
    getCurrentFolder,
    getCurrentSet,
    getCurrentFlashcard,
    createFolder,
    getFoldersForUser,
    deleteFolder,
    createVocabSet,
    getVocabSetsInFolder,
    deleteVocabSet,
    createFlashcard,
    getFlashcardsInSet,
    deleteFlashcard,
    toggleFavorite,
    setCurrentFolder,
    setCurrentSet,
    setCurrentFlashcard,
  };
});
