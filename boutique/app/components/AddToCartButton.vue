<script setup>
const props = defineProps({
  product: { type: Object, required: true },
  compact: { type: Boolean, default: false },
});

const { add } = useCart();

const added = ref(false);
let timer;

const outOfStock = computed(
  () => props.product.availability === "out_of_stock",
);

const onAdd = () => {
  add(props.product);
  added.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => {
    added.value = false;
  }, 3000);
};

onScopeDispose(() => clearTimeout(timer));
</script>

<template>
  <div :class="props.compact ? '' : 'space-y-2'">
    <Button
      :size="props.compact ? 'sm' : 'md'"
      :class="props.compact ? 'w-full' : ''"
      :disabled="outOfStock"
      @click="onAdd"
    >
      <template v-if="outOfStock">Épuisé</template>
      <template v-else-if="props.compact && added">Ajouté ✓</template>
      <template v-else>Ajouter au panier</template>
    </Button>

    <p
      v-if="added && !props.compact"
      role="status"
      class="text-sm text-success-700"
    >
      Ajouté au panier.
      <NuxtLink to="/cart" class="font-medium underline"
        >Voir le panier</NuxtLink
      >
    </p>
    <span v-else-if="added" role="status" class="sr-only"
      >Ajouté au panier</span
    >
  </div>
</template>
