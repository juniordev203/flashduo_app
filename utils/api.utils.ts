import { Configuration, DefaultApi } from "~/auto_api";
const config = new Configuration ({
    basePath: "http://localhost:5286",
    apiKey: () => {
        const { authUser } = useMyBaseStore();
        if (!authUser) return "";
        return authUser.token ? "Bearer" + authUser.token : "";
    }
});
export const authApiUtil = new DefaultApi(config);
