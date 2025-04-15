<template>
    <div class="h-full w-full flex flex-col bg-slate-50 justify-center">
        <div class="w-full max-w-md p-4 flex flex-col gap-6">
            <div class="flex flex-col gap-2 px-6">
                <h1 class="text-2xl font-bold text-center">{{ $t('lang_core_login_title') }}</h1>
                <p class="text-sm text-center text-gray-600">
                    {{ $t('lang_core_login_subtitle') }}
                    <a href="#" class="text-indigo-500">{{ $t('lang_core_login_data_process') }}</a>
                </p>
            </div>
            <!-- login form -->
            <form @submit.prevent="handleLogin" class="px-6 py-4 w-full max-w-md mx-auto">
                <div class="mb-6">
                    <label for="email" class="block text-sm font-medium text-gray-700">{{ $t('lang_core_login_email_label') }}</label>
                    <input id="email" v-model="email" type="email" inputmode="email" autocomplete="email" required
                        class="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm p-4 focus:border-indigo-500 focus:ring-indigo-500 text-base"
                        :placeholder="$t('lang_core_login_email_placeholder')" />
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-gray-700">{{ $t('lang_core_login_password_label') }}</label>
                    <input id="password" v-model="password" type="password" autocomplete="current-password" required
                        class="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm p-4 focus:border-indigo-500 focus:ring-indigo-500 text-base"
                        placeholder="••••••••" />
                </div>
                <button type="submit"
                    class="w-full flex justify-center py-4 mb-4 text-lg font-medium border border-transparent rounded-lg shadow-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
                    <span v-if="isLoading">{{ $t('lang_core_login_loading') }}</span>
                    <span v-else>{{ $t('lang_core_login_button') }}</span>
                </button>
                <p v-if="errorMessage" class="error text-center text-xs text-red-500">{{ errorMessage }}</p>
            </form>
            <div class="space-y-4 px-6">
                <div class="flex gap-2 justify-center text-sm">
                    <p class="text-gray-600">{{ $t('lang_core_login_no_account') }}</p>
                    <NuxtLink to="/register" class="text-center">
                        <p class="text-indigo-500 font-medium">{{ $t('lang_core_login_register') }}</p>
                    </NuxtLink>
                </div>
                
                <div class="flex items-center justify-center">
                    <div class="h-px bg-gray-200 flex-grow"></div>
                    <span class="px-4 text-sm text-gray-500">hoặc</span>
                    <div class="h-px bg-gray-200 flex-grow"></div>
                </div>
                
                <NuxtLink to="/" class="block">
                    <button 
                        class="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all"
                    >
                        <EyeIcon class="w-5 h-5 text-gray-500" />
                        <span class="font-medium">Trải nghiệm với tư cách khách</span>
                    </button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useMyBaseStore } from "@/stores/base.store";
import { loginUser } from "@/composables/Auth"; 
import { useI18n } from "vue-i18n";
import { EyeIcon } from 'lucide-vue-next'


definePageMeta({
    layout: "app-none",
});

const baseStore = useMyBaseStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

const { t } = useI18n();

const handleLogin = async () => {
    try {
        isLoading.value = true;
        errorMessage.value = "";
        const response = await loginUser({
            email: email.value,
            password: password.value
        });
        if (response?.id) {
            baseStore.setAuthUser(response);
            await baseStore.loadUserInfo();
            router.push("/");
        } else {
            errorMessage.value = t('lang_core_login_error_default');
        }
    } catch (error) {
        if ((error as any).response?.status === 401) {
            errorMessage.value = t('lang_core_login_error_invalid');
        } else {
            errorMessage.value = t('lang_core_login_error_server');
        }
    } finally {
        isLoading.value = false;
    }
};
</script>