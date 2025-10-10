<script setup lang="ts">
import type { ItemState } from '@/types/item';

const tags = ref(['Placeholder1', 'Placeholder2', 'Placeholder3', 'Placeholder4']);
const state = reactive<ItemState>({ tags: undefined });
</script>

<template>
  <UInputMenu v-model="state.tags" multiple :items="tags" placeholder="Filter Tags" />
</template>
