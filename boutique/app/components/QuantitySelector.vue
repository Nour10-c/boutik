<script setup>
const props = defineProps({
  min: { type: Number, default: 1 },
  max: { type: Number, default: 100 },
  label: { type: String, default: "Quantité" },
});

const model = defineModel({ type: Number, default: 1 });

const decrease = () => {
  model.value = model.value - 1;
};
const increase = () => {
  model.value = model.value + 1;
};
</script>

<template>
  <div
    class="inline-flex items-center gap-2"
    role="group"
    :aria-label="props.label"
  >
    <Button
      variant="outline"
      size="sm"
      aria-label="Diminuer la quantité"
      :disabled="model <= props.min"
      @click="decrease"
    >
      −
    </Button>
    <span
      class="min-w-8 text-center text-base font-medium"
      aria-live="polite"
      >{{ model }}</span
    >
    <Button
      variant="outline"
      size="sm"
      aria-label="Augmenter la quantité"
      :disabled="model >= props.max"
      @click="increase"
    >
      +
    </Button>
  </div>
</template>
