import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  type FlashcardFolder,
  type FlashcardSet,
  type Flashcard,
  type FlashcardSetRequest,
  type FlashcardRequest,
  type FlashcardResponse,
  type FlashcardFavoritesResponse,
  type FlashcardGameResultRequest,
  type FlashcardGameResultByUserResponse,
  type FlashcardGameResultBySetResponse,
} from "@/auto_api/models";
import { flashcardApiUtil } from "~/utils/api.utils";
import { set } from "date-fns";

export const FlashcardStore = defineStore("flashcard", () => {
  // State
  const folders = ref<FlashcardFolder[]>([]);
  const setsInFolder = ref<FlashcardSet[]>([]);
  const setsInUser = ref<FlashcardSet[]>([]);
  const vocabularies = ref<FlashcardResponse[]>([]);
  const vocabFavorites = ref<FlashcardFavoritesResponse[]>([]);
  const gameResultBySets = ref<FlashcardGameResultBySetResponse[]>([]);
  const gameResultByUsers = ref<FlashcardGameResultByUserResponse[]>([]);

  const currentFolder = ref<FlashcardFolder | null>(null);
  const currentSet = ref<FlashcardSet | null>(null);
  const currentFlashcard = ref<Flashcard | null>(null);

  const loading = ref(false);
  const error = ref<string | null>(null);

  // Computed
  const getFolders = computed(() => folders.value);
  const getSetsInFolder = computed(() => setsInFolder.value);
  const getSetsInUser = computed(() => setsInUser.value);
  const getVocabularies = computed(() => vocabularies.value);
  const getvocabularies = computed(() => vocabularies.value);
  const getCurrentFolder = computed(() => currentFolder.value);
  const getCurrentSet = computed(() => currentSet.value);
  const getCurrentFlashcard = computed(() => currentFlashcard.value);

  // Error handler
  const handleApiError = (err: any) => {
    error.value =
      err?.response?.data?.message || err?.message || "Lỗi không xác định!";
    console.error(error.value);
  };

  // Folder Methods
  const fetchFoldersByUser = async (userId: number) => {
    try {
      loading.value = true;
      const response =
        await flashcardApiUtil.apiFlashcardFlashcardFoldersUserIdGet(userId);
      if (response.status === 200) {
        folders.value = Array.isArray(response.data) ? response.data : [];
        return folders.value;
      }
    } catch (err) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createFolder = async (name: string, userId: number) => {
    if (!name || name.trim() === "") {
      error.value = "Tên folder không được để trống!";
      return;
    }
    try {
      loading.value = true;
      const response = await flashcardApiUtil.apiFlashcardFlashcardFolderPost({
        folderName: name,
        userId,
      });
      if (response.status === 200) {
        await fetchFoldersByUser(userId);
        return response.data;
      }
    } catch (err) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateFolderName = async (folderId: number, name: string) => {
    try {
      loading.value = true;
      const response =
        await flashcardApiUtil.apiFlashcardFlashcardFolderNameIdPut(
          folderId,
          name
        );
      if (response.status === 200) {
        const index = folders.value.findIndex((f) => f.id === folderId);
        if (index !== -1) folders.value[index].folderName = name;
        return response.data;
      }
    } catch (err) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

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
        return true;
      }
    } catch (err) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const setCurrentFolder = (folder: FlashcardFolder) => {
    currentFolder.value = folder;
    setsInFolder.value = [];
    vocabularies.value = [];
  };

  // Set Methods
  const fetchSetsInFolder = async (folderId: number) => {
    try {
      loading.value = true;
      const response =
        await flashcardApiUtil.apiFlashcardFlashcardSetsFolderFolderIdGet(
          folderId
        );
      if (response.status === 200) {
        setsInFolder.value = Array.isArray(response.data) ? response.data : [];
        return setsInFolder.value;
      }
    } catch (err) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchSetsInUser = async (userId: number) => {
    try {
      loading.value = true;
      const response =
        await flashcardApiUtil.apiFlashcardFlashcardSetsUserUserIdGet(userId);
      if (response.status === 200) {
        setsInUser.value = Array.isArray(response.data) ? response.data : [];
        return setsInUser.value;
      }
    } catch (err) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

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
        setName,
        description,
        isPublic,
        flashcardFolderId: folderId,
        userId,
      };
      const response = await flashcardApiUtil.apiFlashcardFlashcardSetPost(
        payload
      );
      if (response.status === 200) {
        await fetchSetsInFolder(folderId);
        await fetchSetsInUser(userId);
        return response.data;
      }
    } catch (err) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const updateSetName = async (setId: number, name: string) => {
    try {
      loading.value = true;
      const response = await flashcardApiUtil.apiFlashcardFlashcardSetNameIdPut(setId, name);
      if (response.status === 200) {
        const index = setsInFolder.value.findIndex((s) => s.id === setId);
        if (index !== -1) setsInFolder.value[index].setName = name;
        return response.data;
      }
    } catch (err) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  }
  const deleteVocabSet = async (setId: number) => {
    try {
      loading.value = true;
      const response =
        await flashcardApiUtil.apiFlashcardFlashcardSetDeleteIdDelete(setId);
      if (response.status === 200) {
        setsInFolder.value = setsInFolder.value.filter((s) => s.id !== setId);
        setsInUser.value = setsInUser.value.filter((s) => s.id !== setId);
        return true;
      }
    } catch (err) {
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

  // Flashcard Methods
  const fetchFlashcardsInSet = async (setId: number) => {
    try {
      loading.value = true;
      const response = await flashcardApiUtil.apiFlashcardFlashcardSetSetIdGet(
        setId
      );
      if (response.status === 200) {
        vocabularies.value = Array.isArray(response.data) ? response.data : [];
        return vocabularies.value;
      }
    } catch (err) {
      handleApiError(err);
      vocabularies.value = [];
      throw err;
    } finally {
      loading.value = false;
    }
  };

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
        termLanguage,
        definitionLanguage,
        imageUrl: imageUrl || "",
        audioUrl: audioUrl || "",
        flashcardSetId: setId,
        userId,
      };
      const response = await flashcardApiUtil.apiFlashcardFlashcardPost(
        payload
      );
      if (response.status === 200) {
        await fetchFlashcardsInSet(setId);
        return response.data;
      }
    } catch (err) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
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
    } catch (err) {
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
        const index = vocabularies.value.findIndex((f) => f.id === flashcardId);
        if (index !== -1) {
          vocabularies.value[index].isFavorite =
            !vocabularies.value[index].isFavorite;
        }
      }
    } catch (err) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchVocabFavoritesByUserId = async (userId: number) => {
    try {
      loading.value = true;
      const response =
        await flashcardApiUtil.apiFlashcardFlashcardFavoritesUserIdGet(userId);
      if (response.status === 200) {
        vocabFavorites.value = Array.isArray(response.data)
          ? response.data
          : [];
        return vocabFavorites.value;
      }
    } catch (err) {
      handleApiError(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const setCurrentFlashcard = (flashcard: Flashcard) => {
    currentFlashcard.value = flashcard;
  };

  //game methods
  const upGameResult = async (
    userId: number,
    setId: number,
    totalWord: number,
    durationTime: number
  ) => {
    try {
      loading.value = true;
      if (!userId || !setId) {
        console.warn("Thiếu userId hoặc examId, không thể tạo phần chơi!");
        return;
      }
      const request: FlashcardGameResultRequest = {
        userId,
        setId,
        totalWord,
        durationTime,
      };
      const respone =
        await flashcardApiUtil.apiFlashcardFlashcardGameResultPost(request);
      if (respone) {
        console.log("game thanh cong");
      }
    } catch (err: any) {
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const fetchGameRankingsBySetId = async (setId: number) => {
    try {
      loading.value = true;
      const response =
        await flashcardApiUtil.apiFlashcardFlashcardGameResultSetSetIdGet(
          setId
        );
      if (response.status === 200) {
        gameResultBySets.value = Array.isArray(response.data)
          ? response.data
          : [];
        return vocabFavorites.value;
      }
    } catch (err: any) {
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const fetchGameRankingsByUserId = async (userId: number) => {
    try {
      loading.value = true;
      const response =
        await flashcardApiUtil.apiFlashcardFlashcardGameResultUserUserIdGet(
          userId
        );
      if (response.status === 200) {
        gameResultByUsers.value = Array.isArray(response.data)
          ? response.data
          : [];
        return vocabFavorites.value;
      }
    } catch (err: any) {
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    folders.value = [];
    setsInFolder.value = [];
    setsInUser.value = [];
    vocabularies.value = [];
    vocabularies.value = [];
    vocabFavorites.value = [];
    currentFolder.value = null;
    currentSet.value = null;
    currentFlashcard.value = null;
    error.value = null;
    loading.value = false;
  };

  return {
    // State
    folders,
    setsInFolder,
    setsInUser,
    vocabularies,
    vocabFavorites,
    currentFolder,
    currentSet,
    currentFlashcard,
    loading,
    error,
    gameResultBySets,
    gameResultByUsers,

    // Computed
    getFolders,
    getSetsInFolder,
    getSetsInUser,
    getVocabularies,
    getvocabularies,
    getCurrentFolder,
    getCurrentSet,
    getCurrentFlashcard,

    // Methods
    fetchFoldersByUser,
    createFolder,
    updateFolderName,
    deleteFolder,
    setCurrentFolder,

    fetchSetsInFolder,
    fetchSetsInUser,
    createVocabSet,
    deleteVocabSet,
    setCurrentSet,

    fetchFlashcardsInSet,
    createFlashcard,
    deleteFlashcard,
    toggleFavorite,
    fetchVocabFavoritesByUserId,
    setCurrentFlashcard,
    upGameResult,
    fetchGameRankingsBySetId,
    fetchGameRankingsByUserId,
    updateSetName,
    reset,
  };
});
