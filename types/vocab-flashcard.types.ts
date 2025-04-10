import type { Flashcard } from "~/auto_api/models";

export interface IVocabFlashcard {
    id?: number;
    termLanguage?: string | null;
    definitionLanguage?: string | null;
    imageUrl?: string | null;
    audioUrl?: string | null;
    isFavourite?: boolean;
    userId?: number;
    [key: string]: any;
}