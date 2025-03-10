import { defineStore } from 'pinia'
import type { AuthLoginRequest, AuthLoginResponse } from '~/auto_api'

export const useMyBaseStore = defineStore({
  id: 'myBaseStore',
  state: () => ({
    // status app
    appReady: false,
    loadingApp: false,
    // drawer state app
    drawerChangeLocale: false,
    // locale state app
    locales: ['vi', 'en'],
    locale: 'vi',
    authUser: undefined as AuthLoginResponse | undefined,
  }),
  actions: {
    setAuthUser(user: AuthLoginResponse) {
      this.authUser = user;
      localStorage.setItem("authUser", JSON.stringify(user));
    },
    loadAuthUser() {
      const user = localStorage.getItem("authUser");
      if (user) {
        this.authUser = JSON.parse(user);
      }
    },
    clearAuthUser() {
      this.authUser = undefined;
      localStorage.removeItem("authUser");
    }
  }

})

