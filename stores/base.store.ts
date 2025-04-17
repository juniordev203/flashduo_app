import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
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
      localStorage.setItem("authUser", JSON.stringify(user)); //Lưu thông tin tài khoản vào Store
      this.loadUserInfo();
    },
    async loadUserInfo() {
      if (this.authUser?.id) {
        try {
          const userInfo = await fetchUserInfo(this.authUser.id);
          if (userInfo) {
            this.userInfo = userInfo;
            localStorage.setItem("userInfo", JSON.stringify(userInfo)); //Lưu thông tin người dùng vào Store
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
    setLocale(newLocale: "vi" | "en") {
      const { locale } = useI18n(); // Lấy i18n locale từ vue-i18n
      if (this.locales.includes(newLocale)) {
        this.locale = newLocale;         // Cập nhật trong store
        locale.value = newLocale;        // Đồng bộ với i18n
        localStorage.setItem("locale", newLocale); // Lưu vào localStorage
      }
    },

    // Tải ngôn ngữ từ localStorage khi khởi động
    loadLocale() {
      const { locale } = useI18n();
      const savedLocale = localStorage.getItem("locale");
      if (savedLocale && this.locales.includes(savedLocale as "vi" | "en")) {
        this.locale = savedLocale as "vi" | "en"; // Cập nhật store
        locale.value = savedLocale;              // Đồng bộ với i18n
      } else {
        // Nếu không có trong localStorage, dùng giá trị mặc định và lưu lại
        this.locale = "vi";
        locale.value = "vi";
        localStorage.setItem("locale", "vi");
      }
    },
  },
});