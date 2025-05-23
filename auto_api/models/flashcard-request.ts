/* tslint:disable */
/* eslint-disable */
/**
 * Flashduo Api
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

 /**
 * 
 *
 * @export
 * @interface FlashcardRequest
 */
export interface FlashcardRequest {

    /**
     * @type {string}
     * @memberof FlashcardRequest
     */
    termLanguage: string;

    /**
     * @type {string}
     * @memberof FlashcardRequest
     */
    definitionLanguage: string;

    /**
     * @type {string}
     * @memberof FlashcardRequest
     */
    imageUrl?: string | null;

    /**
     * @type {string}
     * @memberof FlashcardRequest
     */
    audioUrl?: string | null;

    /**
     * @type {number}
     * @memberof FlashcardRequest
     */
    flashcardSetId: number;

    /**
     * @type {number}
     * @memberof FlashcardRequest
     */
    userId: number;
}
