import { defineStore } from 'pinia'

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
  }),
  actions: {}
})
