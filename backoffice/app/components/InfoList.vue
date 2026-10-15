<script setup>
defineProps({
  items: { type: Array, required: true },
});
</script>

<template>
  <dl class="space-y-2 text-sm">
    <div
      v-for="item in items"
      :key="item.label"
      class="flex justify-between gap-4"
    >
      <dt class="text-neutral-500">{{ item.label }}</dt>
      <dd class="break-all text-right font-medium text-neutral-900">
        {{ item.value }}
      </dd>
    </div>
  </dl>
</template>
