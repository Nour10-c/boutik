<script setup>
const props = defineProps({
  variant: { type: String, default: "neutral" },
  dot: { type: Boolean, default: false },
});

const variants = {
  neutral: { badge: "bg-neutral-100 text-neutral-700", dot: "bg-neutral-500" },
  success: { badge: "bg-success-50 text-success-700", dot: "bg-success-500" },
  secondary: {
    badge: "bg-secondary-100 text-secondary-700",
    dot: "bg-secondary-500",
  },
  error: { badge: "bg-error-50 text-error-700", dot: "bg-error-500" },
};

const style = computed(() => variants[props.variant] ?? variants.neutral);
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
    :class="style.badge"
  >
    <span
      v-if="props.dot"
      class="size-1.5 rounded-full"
      :class="style.dot"
      aria-hidden="true"
    ></span>
    <slot />
  </span>
</template>
