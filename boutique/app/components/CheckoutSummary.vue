<script setup>
const props = defineProps({
  items: { type: Array, required: true },
  productsTotal: { type: Number, required: true },
  shipping: { type: Object, default: null },
  validatedTotal: { type: Number, default: null },
});

const estimatedTotal = computed(
  () =>
    Math.round((props.productsTotal + (props.shipping?.price ?? 0)) * 100) /
    100,
);
</script>

<template>
  <Card class="space-y-4">
    <h2 class="text-xl font-semibold">Récapitulatif</h2>

    <ul class="space-y-2">
      <li
        v-for="item in props.items"
        :key="item.productId"
        class="flex justify-between gap-2 text-sm"
      >
        <span>{{ item.quantity }} × {{ item.name }}</span>
        <span class="font-medium">{{
          formatPrice(item.price * item.quantity)
        }}</span>
      </li>
    </ul>

    <div
      class="flex justify-between gap-2 border-t border-neutral-200 pt-3 text-sm"
    >
      <span
        >Livraison{{ props.shipping ? ` (${props.shipping.name})` : "" }}</span
      >
      <span class="font-medium">{{
        props.shipping ? formatPrice(props.shipping.price) : "-"
      }}</span>
    </div>

    <div
      class="flex justify-between gap-2 border-t border-neutral-200 pt-3 text-lg font-bold"
    >
      <span>{{
        props.validatedTotal !== null ? "Total validé" : "Total estimatif"
      }}</span>
      <span>{{ formatPrice(props.validatedTotal ?? estimatedTotal) }}</span>
    </div>

    <p v-if="props.validatedTotal === null" class="text-xs text-neutral-500">
      Le total officiel est calculé par le serveur à la validation de la
      commande.
    </p>
  </Card>
</template>
