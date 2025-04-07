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
import { fileURLToPath } from "url";
//Store de lam gi?
//Store la khoang nho de luu tru du lieu
//Store hoat dong dua tren co che gi?
//Cau truc cua mot store la gi?
//Store hoat dong dua tren co che gi? Store hoat dong dua tren co che reactivity

export const FlashcardStore = defineStore("flashcard", () => {
  const folders = ref<FlashcardFolder[]>([]);
  const vocabSets = ref<FlashcardSet[]>([]);
  const vocabularies = ref<Flashcard[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const getFolders = computed(() => folders.value);
  const getVocabSets = computed(() => vocabSets.value);
  const getVocabularies = computed(() => vocabularies.value);
// tao folder voi ten va id user
  const createFolder = async (name: string, userId: number) => {
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
        throw new Error("Failed to create folder");
      }
    } catch (err: any) {
      error.value = err.message;
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
        await flashcardApiUtil.apiFlashcardFlashcardFoldersUserUserIdGet(
          userId
        );
      if (response.status === 200) {
        folders.value = response.data as any;
        return response.data;
      }
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  //xoa folder theo id folder
  const deleteFolder = async (folderId: number) => {
    try {
        loading.value = true;
        const response = await flashcardApiUtil.apiFlashcardFlashcardFolderDeleteIdDelete(folderId);
        if (response.status === 200) {
            folders.value = folders.value.filter((folder) => folder.id !== folderId);
            return response.data;
        }
    } catch (err: any) {
        error.value = err.message;
        throw err;
    }
}
// tao bo the tu vung 
const createVocabSet = async (setName: string, description: string, isPublic: boolean, folderId: number, userId: number) => {
    try {
        loading.value = true;
        const payload: FlashcardSetRequest = {
            setName: setName,
            description: description,
            isPublic: isPublic,
            flashcardFolderId: folderId,
            userId: userId
        }
        const response = await flashcardApiUtil.apiFlashcardFlashcardSetPost(payload)
        if (response.status === 200) {
            await getVocabSetsInFolder(folderId);
            return response.data;
        }
    } catch (err: any) {
        error.value = err.message;
        throw err;
    } finally {
        loading.value = false;
    }
}
// lay danh sach bo the tu vung theo id folder
const getVocabSetsInFolder = async (folderId: number) => {
    try {
        loading.value = true;
        const response = await flashcardApiUtil.apiFlashcardFlashcardSetsFolderFolderIdGet(folderId);
        if (response.status === 200) {
            vocabSets.value = response.data as any;
            return response.data;
        }
    } catch (err: any) {
        error.value = err.message;
        throw err;
    } finally {
        loading.value = false;
    }
}
const deleteVocabSet = async (setId: number) => {
    try {
        loading.value = true;
        const response = await flashcardApiUtil.apiFlashcardFlashcardSetDeleteIdDelete(setId);
        if (response.status === 200) {
            vocabSets.value = vocabSets.value.filter(s => s.id !== setId);
            return true;
        }
    } catch (err: any) {
        error.value = err.message;
        throw err;
    } finally {
        loading.value = false;
    }
};

const createFlashcard = async (termLanguage: string, definitionLanguage: string, imageUrl: string, audioUrl: string, setId: number) => {
    try {
        loading.value = true;
        const payload: FlashcardRequest = {
            termLanguage: termLanguage,
            definitionLanguage: definitionLanguage,
            flashcardSetId: setId,
            imageUrl: "",
            audioUrl: ""
        }
        const response = await flashcardApiUtil.apiFlashcardFlashcardPost(payload);
        if (response.status === 200) {
            await getFlashcardsInSet(setId);
            return response.data;
        }
    } catch (err: any) {
        error.value = err.message;
        throw err;
    } finally {
        loading.value = false;
    }
} 
const getFlashcardsInSet = async (setId: number) => {
    try {
        loading.value = true;
        const response = await flashcardApiUtil.apiFlashcardFlashcardSetIdGet(setId);
        if (response.status === 200) {
            vocabularies.value = response.data as any;
            return response.data;
        }
    } catch (err: any) {
        error.value = err.message;
        throw err;
    } finally {
        loading.value = false;
    }
}

const deleteFlashcard = async (flashcardId: number) => {
    try {
        loading.value = true;
        const response = await flashcardApiUtil.apiFlashcardFlashcardDeleteIdDelete(flashcardId);
        if (response.status === 200) {
            vocabularies.value = vocabularies.value.filter(v => v.id !== flashcardId);
            return true;
        }
    } catch (err: any) {
        error.value = err.message;
        throw err;
    } finally {
        loading.value = false;
    }
};

const toggleFavorite = async (flashcardId: number) => {
    try {
        loading.value = true;
        const response = await flashcardApiUtil.apiFlashcardFlashcardIdFavoritePut(flashcardId);
        if (response.status === 200) {
            const card = vocabularies.value.find(v => v.id === flashcardId);
            if (card) {
                card.isFavorite = !card.isFavorite;
            }
            return true;
        }
    } catch (err: any) {
        error.value = err.message;
        throw err;
    } finally {
        loading.value = false;
    }
}

return {
    // State
    folders,
    vocabSets,
    vocabularies,
    loading,
    error,

    // Getters
    getFolders,
    getVocabSets,
    getVocabularies,

    // Actions
    createFolder,
    getFoldersForUser,
    deleteFolder,
    createVocabSet,
    getVocabSetsInFolder,
    deleteVocabSet,
    createFlashcard,
    getFlashcardsInSet,
    deleteFlashcard,
    toggleFavorite
};

});
