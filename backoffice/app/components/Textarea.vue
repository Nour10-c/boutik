<script setup>
defineOptions({ inheritAttrs: false });

const props = defineProps({
  label: { type: String, default: "" },
  error: { type: String, default: "" },
});

const model = defineModel({ type: String, default: "" });
const id = useId();
</script>

<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="props.label"
      :for="id"
      class="text-sm font-medium text-neutral-700"
    >
      {{ props.label }}
    </label>

    <textarea
      :id="id"
      v-model="model"
      :aria-invalid="props.error ? 'true' : 'false'"
      v-bind="$attrs"
      class="rounded-md border bg-white px-3 py-2 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
      :class="props.error ? 'border-error-500' : 'border-neutral-300'"
    />

    <p v-if="props.error" class="text-sm text-error-700">{{ props.error }}</p>
  </div>
</template>