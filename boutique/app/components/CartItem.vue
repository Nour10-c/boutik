<script setup>
const props = defineProps({
  item: { type: Object, required: true },
});

const emit = defineEmits(["update-quantity", "remove"]);
</script>

<template>
  <Card>
    <div class="flex gap-4">
      <img
        v-if="props.item.image"
        :src="props.item.image"
        :alt="props.item.name"
        class="size-24 shrink-0 rounded-md object-cover"
      />
      <div
        v-else
        class="flex size-24 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-xs text-neutral-500"
      >
        Pas d'image
      </div>

      <div class="flex flex-1 flex-col justify-between gap-3">
        <div class="flex items-start justify-between gap-2">
          <div>
            <NuxtLink
              :to="`/products/${props.item.slug}`"
              class="text-lg font-semibold hover:text-primary-600"
            >
              {{ props.item.name }}
            </NuxtLink>
            <p class="text-sm text-neutral-500">
              {{ formatPrice(props.item.price) }} l'unité
            </p>
          </div>
          <p class="text-lg font-bold">
            {{ formatPrice(props.item.price * props.item.quantity) }}
          </p>
        </div>

        <div class="flex items-center justify-between gap-2">
          <QuantitySelector
            :model-value="props.item.quantity"
            @update:model-value="emit('update-quantity', $event)"
          />
          <Button variant="outline" size="sm" @click="emit('remove')"
            >Retirer</Button
          >
        </div>
      </div>
    </div>
  </Card>
</template>
