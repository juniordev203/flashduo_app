<template>
    <div class="h-full w-full flex flex-col bg-slate-100 justify-center">
        <div class="w-full max-w-md p-4 flex flex-col gap-6">
            <div class="flex flex-col gap-2">
                <h1 class="text-2xl font-bold text-center">{{ $t('lang_core_register_title') }}</h1>
                <p class="text-sm text-center text-gray-600">
                    {{ $t('lang_core_register_subtitle') }}
                    <a href="#" class="text-blue-500">{{ $t('lang_core_register_data_process') }}</a>
                </p>
            </div>
            <!-- register form -->
            <form @submit.prevent="handleRegister" class="px-6 py-4 w-full max-w-md mx-auto">
                <div class="mb-4">
                    <label for="userName" class="block text-sm font-medium text-gray-700">
                        {{ $t('lang_core_register_username_label') }}
                    </label>
                    <input 
                        id="userName" 
                        v-model="form.userName" 
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring-indigo-500"
                        :placeholder="$t('lang_core_register_username_placeholder')" 
                    />
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">
                        {{ $t('lang_core_register_email_label') }}
                    </label>
                    <input 
                        id="email" 
                        v-model="form.email" 
                        type="email"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring-indigo-500"
                        :placeholder="$t('lang_core_register_email_placeholder')" 
                    />
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">
                        {{ $t('lang_core_register_password_label') }}
                    </label>
                    <input 
                        id="password" 
                        v-model="form.password" 
                        type="password"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring-indigo-500"
                        :placeholder="$t('lang_core_register_password_label')" 
                    />
                </div>
                <div class="mb-4">
                    <label for="firmPassword" class="block text-sm font-medium text-gray-700">
                        {{ $t('lang_core_register_confirm_password_label') }}
                    </label>
                    <input 
                        id="firmPassword" 
                        v-model="form.firmPassword" 
                        type="password"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring-indigo-500"
                        :placeholder="$t('lang_core_register_confirm_password_label')" 
                    />
                </div>
                <button 
                    type="submit"
                    class="w-full flex justify-center py-3 px-4 mb-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {{ $t('lang_core_register_button') }}
                </button>
                <p v-if="errorMessage" class="error text-center text-xs text-red-600">{{ errorMessage }}</p>
            </form>
            <div class="flex gap-2 justify-center text-sm text-center">
                <p class="">{{ $t('lang_core_register_have_account') }}</p>
                <NuxtLink to="/login" class="text-center">
                    <p class="text-indigo-500">{{ $t('lang_core_register_login_link') }}</p>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
definePageMeta({
    'layout': 'app-none',
});

const router = useRouter();
const form = ref({
    userName: "",
    email: "",
    password: "",
    firmPassword: ""
});
const errorMessage = ref("");
const { t } = useI18n();
const handleRegister = async () => {
    errorMessage.value = "";
    try {
        if (form.value.password !== form.value.firmPassword) {
            errorMessage.value = t('lang_core_register_error_password_mismatch');
            return;
        }
        // Call register API
        await registerUser({
            username: form.value.userName,
            email: form.value.email,
            password: form.value.password,
            firmPassword: form.value.firmPassword
        });
        router.push("/login");
    } catch (error: any) {
        errorMessage.value = error.response?.data?.message || t('lang_core_register_error_default');
    }
};
</script>