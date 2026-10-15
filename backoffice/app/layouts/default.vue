<script setup>
const { logout } = useAuth();

const onLogout = async () => {
  logout();
  await navigateTo("/login");
};
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="border-b border-neutral-200 bg-white">
      <div
        class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"
      >
        <nav class="flex items-center gap-6">
          <NuxtLink to="/" class="text-xl font-bold text-primary-600"
            >BOUTIK Admin</NuxtLink
          >
          <NuxtLink
            to="/products"
            class="text-base font-medium hover:text-primary-600"
            >Produits</NuxtLink
          >
          <NuxtLink
            to="/orders"
            class="text-base font-medium hover:text-primary-600"
            >Commandes</NuxtLink
          >
        </nav>
        <Button variant="outline" size="sm" @click="onLogout"
          >Déconnexion</Button
        >
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <slot />
    </main>
  </div>
</template>