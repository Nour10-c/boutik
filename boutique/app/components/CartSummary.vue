<script setup>
const props = defineProps({
  count: { type: Number, required: true },
  total: { type: Number, required: true },
});
</script>

<template>
  <Card class="space-y-4">
    <h2 class="text-xl font-semibold">Récapitulatif</h2>
    <div class="flex items-center justify-between">
      <p class="text-base text-neutral-700">
        {{ props.count }} article{{ props.count > 1 ? "s" : "" }}
      </p>
      <p class="text-xl font-bold">{{ formatPrice(props.total) }}</p>
    </div>
    <p class="text-sm text-neutral-500">
      Total estimatif, hors livraison. Le montant officiel est calculé à la
      commande.
    </p>
    <slot />
  </Card>
</template>
