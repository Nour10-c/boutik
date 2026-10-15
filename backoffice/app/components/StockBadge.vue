<script setup>
const props = defineProps({
  stock: { type: Number, required: true },
});

const status = computed(() => getStockStatus(props.stock));

const config = {
  out: { variant: "error", label: "Épuisé" },
  low: { variant: "secondary", label: "Stock faible" },
  ok: { variant: "success", label: "En stock" },
};
</script>

<template>
  <Badge :variant="config[status].variant">{{ config[status].label }}</Badge>
</template>