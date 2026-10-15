<script setup>
const props = defineProps({
  variant: { type: String, default: "neutral" },
});

const variants = {
  neutral: "bg-neutral-100 text-neutral-700",
  success: "bg-success-50 text-success-700",
  secondary: "bg-secondary-100 text-secondary-700",
  error: "bg-error-50 text-error-700",
};
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
    :class="variants[props.variant] ?? variants.neutral"
  >
    <slot />
  </span>
</template>
