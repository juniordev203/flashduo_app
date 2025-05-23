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

import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { ExamResponse } from '../models';
import { ProblemDetails } from '../models';
import { UserAnswerRequest } from '../models';
import { UserExamBaseRequest } from '../models';
import { UserExamFavoriteResponse } from '../models';
import { UserExamResultResponse } from '../models';
import { UserExamScoreResponse } from '../models';
/**
 * ExamApi - axios parameter creator
 * @export
 */
export const ExamApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} examId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiExamExamDetailExamIdGet: async (examId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'examId' is not null or undefined
            if (examId === null || examId === undefined) {
                throw new RequiredError('examId','Required parameter examId was null or undefined when calling apiExamExamDetailExamIdGet.');
            }
            const localVarPath = `/api/Exam/exam-detail/{examId}`
                .replace(`{${"examId"}}`, encodeURIComponent(String(examId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiExamExamGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Exam/exam`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} examId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiExamExamStartExamIdGet: async (examId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'examId' is not null or undefined
            if (examId === null || examId === undefined) {
                throw new RequiredError('examId','Required parameter examId was null or undefined when calling apiExamExamStartExamIdGet.');
            }
            const localVarPath = `/api/Exam/exam-start/{examId}`
                .replace(`{${"examId"}}`, encodeURIComponent(String(examId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} userExamId 
         * @param {UserAnswerRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiExamUserAnswerUserExamIdPost: async (userExamId: number, body?: UserAnswerRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userExamId' is not null or undefined
            if (userExamId === null || userExamId === undefined) {
                throw new RequiredError('userExamId','Required parameter userExamId was null or undefined when calling apiExamUserAnswerUserExamIdPost.');
            }
            const localVarPath = `/api/Exam/user-answer/{userExamId}`
                .replace(`{${"userExamId"}}`, encodeURIComponent(String(userExamId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} [userId] 
         * @param {number} [examId] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiExamUserExamFavoritePost: async (userId?: number, examId?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Exam/user-exam/favorite`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            if (userId !== undefined) {
                localVarQueryParameter['userId'] = userId;
            }

            if (examId !== undefined) {
                localVarQueryParameter['examId'] = examId;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {UserExamBaseRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiExamUserExamStartPost: async (body?: UserExamBaseRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Exam/user-exam/start`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} userExamId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiExamUserExamUserExamIdScoreGet: async (userExamId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userExamId' is not null or undefined
            if (userExamId === null || userExamId === undefined) {
                throw new RequiredError('userExamId','Required parameter userExamId was null or undefined when calling apiExamUserExamUserExamIdScoreGet.');
            }
            const localVarPath = `/api/Exam/user-exam/{userExamId}/score`
                .replace(`{${"userExamId"}}`, encodeURIComponent(String(userExamId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiExamUserExamUserIdFavoriteGet: async (userId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            if (userId === null || userId === undefined) {
                throw new RequiredError('userId','Required parameter userId was null or undefined when calling apiExamUserExamUserIdFavoriteGet.');
            }
            const localVarPath = `/api/Exam/user-exam/{userId}/favorite`
                .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiExamUserExamUserIdResultExamsGet: async (userId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            if (userId === null || userId === undefined) {
                throw new RequiredError('userId','Required parameter userId was null or undefined when calling apiExamUserExamUserIdResultExamsGet.');
            }
            const localVarPath = `/api/Exam/user-exam/{userId}/result-exams`
                .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ExamApi - functional programming interface
 * @export
 */
export const ExamApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} examId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamExamDetailExamIdGet(examId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ExamResponse>>> {
            const localVarAxiosArgs = await ExamApiAxiosParamCreator(configuration).apiExamExamDetailExamIdGet(examId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamExamGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<ExamResponse>>>> {
            const localVarAxiosArgs = await ExamApiAxiosParamCreator(configuration).apiExamExamGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} examId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamExamStartExamIdGet(examId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ExamResponse>>> {
            const localVarAxiosArgs = await ExamApiAxiosParamCreator(configuration).apiExamExamStartExamIdGet(examId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} userExamId 
         * @param {UserAnswerRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamUserAnswerUserExamIdPost(userExamId: number, body?: UserAnswerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await ExamApiAxiosParamCreator(configuration).apiExamUserAnswerUserExamIdPost(userExamId, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} [userId] 
         * @param {number} [examId] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamUserExamFavoritePost(userId?: number, examId?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await ExamApiAxiosParamCreator(configuration).apiExamUserExamFavoritePost(userId, examId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {UserExamBaseRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamUserExamStartPost(body?: UserExamBaseRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await ExamApiAxiosParamCreator(configuration).apiExamUserExamStartPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} userExamId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamUserExamUserExamIdScoreGet(userExamId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<UserExamScoreResponse>>> {
            const localVarAxiosArgs = await ExamApiAxiosParamCreator(configuration).apiExamUserExamUserExamIdScoreGet(userExamId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamUserExamUserIdFavoriteGet(userId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<UserExamFavoriteResponse>>> {
            const localVarAxiosArgs = await ExamApiAxiosParamCreator(configuration).apiExamUserExamUserIdFavoriteGet(userId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamUserExamUserIdResultExamsGet(userId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<UserExamResultResponse>>> {
            const localVarAxiosArgs = await ExamApiAxiosParamCreator(configuration).apiExamUserExamUserIdResultExamsGet(userId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ExamApi - factory interface
 * @export
 */
export const ExamApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {number} examId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamExamDetailExamIdGet(examId: number, options?: AxiosRequestConfig): Promise<AxiosResponse<ExamResponse>> {
            return ExamApiFp(configuration).apiExamExamDetailExamIdGet(examId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamExamGet(options?: AxiosRequestConfig): Promise<AxiosResponse<Array<ExamResponse>>> {
            return ExamApiFp(configuration).apiExamExamGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} examId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamExamStartExamIdGet(examId: number, options?: AxiosRequestConfig): Promise<AxiosResponse<ExamResponse>> {
            return ExamApiFp(configuration).apiExamExamStartExamIdGet(examId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} userExamId 
         * @param {UserAnswerRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamUserAnswerUserExamIdPost(userExamId: number, body?: UserAnswerRequest, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return ExamApiFp(configuration).apiExamUserAnswerUserExamIdPost(userExamId, body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} [userId] 
         * @param {number} [examId] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamUserExamFavoritePost(userId?: number, examId?: number, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return ExamApiFp(configuration).apiExamUserExamFavoritePost(userId, examId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {UserExamBaseRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamUserExamStartPost(body?: UserExamBaseRequest, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return ExamApiFp(configuration).apiExamUserExamStartPost(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} userExamId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamUserExamUserExamIdScoreGet(userExamId: number, options?: AxiosRequestConfig): Promise<AxiosResponse<UserExamScoreResponse>> {
            return ExamApiFp(configuration).apiExamUserExamUserExamIdScoreGet(userExamId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamUserExamUserIdFavoriteGet(userId: number, options?: AxiosRequestConfig): Promise<AxiosResponse<UserExamFavoriteResponse>> {
            return ExamApiFp(configuration).apiExamUserExamUserIdFavoriteGet(userId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiExamUserExamUserIdResultExamsGet(userId: number, options?: AxiosRequestConfig): Promise<AxiosResponse<UserExamResultResponse>> {
            return ExamApiFp(configuration).apiExamUserExamUserIdResultExamsGet(userId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ExamApi - object-oriented interface
 * @export
 * @class ExamApi
 * @extends {BaseAPI}
 */
export class ExamApi extends BaseAPI {
    /**
     * 
     * @param {number} examId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ExamApi
     */
    public async apiExamExamDetailExamIdGet(examId: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<ExamResponse>> {
        return ExamApiFp(this.configuration).apiExamExamDetailExamIdGet(examId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ExamApi
     */
    public async apiExamExamGet(options?: AxiosRequestConfig) : Promise<AxiosResponse<Array<ExamResponse>>> {
        return ExamApiFp(this.configuration).apiExamExamGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} examId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ExamApi
     */
    public async apiExamExamStartExamIdGet(examId: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<ExamResponse>> {
        return ExamApiFp(this.configuration).apiExamExamStartExamIdGet(examId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} userExamId 
     * @param {UserAnswerRequest} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ExamApi
     */
    public async apiExamUserAnswerUserExamIdPost(userExamId: number, body?: UserAnswerRequest, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return ExamApiFp(this.configuration).apiExamUserAnswerUserExamIdPost(userExamId, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} [userId] 
     * @param {number} [examId] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ExamApi
     */
    public async apiExamUserExamFavoritePost(userId?: number, examId?: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return ExamApiFp(this.configuration).apiExamUserExamFavoritePost(userId, examId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {UserExamBaseRequest} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ExamApi
     */
    public async apiExamUserExamStartPost(body?: UserExamBaseRequest, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return ExamApiFp(this.configuration).apiExamUserExamStartPost(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} userExamId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ExamApi
     */
    public async apiExamUserExamUserExamIdScoreGet(userExamId: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<UserExamScoreResponse>> {
        return ExamApiFp(this.configuration).apiExamUserExamUserExamIdScoreGet(userExamId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ExamApi
     */
    public async apiExamUserExamUserIdFavoriteGet(userId: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<UserExamFavoriteResponse>> {
        return ExamApiFp(this.configuration).apiExamUserExamUserIdFavoriteGet(userId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ExamApi
     */
    public async apiExamUserExamUserIdResultExamsGet(userId: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<UserExamResultResponse>> {
        return ExamApiFp(this.configuration).apiExamUserExamUserIdResultExamsGet(userId, options).then((request) => request(this.axios, this.basePath));
    }
}
