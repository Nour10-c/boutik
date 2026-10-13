<script setup>
const props = defineProps({
  variant: { type: String, default: "primary" },
  size: { type: String, default: "md" },
  type: { type: String, default: "button" },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const variants = {
  primary: "bg-primary-600 text-white hover:bg-primary-700",
  secondary: "bg-secondary-500 text-neutral-900 hover:bg-secondary-600",
  outline:
    "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100",
  danger: "bg-error-500 text-white hover:bg-error-700",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
};
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled || props.loading"
    :aria-busy="props.loading"
    class="inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
    :class="[
      variants[props.variant] ?? variants.primary,
      sizes[props.size] ?? sizes.md,
    ]"
  >
    <slot />
  </button>
</template>
