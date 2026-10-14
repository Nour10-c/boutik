<script setup>
const props = defineProps({
  order: { type: Object, required: true },
});
</script>

<template>
  <Card class="space-y-4">
    <h2 class="text-xl font-semibold">Commande n° {{ props.order.ref }}</h2>

    <ul class="space-y-2">
      <li
        v-for="item in props.order.items"
        :key="item.product_id"
        class="flex justify-between gap-2 text-sm"
      >
        <span>{{ item.quantity }} × {{ item.name }}</span>
        <span class="font-medium">{{
          formatPrice(Number(item.paid_price) * item.quantity)
        }}</span>
      </li>
    </ul>

    <div
      class="flex justify-between gap-2 border-t border-neutral-200 pt-3 text-sm"
    >
      <span>Livraison ({{ props.order.shipping_offer_name }})</span>
      <span class="font-medium">{{
        formatPrice(Number(props.order.shipping_offer_price))
      }}</span>
    </div>

    <div
      class="flex justify-between gap-2 border-t border-neutral-200 pt-3 text-lg font-bold"
    >
      <span>Total</span>
      <span>{{ formatPrice(Number(props.order.total)) }}</span>
    </div>

    <div
      class="space-y-1 border-t border-neutral-200 pt-3 text-sm text-neutral-700"
    >
      <p class="font-medium text-neutral-900">Adresse de livraison</p>
      <p>{{ props.order.address }}</p>
      <p>{{ props.order.zip }} {{ props.order.city }}</p>
      <p v-if="props.order.shipping_company">
        Transporteur : {{ props.order.shipping_company }}
      </p>
      <p v-if="props.order.tracking_number">
        Suivi : {{ props.order.tracking_number }}
      </p>
    </div>
  </Card>
</template>
