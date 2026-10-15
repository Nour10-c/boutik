<script setup>
const props = defineProps({
  methods: { type: Array, required: true },
  disabled: { type: Boolean, default: false },
});

const model = defineModel({ type: Number, default: null });
const name = useId();
</script>

<template>
  <fieldset class="space-y-2" :disabled="props.disabled">
    <legend class="mb-2 text-xl font-semibold">Livraison</legend>

    <label
      v-for="method in props.methods"
      :key="method.id"
      class="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-neutral-300 p-3 has-[:checked]:border-primary-600 has-[:checked]:bg-primary-50 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50"
    >
      <span class="flex items-center gap-3">
        <input
          v-model="model"
          type="radio"
          :name="name"
          :value="method.id"
          class="size-4 accent-primary-600"
        />
        <span class="text-base font-medium">{{ method.name }}</span>
      </span>
      <span class="text-base font-semibold">{{
        formatPrice(method.price)
      }}</span>
    </label>
  </fieldset>
</template>
