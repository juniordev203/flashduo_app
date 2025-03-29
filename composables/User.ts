import type { UserResponse } from "~/auto_api";
import { userApiUtil } from "~/utils/api.utils";

//lay thong tin user
export const fetchUserInfo = async (accountId: Number): Promise<UserResponse | undefined> => {
    try {
        const response = await userApiUtil.apiUserInfoUserGet(Number(accountId));
        return response.data;
    } catch (error) {
        console.error("getUser", error);
        return undefined;
    }
}
