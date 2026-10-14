<script setup>
const { count } = useCart();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="border-b border-neutral-200 bg-white">
      <div
        class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"
      >
        <NuxtLink to="/" class="text-xl font-bold text-primary-600"
          >BOUTIK</NuxtLink
        >
        <NuxtLink
          to="/cart"
          class="flex items-center gap-2 text-base font-medium hover:text-primary-600"
        >
          Panier
          <Badge v-if="count" variant="secondary">{{ count }}</Badge>
        </NuxtLink>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <slot />
    </main>
  </div>
</template>
