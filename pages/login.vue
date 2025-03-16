<template>
    <div class="h-full w-full flex flex-col bg-slate-50 justify-center">
        <div class="w-full max-w-md p-4 flex flex-col gap-6">
            <div class="flex flex-col gap-2 px-6">
                <h1 class="text-2xl font-bold text-center">Đăng nhập</h1>
                <p class="text-sm text-center text-gray-600">
                    Đăng nhập để tiếp tục sử dụng
                    <a href="#" class="text-indigo-500">Dữ liệu & Quá trình học</a>
                </p>
            </div>
            <!-- login form -->
            <form @submit.prevent="handleLogin" class="px-6 py-4 w-full max-w-md mx-auto">
                <div class="mb-6">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input id="email" v-model="email" type="email" inputmode="email" autocomplete="email" required
                        class="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm p-4 focus:border-indigo-500 focus:ring-indigo-500 text-base"
                        placeholder="Email của bạn" />
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                    <input id="password" v-model="password" type="password" autocomplete="current-password" required
                        class="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm p-4 focus:border-indigo-500 focus:ring-indigo-500 text-base"
                        placeholder="••••••••" />
                </div>
                <button type="submit"
                    class="w-full flex justify-center py-4 mb-4 text-lg font-medium border border-transparent rounded-lg shadow-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
                    <span v-if="isLoading">Loading...</span>
                    <span v-else>Đăng nhập</span>
                </button>
                <p v-if="errorMessage" class="error text-center text-xs text-red-500">{{ errorMessage }}</p>
            </form>
            <div class="flex gap-2 justify-center text-sm text-center">
                <p class="">Bạn chưa có tài khoản?</p>
                <NuxtLink to="/register" class="text-center">
                    <p class="text-indigo-500">Đăng ký</p>
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

definePageMeta({
    layout: "app-none",
});

const baseStore = useMyBaseStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

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
            errorMessage.value = "Đăng nhập thất bại, vui lòng thử lại.";
        }
    } catch (error) {
        if ((error as any).response?.status === 401) {
            errorMessage.value = "Email hoặc mật khẩu không đúng.";
        } else {
            errorMessage.value = "Lỗi máy chủ, vui lòng thử lại sau.";
        }
    } finally {
        isLoading.value = false;
    }
};
</script>

