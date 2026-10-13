<script setup>
const props = defineProps({
  padded: { type: Boolean, default: true },
});
</script>

<template>
  <div
    class="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm"
    :class="props.padded ? 'p-4' : ''"
  >
    <slot />
  </div>
</template>
