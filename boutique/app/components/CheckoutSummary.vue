<script setup>
const props = defineProps({
  items: { type: Array, required: true },
  shipping: { type: Object, default: null },
  total: { type: Number, required: true },
});
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
      <span>Total</span>
      <span>{{ formatPrice(props.total) }}</span>
    </div>
  </Card>
</template>
