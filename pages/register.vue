<template>
    <div class="h-full w-full flex flex-col bg-slate-100 justify-center">
        <div class="w-full max-w-md p-4 flex flex-col gap-6">
            <div class="flex flex-col gap-2">
                <h1 class="text-2xl font-bold text-center">Đăng ký</h1>
                <p class="text-sm text-center text-gray-600">
                    Bạn sẽ lưu lại được
                    <a href="#" class="text-blue-500">Dữ liệu & Quá trình học</a>
                </p>
            </div>
            <!-- register form -->
            <form @submit.prevent="handleRegister" class="space-y-4">
                <div>
                    <label for="userName" class="block text-sm font-medium text-gray-700">Tên tài khoản</label>
                    <input id="userName" v-model="form.userName" type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Flashduo" />
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input id="email" v-model="form.email" type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Email" />
                </div>
                <div class="">
                    <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                    <input id="password" v-model="form.password" type="password"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="********" />
                </div>
                <div class="">
                    <label for="firmPassword" class="block text-sm font-medium text-gray-700">Nhập lại mật khẩu</label>
                    <input id="firmPassword" v-model="form.firmPassword" type="password"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="********" />
                </div>
                <!-- Registration Button -->
                <button type="submit"
                    class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Đăng ký tài khoản
                </button>
            </form>

            <NuxtLink to="/login" class="text-center">
                <div class="text-sm text-center">
                    Bạn đã có tài khoản? <a href="#" class="text-indigo-500">Đăng nhập</a>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const form = ref({
    userName: "",
    email: "",
    password: "",
    firmPassword: ""
});
const errorMessage = ref("");

const handleRegister = async () => {
    try {
        if (form.value.password !== form.value.firmPassword) {
            errorMessage.value = "Mật khẩu không khớp!";
            return;
        }
        // Gọi API đăng ký
        await registerUser({
            username: form.value.userName,
            email: form.value.email,
            password: form.value.password,
            firmPassword: form.value.firmPassword
        });
        router.push("/login");
    } catch (error: any) {
        errorMessage.value = error.response?.data?.message || "Đăng ký thất bại!";
    }
};
</script>