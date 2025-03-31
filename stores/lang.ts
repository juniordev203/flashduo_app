import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export type SupportedLocale = 'vi' | 'en';

export const useLangStore = defineStore('lang', () => {
  const supportedLocales = ['vi', 'en'] as const;
  const currentLocale = ref<SupportedLocale>('vi');
  
  const getCurrentLocale = () => currentLocale.value;
  const getSupportedLocales = () => supportedLocales;
  
  const initializeLocale = () => {
    const { locale } = useI18n();
    // Lấy locale từ localStorage nếu có
    const savedLocale = localStorage.getItem('locale') as SupportedLocale;
    
    if (savedLocale && supportedLocales.includes(savedLocale)) {
      currentLocale.value = savedLocale;
      locale.value = savedLocale;
    } else {
      // Nếu không có lưu trữ trước đó, thiết lập mặc định là tiếng Việt
      currentLocale.value = 'vi';
      locale.value = 'vi';
      localStorage.setItem('locale', 'vi');
    }
  };
  
  const setLocale = (newLocale: SupportedLocale) => {
    const { locale } = useI18n();
    
    // Kiểm tra xem locale có được hỗ trợ không
    if (!supportedLocales.includes(newLocale)) {
      console.error(`Locale ${newLocale} is not supported.`);
      return;
    }
    // Cập nhật locale
    currentLocale.value = newLocale;
    locale.value = newLocale;
    // Lưu vào localStorage
    localStorage.setItem('locale', newLocale);
    // Cập nhật HTML lang attribute
    document.documentElement.setAttribute('lang', newLocale);
  };
  // Watch để sync với vue-i18n nếu bị thay đổi từ bên ngoài
  if (process.client) {
    const { locale } = useI18n();
    watch(locale, (newLocale) => {
      if (newLocale !== currentLocale.value && supportedLocales.includes(newLocale as SupportedLocale)) {
        currentLocale.value = newLocale as SupportedLocale;
        localStorage.setItem('locale', newLocale);
      }
    });
  }
  
  return {
    currentLocale,
    supportedLocales,
    getCurrentLocale,
    getSupportedLocales,
    initializeLocale,
    setLocale
  };
});