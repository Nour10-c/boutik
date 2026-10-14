<script setup>
import { getErrorMessage } from "~/services/api";

const { search, query, products, status, error, refresh } = useProducts();
</script>

<template>
  <section class="space-y-6">
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <h1 class="text-3xl font-bold">Catalogue</h1>
      <div class="w-full sm:max-w-xs">
        <Input
          v-model="search"
          type="search"
          placeholder="Rechercher un produit"
          aria-label="Rechercher un produit"
        />
      </div>
    </div>

    <ProductGrid v-if="status === 'pending'">
      <ProductCardSkeleton v-for="n in 8" :key="n" />
    </ProductGrid>

    <StateMessage
      v-else-if="error"
      title="Impossible de charger les produits"
      :description="getErrorMessage(error)"
    >
      <Button variant="outline" @click="refresh">Réessayer</Button>
    </StateMessage>

    <StateMessage
      v-else-if="!products?.length"
      :title="
        query
          ? `Aucun produit ne correspond à « ${query} »`
          : 'Aucun produit disponible'
      "
      description="Essayez un autre nom."
    />

    <ProductGrid v-else>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </ProductGrid>
  </section>
</template>
