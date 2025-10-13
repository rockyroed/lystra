<script setup lang="ts">
// This page handles OAuth redirects from social providers
// Clerk will automatically process the callback and redirect appropriately

onMounted(() => {
  // If for some reason we end up here without being redirected,
  // redirect back to home after a short delay
  setTimeout(() => {
    navigateTo('/');
  }, 3000);
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="flex flex-col items-center gap-4">
      <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-primary-500" />
      <p class="text-gray-600 dark:text-gray-400">Completing sign in...</p>
    </div>
  </div>
</template>
