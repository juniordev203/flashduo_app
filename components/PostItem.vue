<!-- filepath: /components/PostItem.vue -->
<script setup lang="ts">
/// <reference types="../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import type { Post } from '../types/post.types';

defineProps<{
  post: Post
}>()
</script>

<template>
  <NuxtLink :to="`/post/${post.id}`" class="p-4 border-b border-gray-200">
    <div class="flex">
      <img :src="post.avatar" class="w-10 h-10 rounded-full" />
      <div class="flex-1 ml-3">
        <div class="flex items-center justify-between">
          <span class="font-semibold">{{ post.author }}</span>
          <div class="flex items-center">
            <span class="text-gray-500">{{ post.time }}</span>
            <Icon name="ion:ellipsis-horizontal" class="ml-2 w-4 h-4" />
          </div>
        </div>

        <h2 class="font-semibold mt-2">{{ post.title }}</h2>
        <p class="text-gray-600 mt-1">{{ post.content }}</p>

        <div class="flex gap-3 items-center mt-3">
          <div class="flex items-center">
            <Icon name="ion:heart-outline" class="w-5 h-5" />
            <span class="ml-1 text-gray-600">{{ post.likes }}</span>
          </div>
          <div class="flex items-center">
            <Icon name="ion:chatbubble-outline" class="w-5 h-5" />
            <span class="ml-1 text-gray-600">{{ post.comments }}</span>
          </div>
          <Icon name="ion:share-social-outline" class="w-5 h-5" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>