<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-neutral-200 bg-white">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="space-y-1">
        <p class="text-lg font-bold text-primary-600">BOUTIK</p>
        <p class="text-sm text-neutral-500">Votre boutique de chaussures.</p>
      </div>

      <nav aria-label="Pied de page" class="flex gap-6 text-sm font-medium">
        <NuxtLink to="/" class="hover:text-primary-600">Catalogue</NuxtLink>
        <NuxtLink to="/cart" class="hover:text-primary-600">Panier</NuxtLink>
      </nav>

      <SecurePaymentNote />
    </div>

    <div class="border-t border-neutral-200">
      <p class="mx-auto max-w-6xl px-4 py-4 text-xs text-neutral-500">
        © {{ year }} BOUTIK
      </p>
    </div>
  </footer>
</template>
