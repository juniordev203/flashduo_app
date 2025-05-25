// stores/chat.ts
import { defineStore } from "pinia";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
    finishReason: string;
  }>;
}

export const useChatStore = defineStore("chat", {
  state: () => ({
    messages: [] as Message[],
    isLoading: false,
    error: "",
    inputMessage: "",
  }),

  actions: {
    addMessage(role: "user" | "assistant", content: string) {
      const message: Message = {
        id: Date.now().toString(),
        content,
        role,
        timestamp: new Date(),
      };

      this.messages.push(message);

      // Scroll to bottom after adding a message
      setTimeout(() => {
        const chatContainer = document.getElementById("chat-container");
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
    },

    async sendMessage() {
      if (!this.inputMessage.trim()) return;

      const userMessage = this.inputMessage.trim();
      this.addMessage("user", userMessage);
      this.inputMessage = "";
      this.isLoading = true;
      this.error = "";

      try {
        const { data, error } = await useFetch(
          "https://flashduo-chatbot.nvteam.io.vn/chat",
          {
            method: "POST",
            body: {
              prompt: userMessage,
            },
          }
        );

        if (error.value) {
          throw new Error(
            error.value.statusMessage || "Đã xảy ra lỗi khi gọi API."
          );
        }

        const responseData = data.value as GeminiResponse;

        if (responseData.candidates && responseData.candidates.length > 0) {
          const aiResponse = responseData.candidates[0].content.parts
            .map((part) => part.text)
            .join("\n");

          this.addMessage("assistant", aiResponse);
        } else {
          throw new Error("Không nhận được phản hồi từ AI.");
        }
      } catch (err) {
        this.error =
          err instanceof Error ? err.message : "Đã xảy ra lỗi khi gọi API.";
        // Add error message to chat
        if (this.error) {
          this.addMessage("assistant", `Xin lỗi, tôi gặp lỗi: ${this.error}`);
        }
      } finally {
        this.isLoading = false;
      }
    },

    clearChat() {
      this.messages = [];
    },
  },
});
