<script setup>
const props = defineProps({
  images: { type: Array, default: () => [] },
  alt: { type: String, default: "" },
});

const selected = ref(0);
</script>

<template>
  <div class="space-y-3">
    <img
      v-if="props.images.length"
      :src="props.images[selected]"
      :alt="props.alt"
      class="aspect-square w-full rounded-lg object-cover"
    />
    <div
      v-else
      class="flex aspect-square w-full items-center justify-center rounded-lg bg-neutral-100 text-sm text-neutral-500"
    >
      Pas d'image
    </div>

    <ul v-if="props.images.length > 1" class="grid grid-cols-5 gap-2">
      <li v-for="(image, index) in props.images" :key="image">
        <button
          type="button"
          class="block w-full overflow-hidden rounded-md border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          :class="
            index === selected ? 'border-primary-600' : 'border-transparent'
          "
          :aria-label="`Voir l'image ${index + 1}`"
          @click="selected = index"
        >
          <img :src="image" alt="" class="aspect-square w-full object-cover" />
        </button>
      </li>
    </ul>
  </div>
</template>
