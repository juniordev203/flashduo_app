<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
        <NuxtLink to="/">
          <div class="flex gap-2 items-center text-gray-400">
            <X class="w-6 h-6" />
          </div>
        </NuxtLink>
      </template>
      <template v-slot:default>
        <span class="text-base font-medium text-black">
          {{ $t('lang_core_chat_hoi_dap') }}
        </span>
      </template>
      <template v-slot:right>
        <el-dropdown trigger="click" :teleported="true">
          <el-button type="primary"
            class="!bg-gray-300 !pl-1 !pr-2 !py-1 !border-none !rounded-full !text-black transition-transform duration-150 active:scale-95 touch-manipulation">
            <el-icon class="el-icon--right">
              <More />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <button @click="">
                  {{ $t('lang_core_chat_lich_su') }}
                </button>
              </el-dropdown-item>
              <el-dropdown-item>
                <button @click="deleteChat" class="">
                  {{ $t('lang_core_chat_xoa_cuoc_tro_chuyen') }}
                </button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </AtomHeaderSafe>
    <!-- Chat Container -->
    <div id="chat-container" class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- Welcome message if no messages -->
      <div v-if="store.messages.length === 0" class="text-center text-gray-500 py-10">
        <div class="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-violet-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h2 class="text-lg font-medium">{{$t('lang_core_chat_chao_mung')}}</h2>
        <p class="mt-2 text-sm">
          {{$t('lang_core_chat_hay_bat_dau')}}
        </p>
      </div>

      <!-- Chat messages -->
      <div v-for="message in store.messages" :key="message.id" class="flex"
        :class="{ 'justify-end': message.role === 'user' }">
        <div class="max-w-3/4 rounded-lg shadow-sm p-3" :class="{
          'bg-violet-600 text-white': message.role === 'user',
          'bg-white': message.role === 'assistant',
        }">
          <div class="whitespace-pre-wrap" v-html="formatMessage(message.content)"></div>
          <div class="text-xs opacity-70 mt-1 text-right">
            {{ formatTime(message.timestamp) }}
          </div>
        </div>
      </div>

      <!-- Loading indicator -->
      <div v-if="store.isLoading" class="flex">
        <div class="max-w-3/4 bg-white rounded-lg shadow-sm p-4">
          <div class="font-medium mb-2">{{ $t('lang_core_chat_dang_nhap') }}</div>
          <div class="flex space-x-2">
            <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
            <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.2s"></div>
            <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.4s"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input -->
    <div class="border-t border-gray-300 bg-white p-4">
      <form @submit.prevent="store.sendMessage" class="flex space-x-2">
        <input v-model="store.inputMessage" type="text" placeholder="Nhập tin nhắn..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded-full !focus: outline-none" :disabled="store.isLoading" />
        <button type="submit"
          class="px-4 py-2 bg-black text-white rounded-full transition-transform duration-150 active:scale-95 touch-manipulation"
          :disabled="store.isLoading || !store.inputMessage.trim()">
          <span v-if="!store.isLoading">{{ $t('lang_core_chat_gui') }}</span>
          <svg v-else class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </button>
      </form>
      <div class="text-[8px] text-gray-500 mt-1 text-center">
        {{ $t('lang_core_chat_footer') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next";
import { ArrowDown, More } from "@element-plus/icons-vue";
import { useChatStore } from "~/stores/chat";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
definePageMeta({
  layout: "app-none",
});

const store = useChatStore();
const deleteChat = () => {
  store.clearChat();
}
// Format timestamp
function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Format message content to convert line breaks to <br> and handle code blocks
function formatMessage(content: string): string {
  // Handle code blocks with ```
  content = content.replace(/```([\s\S]*?)```/g, (match, code) => {
    return `<pre class="bg-gray-100 p-2 rounded my-2 overflow-x-auto text-sm"><code>${escapeHtml(
      code
    )}</code></pre>`;
  });

  // Handle inline code with `
  content = content.replace(
    /`([^`]+)`/g,
    '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>'
  );

  // Convert line breaks to <br>
  content = content.replace(/\n/g, "<br>");

  return content;
}

// Escape HTML to prevent XSS
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Auto scroll to bottom when component is mounted
onMounted(() => {
  // Add a welcome message from the assistant
  const welcomeMessage = t("lang_core_chat_xin_chao");
  if (store.messages.length === 0) {
    store.addMessage(
      "assistant",
      welcomeMessage
    );
  }
});
</script>
