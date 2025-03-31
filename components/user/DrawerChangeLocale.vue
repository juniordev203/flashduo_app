<template>
    <!-- locale -->
    <el-drawer v-model="drawerChangeLocale" :size="'30%'" :title="$t('lang_core_profile_language')" direction="btt">
        <el-radio-group class="flex flex-col gap-4" v-model="inputLocale">
          <el-radio class="w-full !mr-0" v-for="localeItem in locales" :key="localeItem" :value="localeItem" size="large">
            <div class="flex items-center gap-2">
              <img :src="'/flag/' + localeItem + '.png'" class="w-[30px] rounded" alt="flag">
              <span>{{ $t('lang_core_profile_' + localeItem) }}</span>
            </div>
          </el-radio>
        </el-radio-group>
      </el-drawer>
  </template>
  
  <script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  
  const { drawerChangeLocale } = storeToRefs(useMyBaseStore());
  const i18n = useI18n();
  
  const { locales } = useMyBaseStore();
  
  const inputLocale = ref(i18n.locale);

  </script>
  
  <style>
  
  </style>