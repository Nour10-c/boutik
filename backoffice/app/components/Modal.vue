<script setup>
defineProps({
  title: { type: String, required: true },
});

const open = defineModel({ type: Boolean, default: false });

const close = () => {
  open.value = false;
};

const onKeydown = (event) => {
  if (event.key === "Escape" && open.value) close();
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50 p-4"
      @click.self="close"
    >
      <div
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        class="w-full max-w-md space-y-4 rounded-lg border border-neutral-200 bg-white p-6"
      >
        <h2 class="text-xl font-semibold">{{ title }}</h2>
        <slot />
        <div class="flex justify-end gap-2">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </Teleport>
</template>