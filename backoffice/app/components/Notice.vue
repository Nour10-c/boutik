<script setup>
defineProps({
  variant: { type: String, default: "success" },
});

const styles = {
  success: "bg-success-50 text-success-700",
  error: "bg-error-50 text-error-700",
};
</script>

<template>
  <p
    :role="variant === 'error' ? 'alert' : 'status'"
    class="rounded-md p-3 text-sm"
    :class="styles[variant] ?? styles.success"
  >
    <slot />
  </p>
</template>