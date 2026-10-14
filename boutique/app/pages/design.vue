<script setup>
const email = ref("");
const withError = ref("");
</script>

<template>
  <main class="mx-auto max-w-md space-y-6 p-6">
    <Input
      v-model="email"
      label="E-mail"
      type="email"
      placeholder="vous@exemple.fr"
    />
    <p class="text-sm text-neutral-500">Valeur : {{ email }}</p>

    <Input
      v-model="withError"
      label="Adresse"
      error="Ce champ est obligatoire"
    />
    <Input label="Désactivé" disabled placeholder="Non modifiable" />

    <Card>
      <p class="font-semibold">Carte avec espacement</p>
    </Card>

    <Card :padded="false">
      <img
        src="https://picsum.photos/seed/test/600/300"
        alt=""
        class="w-full"
      />
      <p class="p-4 font-semibold">Carte avec image pleine largeur</p>
    </Card>
  </main>
</template>
