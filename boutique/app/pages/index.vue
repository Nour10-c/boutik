<script setup>
import { fetchProducts } from "~/services/products";
import { getErrorMessage } from "~/services/api";

const {
  data: products,
  status,
  error,
} = await useAsyncData("products", () => fetchProducts());
</script>

<template>
  <main>
    <p v-if="status === 'pending'">Chargement...</p>
    <p v-else-if="error">{{ getErrorMessage(error) }}</p>
    <pre v-else>{{ products }}</pre>
  </main>
</template>
