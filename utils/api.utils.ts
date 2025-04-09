import { Configuration, AuthApi, ForumApi, UserApi, ExamApi, FlashcardApi } from "~/auto_api";
const config = new Configuration ({
    basePath: import.meta.env.VITE_API_URL,
    apiKey: () => {
        const { authUser } = useMyBaseStore();
        if (!authUser) return "";
        return authUser.token ? "Bearer" + authUser.token : "";
    }
});
export const authApiUtil = new AuthApi(config);
export const forumApiUtil = new ForumApi(config);
export const userApiUtil = new UserApi(config);
export const examApiUtil = new ExamApi(config);
export const flashcardApiUtil = new FlashcardApi(config);
