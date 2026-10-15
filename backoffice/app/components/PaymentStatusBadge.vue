<script setup>
const props = defineProps({
  status: { type: String, required: true },
});

const config = {
  réussi: { variant: "success", label: "Paiement confirmé par Stripe" },
  "en attente": { variant: "secondary", label: "En attente de confirmation" },
  échoué: { variant: "error", label: "Paiement échoué" },
};
</script>

<template>
  <Badge :variant="config[props.status]?.variant ?? 'neutral'">
    {{ config[props.status]?.label ?? props.status }}
  </Badge>
</template>
