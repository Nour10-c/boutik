<script setup>
const props = defineProps({
  product: { type: Object, required: true },
});

const availability = computed(() =>
  getAvailability(props.product.availability),
);
const productPath = computed(() => `/products/${props.product.slug}`);
</script>

<template>
  <Card
    :padded="false"
    class="flex h-full flex-col transition-shadow hover:shadow-lg"
  >
    <NuxtLink :to="productPath" tabindex="-1" aria-hidden="true" class="block">
      <img
        v-if="props.product.image"
        :src="props.product.image"
        alt=""
        loading="lazy"
        class="aspect-square w-full object-cover"
      />
      <div
        v-else
        class="flex aspect-square w-full items-center justify-center bg-neutral-100 text-sm text-neutral-500"
      >
        Pas d'image
      </div>
    </NuxtLink>

    <div class="flex flex-1 flex-col gap-3 p-4">
      <h2 class="text-lg font-semibold">
        <NuxtLink
          :to="productPath"
          class="hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          {{ props.product.name }}
        </NuxtLink>
      </h2>

      <div class="flex items-center justify-between gap-2">
        <p class="text-base font-bold">
          {{ formatPrice(props.product.price) }}
        </p>
        <Badge :variant="availability.variant" dot>{{
          availability.label
        }}</Badge>
      </div>

      <AddToCartButton :product="props.product" compact class="mt-auto" />
    </div>
  </Card>
</template>
