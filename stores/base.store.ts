import { defineStore } from "pinia";
import type { AuthLoginRequest, AuthLoginResponse, UserResponse } from "~/auto_api";
import { fetchUserInfo } from "~/composables/User"
export const useMyBaseStore = defineStore({
  id: "myBaseStore",
  state: () => ({
    appReady: false,
    loadingApp: false,
    drawerChangeLocale: false,
    locales: ["vi", "en"] as const,
    locale: "vi" as "vi" | "en",
    authUser: undefined as AuthLoginResponse | undefined,
    userInfo: undefined as UserResponse | undefined,
  }),
  actions: {
    setAuthUser(user: AuthLoginResponse) {
      this.authUser = user;
      localStorage.setItem("authUser", JSON.stringify(user));
      this.loadUserInfo();
    },
    async loadUserInfo() {
      if (this.authUser?.id) {
        try {
          const userInfo = await fetchUserInfo(this.authUser.id);
          if (userInfo) {
            this.userInfo = userInfo;
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
          }
        } catch (error) {
          console.error("Lỗi khi tải thông tin người dùng!", error);
        }
      }
    },
    loadAuthUser() {
      const user = localStorage.getItem("authUser");
      if (user) {
        try {
          this.authUser = JSON.parse(user);
          this.loadUserInfo();
        } catch (error) {
          console.error("Invalid authUser data in localStorage:", error);
          this.clearAuthUser();
        }
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