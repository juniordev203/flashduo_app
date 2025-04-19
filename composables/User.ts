import type { UserUpdateRequest, UserResponse } from "~/auto_api";
import { userApiUtil } from "~/utils/api.utils";

//lay thong tin user
export const fetchUserInfo = async (accountId: number): Promise<UserResponse | undefined> => {
    try {
        const response = await userApiUtil.apiUserInfoUserGet(accountId);
        return response.data;
    } catch (error) {
        console.error("getUser", error);
        return undefined;
    }
}
export const updateUserInfo = async (userId: number, request: UserUpdateRequest): Promise<void> => {
    try {
        await userApiUtil.apiUserUserUpdateUserIdPut(userId, request);
    } catch (error) {
        console.error("Error updating user info:", error);
        throw error;
    }
}
