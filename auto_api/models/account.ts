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

import { ForumComment } from './forum-comment';
import { ForumEmotion } from './forum-emotion';
import { ForumPost } from './forum-post';
import { User } from './user';
 /**
 * 
 *
 * @export
 * @interface Account
 */
export interface Account {

    /**
     * @type {number}
     * @memberof Account
     */
    id?: number;

    /**
     * @type {string}
     * @memberof Account
     */
    email: string;

    /**
     * @type {string}
     * @memberof Account
     */
    passwordHash: string;

    /**
     * @type {string}
     * @memberof Account
     */
    role: string;

    /**
     * @type {Date}
     * @memberof Account
     */
    createdAt?: Date;

    /**
     * @type {User}
     * @memberof Account
     */
    user?: User;

    /**
     * @type {Array<ForumPost>}
     * @memberof Account
     */
    posts?: Array<ForumPost> | null;

    /**
     * @type {Array<ForumEmotion>}
     * @memberof Account
     */
    emotions?: Array<ForumEmotion> | null;

    /**
     * @type {Array<ForumComment>}
     * @memberof Account
     */
    comments?: Array<ForumComment> | null;

    /**
     * @type {string}
     * @memberof Account
     */
    refreshToken?: string | null;

    /**
     * @type {Date}
     * @memberof Account
     */
    refreshTokenExpiryTime?: Date;
}
