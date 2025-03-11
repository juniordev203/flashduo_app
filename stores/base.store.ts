import { defineStore } from "pinia";
import type {
  AuthLoginRequest,
  AuthLoginResponse,
  UserResponse,
} from "~/auto_api";

export const useMyBaseStore = defineStore({
  id: "myBaseStore",
  state: () => ({
    // status app
    appReady: false,
    loadingApp: false,
    // drawer state app
    drawerChangeLocale: false,
    // locale state app
    locales: ["vi", "en"],
    locale: "vi",
    authUser: undefined as AuthLoginResponse | undefined,
    userInfo: undefined as UserResponse | undefined,
  }),
  actions: {
    setAuthUser(user: AuthLoginResponse) {
      this.authUser = user;
      localStorage.setItem("authUser", JSON.stringify(user));
    },
    async loadUserInfo() {
      if (this.authUser?.id) {
        const userInfo = await fetchUserInfo(this.authUser.id);
        if (userInfo) {
          this.userInfo = userInfo;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
      }
    },
    loadAuthUser() {
      const user = localStorage.getItem("authUser");
      if (user) {
        this.authUser = JSON.parse(user);
      }
    },
    clearAuthUser() {
      this.authUser = undefined;
      this.userInfo = undefined;
      localStorage.removeItem("authUser");
      localStorage.removeItem("userInfo");
    },
  },
});
