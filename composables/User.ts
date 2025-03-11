import { userApiUtil } from "~/utils/api.utils";

//lay thong tin user
export const fetchUserInfo = async (accountId: Number) => {
    try {
        const response = await userApiUtil.apiUserInfoUserGet(Number(accountId));
        return response.data;
    } catch (error) {
        console.error("getUser", error);
    }
}
