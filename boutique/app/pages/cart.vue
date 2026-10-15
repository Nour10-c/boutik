<script setup>
const { items, loaded, count, total, setQuantity, remove } = useCart();

useHead({ title: "Panier" });
</script>

<template>
  <section class="space-y-6">
    <h1 class="text-3xl font-bold">Panier</h1>

    <p v-if="!loaded" class="text-neutral-500">Chargement du panier...</p>

    <StateMessage
      v-else-if="!items.length"
      title="Votre panier est vide"
      description="Ajoutez des produits depuis le catalogue."
    >
      <Button variant="outline" @click="navigateTo('/')"
        >Voir le catalogue</Button
      >
    </StateMessage>

    <div v-else class="grid gap-8 lg:grid-cols-3">
      <ul class="space-y-4 lg:col-span-2">
        <li v-for="item in items" :key="item.productId">
          <CartItem
            :item="item"
            @update-quantity="setQuantity(item.productId, $event)"
            @remove="remove(item.productId)"
          />
        </li>
      </ul>

      <div class="lg:col-span-1">
        <CartSummary :count="count" :total="total">
          <Button @click="navigateTo('/checkout')">Commander</Button>
        </CartSummary>
      </div>
    </div>
  </section>
</template>
