import { Configuration, AuthApi, ForumApi, UserApi } from "~/auto_api";
const config = new Configuration ({
    basePath: "http://localhost:5286",
    apiKey: () => {
        const { authUser } = useMyBaseStore();
        if (!authUser) return "";
        return authUser.token ? "Bearer" + authUser.token : "";
    }
});
export const authApiUtil = new AuthApi(config);
export const forumApiUtil = new ForumApi(config);
export const userApiUtil = new UserApi(config);
