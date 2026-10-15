<script setup>
const props = defineProps({
  product: { type: Object, required: true },
  compact: { type: Boolean, default: false },
});

const { items, add } = useCart();

const added = ref(false);
let timer;

const outOfStock = computed(
  () => props.product.availability === "out_of_stock",
);
const inCart = computed(
  () =>
    items.value.find((item) => item.productId === props.product.id)?.quantity ??
    0,
);
const atLimit = computed(
  () =>
    props.product.stock !== null &&
    props.product.stock !== undefined &&
    inCart.value >= props.product.stock,
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
      :disabled="outOfStock || atLimit"
      @click="onAdd"
    >
      <template v-if="outOfStock">Épuisé</template>
      <template v-else-if="atLimit">Maximum dans le panier</template>
      <template v-else-if="props.compact && added">
        <Icon name="lucide:check" class="size-4" aria-hidden="true" />
        Ajouté
      </template>
      <template v-else>
        <Icon name="lucide:shopping-bag" class="size-4" aria-hidden="true" />
        Ajouter au panier
      </template>
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
