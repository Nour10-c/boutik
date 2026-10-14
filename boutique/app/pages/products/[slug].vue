<script setup>
import { getErrorMessage } from "~/services/api";

const route = useRoute();
const { product, status, error, notFound, refresh } = useProduct(
  route.params.slug,
);

const availability = computed(() =>
  getAvailability(product.value?.availability),
);

useHead({ title: () => product.value?.name ?? "Produit" });
</script>

<template>
  <section class="space-y-6">
    <NuxtLink
      to="/"
      class="text-sm font-medium text-primary-600 hover:text-primary-700"
    >
      ← Retour au catalogue
    </NuxtLink>

    <div
      v-if="status === 'pending'"
      class="grid animate-pulse gap-8 md:grid-cols-2"
    >
      <div class="aspect-square w-full rounded-lg bg-neutral-200"></div>
      <div class="space-y-4">
        <div class="h-8 w-3/4 rounded-sm bg-neutral-200"></div>
        <div class="h-6 w-1/4 rounded-sm bg-neutral-200"></div>
        <div class="h-24 w-full rounded-sm bg-neutral-200"></div>
      </div>
    </div>

    <StateMessage
      v-else-if="notFound"
      title="Produit introuvable"
      description="Ce produit n'existe pas ou n'est plus disponible."
    >
      <Button variant="outline" @click="navigateTo('/')"
        >Voir le catalogue</Button
      >
    </StateMessage>

    <StateMessage
      v-else-if="error"
      title="Impossible de charger le produit"
      :description="getErrorMessage(error)"
    >
      <Button variant="outline" @click="refresh">Réessayer</Button>
    </StateMessage>

    <div v-else class="grid gap-8 md:grid-cols-2">
      <ProductGallery :images="product.images" :alt="product.name" />

      <div class="space-y-4">
        <h1 class="text-3xl font-bold">{{ product.name }}</h1>
        <div class="flex items-center gap-3">
          <p class="text-2xl font-bold">{{ formatPrice(product.price) }}</p>
          <Badge :variant="availability.variant">{{
            availability.label
          }}</Badge>
        </div>
        <p
          v-if="product.description"
          class="whitespace-pre-line text-base text-neutral-700"
        >
          {{ product.description }}
        </p>
        <AddToCartButton :product="product" />
      </div>
    </div>
  </section>
</template>
