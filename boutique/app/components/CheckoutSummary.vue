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

    <ul class="space-y-3">
      <li
        v-for="item in props.items"
        :key="item.productId"
        class="flex items-center gap-3"
      >
        <img
          v-if="item.image"
          :src="item.image"
          alt=""
          class="size-12 shrink-0 rounded-md object-cover"
        />
        <div v-else class="size-12 shrink-0 rounded-md bg-neutral-100"></div>

        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium">{{ item.name }}</p>
          <p class="text-xs text-neutral-500">Quantité : {{ item.quantity }}</p>
        </div>

        <p class="text-sm font-medium">
          {{ formatPrice(item.price * item.quantity) }}
        </p>
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
