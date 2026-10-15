<script setup>
defineOptions({ inheritAttrs: false });

const props = defineProps({
  label: { type: String, default: "" },
  type: { type: String, default: "text" },
  error: { type: String, default: "" },
  icon: { type: String, default: "" },
});

const model = defineModel({ type: [String, Number], default: "" });
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

    <div class="relative">
      <Icon
        v-if="props.icon"
        :name="props.icon"
        class="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-neutral-500"
        aria-hidden="true"
      />
      <input
        :id="id"
        v-model="model"
        :type="props.type"
        :aria-invalid="props.error ? 'true' : 'false'"
        v-bind="$attrs"
        class="w-full rounded-md border bg-white py-2 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
        :class="[
          props.icon ? 'pl-10 pr-3' : 'px-3',
          props.error ? 'border-error-500' : 'border-neutral-300',
        ]"
      />
    </div>

    <p v-if="props.error" class="text-sm text-error-700">{{ props.error }}</p>
  </div>
</template>
