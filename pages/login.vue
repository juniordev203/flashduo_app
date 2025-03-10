<template>
    <div class="h-full w-full flex flex-col bg-slate-100 justify-center">
        <div class="w-full max-w-md p-4 flex flex-col gap-6">
            <div class="flex flex-col gap-2">
                <h1 class="text-2xl font-bold text-center">Đăng nhập</h1>
                <p class="text-sm text-center text-gray-600">
                    Đăng nhập để tiếp tục sử dụng
                    <a href="#" class="text-indigo-500">Dữ liệu & Quá trình học</a>
                </p>
            </div>
            <!-- login form -->
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input id="email" v-model="email" type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Email" />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                    <input id="password" v-model="password" type="password"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="********" />
                </div>
                <button type="submit" @click="handleLogin"
                    class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Đăng nhập
                </button>
            </form>
            <NuxtLink to="/register" class="text-center">
                <div class="text-sm text-center">
                    Bạn chưa có tài khoản? <a href="#" class="text-indigo-500">Đăng ký</a>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
    try {
        isLoading.value = true;
        await loginUser({
            email: email.value,
            password: password.value
        });
        router.push("/");
    } catch (error) {
        errorMessage.value = error.message || "Đăng nhập thất bại!";
    } finally {
        isLoading.value = false;
    }
};

</script>
