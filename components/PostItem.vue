<!-- filepath: /components/PostItem.vue -->
<script setup lang="ts">

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
}

defineProps<{
  post: Post;
}>();
</script>

<template>
  <div class="w-full hover:bg-gray-50 transition-colors cursor-pointer">
    <div class="flex items-start gap-4">
      <img 
        :src="post.author.avatar || '/default-avatar.png'" 
        :alt="post.author.name"
        class="w-10 h-10 rounded-full object-cover"
      />
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-lg">{{ post.title }}</h3>
          <span class="text-sm text-gray-500">{{ new Date(post.createdAt).toLocaleDateString('vi-VN') }}</span>
        </div>
        <p class="text-gray-600 mt-2 line-clamp-3">{{ post.content }}</p>
        <div class="flex items-center gap-4 mt-4 text-sm text-gray-500">
          <div class="flex items-center gap-1">
            <Icon name="ion:heart-outline" class="w-5 h-5" />
            <span>{{ post.likes }}</span>
          </div>
          <div class="flex items-center gap-1">
            <Icon name="ion:chatbubble-outline" class="w-5 h-5" />
            <span>{{ post.comments }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>