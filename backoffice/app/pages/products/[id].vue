<script setup>
useHead({ title: "Modifier le produit" });

const id = Number(useRoute().params.id);

const { product, loading, errorMessage: loadError, load } = useAdminProduct(id);
const { saving, errorMessage, slugError, update } = useProductEditor();

onMounted(load);
</script>

<template>
  <section class="mx-auto max-w-2xl space-y-6">
    <h1 class="text-3xl font-bold">Modifier le produit</h1>

    <p v-if="loading" class="text-neutral-500">Chargement…</p>

    <StateMessage v-else-if="loadError" title="Produit indisponible" :description="loadError">
      <Button @click="navigateTo('/products')">Retour à la liste</Button>
    </StateMessage>

    <template v-else>
      <Notice v-if="errorMessage" variant="error">{{ errorMessage }}</Notice>

      <Card>
        <ProductForm
          :product="product"
          submit-label="Enregistrer"
          :loading="saving"
          :slug-error="slugError"
          @submit="update(id, $event)"
        />
      </Card>

      <Button variant="outline" @click="navigateTo('/products')">Retour à la liste</Button>
    </template>
  </section>
</template>