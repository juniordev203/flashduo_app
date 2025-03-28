<template>
  <div class="h-full w-full flex flex-col bg-slate-50">
    <AtomHeaderSafe class="shadow-md">
      <template v-slot:left>
        <NuxtLink to="/exam">
          <div class="flex gap-2 items-center text-gray-400">
            <X class="w-6 h-6" />
          </div>
        </NuxtLink>
      </template>
      <template v-slot:default> </template>
      <template v-slot:right>
        <button
          @click="confirmReturn"
          class="px-4 py-2 text-center text-sm font-medium text-gray-50 bg-blue-500 rounded"
        >
          Làm lại
        </button>
      </template>
    </AtomHeaderSafe>
    <div class="h-full w-full overflow-hidden p-4 flex flex-col gap-6">
        ket qua
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
definePageMeta({
  layout: "app-none",
});
const confirmReturn = () => {
  if (confirm("Bạn có chắc chắn muốn làm lại bài thi?")) {
    router.push("/exam");
  }
};
</script>

<style scoped></style>
