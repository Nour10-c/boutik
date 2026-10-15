<script setup>
const props = defineProps({
  status: { type: String, required: true },
});

const variants = {
  "en attente": "neutral",
  payée: "secondary",
  traitée: "success",
};
</script>

<template>
  <Badge :variant="variants[props.status] ?? 'neutral'">{{
    props.status
  }}</Badge>
</template>
