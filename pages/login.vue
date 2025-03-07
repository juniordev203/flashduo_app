<template>
    <div class="h-full w-full flex flex-col bg-slate-100 justify-center">
        <!-- Login illustration and content -->
        <div class="w-full max-w-md p-4 flex flex-col gap-6">
            <!-- Sign in text -->
            <div class="flex flex-col gap-2">
                <h1 class="text-2xl font-bold text-center">Đăng nhập</h1>
                <p class="text-sm text-center text-gray-600">
                    Đăng nhập để tiếp tục sử dụng
                    <a href="#" class="text-blue-500">Dữ liệu & Quá trình học</a>
                </p>
            </div>

            <!-- Login form -->
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Username -->
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
                    <input id="username" v-model="form.username" type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Tên đăng nhập" />
                </div>

                <!-- Password -->
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                    <input id="password" v-model="form.password" type="password"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="********" />
                </div>

                <!-- Login Button -->
                <button type="submit"
                    class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Đăng nhập
                </button>
            </form>

            <!-- Error message -->
            <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>

            <!-- Success message -->
            <p v-if="success" class="text-green-500 text-sm text-center">{{ success }}</p>

            <!-- Register link -->
            <NuxtLink to="/register" class="text-center">
                <div class="text-sm text-center">
                    Bạn chưa có tài khoản? <a href="#" class="text-indigo-500">Đăng ký</a>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const error = ref('')
const success = ref('')

const form = reactive({
    username: '',
    password: ''
})

const handleSubmit = async () => {

}
</script>
