<!-- filepath: /pages/forum.vue -->
<script setup lang="ts">
import { usePosts } from '~/composables/usePosts';
const { posts } = usePosts()
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="flex items-center justify-between p-4 border-b border-gray-200">
      <h1 class="text-2xl font-bold">Flashduo Media</h1>
      <NuxtLink to="/post/new">
        <Icon name="ion:add" class="w-6 h-6" />
      </NuxtLink>
    </div>

    <div class="divide-y divide-gray-200">
      <PostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>