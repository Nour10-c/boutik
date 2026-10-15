<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: "" },
});
</script>

<template>
  <div
    class="flex flex-col items-center gap-3 rounded-lg border border-dashed border-neutral-300 bg-white p-10 text-center"
  >
    <p class="text-lg font-semibold">{{ title }}</p>
    <p v-if="description" class="text-sm text-neutral-500">{{ description }}</p>
    <slot />
  </div>
</template>