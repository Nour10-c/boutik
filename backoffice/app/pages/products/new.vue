<script setup>
useHead({ title: "Nouveau produit" });

const { saving, errorMessage, slugError, create } = useProductEditor();
</script>

<template>
  <section class="mx-auto max-w-2xl space-y-6">
    <h1 class="text-3xl font-bold">Nouveau produit</h1>

    <Notice v-if="errorMessage" variant="error">{{ errorMessage }}</Notice>

    <Card>
      <ProductForm
        submit-label="Créer le produit"
        :loading="saving"
        :slug-error="slugError"
        @submit="create"
      />
    </Card>

    <Button variant="outline" @click="navigateTo('/products')">Retour à la liste</Button>
  </section>
</template>