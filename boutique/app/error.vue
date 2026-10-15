<script setup>
const props = defineProps({
  error: { type: Object, required: true },
});

const is404 = computed(() => props.error.statusCode === 404);

useHead({ title: () => (is404.value ? "Page introuvable" : "Erreur") });

const backToCatalog = () => clearError({ redirect: "/" });
</script>

<template>
  <NuxtLayout>
    <section class="mx-auto max-w-xl py-10">
      <StateMessage
        :icon="is404 ? 'lucide:package-x' : 'lucide:triangle-alert'"
        :title="is404 ? 'Page introuvable' : 'Une erreur est survenue'"
        :description="
          is404
            ? 'Cette adresse n\'existe pas ou a été déplacée.'
            : 'Un problème est survenu de notre côté. Réessayez dans un instant.'
        "
      >
        <Button @click="backToCatalog">Retour au catalogue</Button>
      </StateMessage>
    </section>
  </NuxtLayout>
</template>
