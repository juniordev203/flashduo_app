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
 * @interface UserResponse
 */
export interface UserResponse {

    /**
     * @type {number}
     * @memberof UserResponse
     */
    id?: number;

    /**
     * @type {string}
     * @memberof UserResponse
     */
    fullName: string;

    /**
     * @type {string}
     * @memberof UserResponse
     */
    avatarUrl: string;

    /**
     * @type {Date}
     * @memberof UserResponse
     */
    createdAt?: Date;
}
