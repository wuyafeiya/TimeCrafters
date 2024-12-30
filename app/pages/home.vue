<script setup lang="ts">
definePageMeta({
  middleware: (to) => {
    if (to.path === '/home') {
      return '/home/dashboard'
    }
  },
})
</script>

<template>
  <div class="w-screen h-screen bg-[#E5E7EB]">
    <Header />
    <NuxtPage />
  </div>
</template>
