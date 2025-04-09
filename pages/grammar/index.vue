<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
        <NuxtLink :to="`/`">
          <button>
            <ChevronLeft class="w-6 h-6 text-black" />
          </button>
        </NuxtLink>
      </template>
      <template v-slot:default>
        <span class="text-base font-medium text-black">Học ngữ pháp</span>
      </template>
      <template v-slot:right>
        <MoreVertical
          class="text-black cursor-pointer"
          :size="20"
          @click=""
        />
      </template>
    </AtomHeaderSafe>
    <div class="h-full w-full overflow-auto p-4 flex flex-col gap-6">
      <!-- Search Bar -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm kiếm chủ đề ngữ pháp..."
          class="w-full p-3 pl-10 rounded-lg border border-gray-200 focus:outline-none"
        />
        <Search class="absolute left-3 top-3 text-gray-400" />
      </div>

      <!-- Grammar Levels -->
      <div class="space-y-6">
        <!-- Basic Level -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold flex items-center gap-2">
            <GraduationCap class="text-blue-500" />
            Ngữ pháp cơ bản
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NuxtLink
              v-for="topic in basicTopics"
              :key="topic.id"
              to="/" 
              class="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-medium">{{ topic.title }}</h3>
                  <p class="text-sm text-gray-500 mt-1">
                    {{ topic.description }}
                  </p>
                  <div class="flex items-center gap-2 mt-2">
                    <span
                      class="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded"
                    >
                      {{ topic.lessonCount }} bài học
                    </span>
                    <span
                      class="text-xs px-2 py-1 bg-green-50 text-green-600 rounded"
                    >
                      {{ topic.exerciseCount }} bài tập
                    </span>
                  </div>
                </div>
                <ChevronRight class="text-gray-400" />
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Intermediate Level -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold flex items-center gap-2">
            <BookOpen class="text-green-500" />
            Ngữ pháp trung cấp
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NuxtLink
              v-for="topic in intermediateTopics"
              :key="topic.id"
              :to="`/`"
              class="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-medium">{{ topic.title }}</h3>
                  <p class="text-sm text-gray-500 mt-1">
                    {{ topic.description }}
                  </p>
                  <div class="flex items-center gap-2 mt-2">
                    <span
                      class="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded"
                    >
                      {{ topic.lessonCount }} bài học
                    </span>
                    <span
                      class="text-xs px-2 py-1 bg-green-50 text-green-600 rounded"
                    >
                      {{ topic.exerciseCount }} bài tập
                    </span>
                  </div>
                </div>
                <ChevronRight class="text-gray-400" />
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Search, ChevronRight, GraduationCap, BookOpen, ChevronLeft, MoreVertical } from "lucide-vue-next";

const searchQuery = ref("");

const basicTopics = [
  {
    id: 1,
    title: "Thì hiện tại đơn",
    description: "Cách sử dụng và quy tắc của thì hiện tại đơn",
    lessonCount: 5,
    exerciseCount: 10,
  },
  {
    id: 2,
    title: "Thì hiện tại tiếp diễn",
    description: "Học về hành động đang diễn ra",
    lessonCount: 4,
    exerciseCount: 8,
  },
];

const intermediateTopics = [
  {
    id: 3,
    title: "Câu điều kiện",
    description: "Các loại câu điều kiện và cách sử dụng",
    lessonCount: 6,
    exerciseCount: 12,
  },
  {
    id: 4,
    title: "Mệnh đề quan hệ",
    description: "Cách sử dụng who, which, that, whom",
    lessonCount: 5,
    exerciseCount: 10,
  },
];

const filteredBasicTopics = computed(() =>
  basicTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const filteredIntermediateTopics = computed(() =>
  intermediateTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
</script>

<style scoped>
.grid {
  display: grid;
}
</style>
