<script setup>
const props = defineProps({
  stock: { type: Number, required: true },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(["save"]);

const draft = ref(props.stock);
watch(() => props.stock, (value) => (draft.value = value));

const isValid = computed(() => Number.isInteger(draft.value) && draft.value >= 0);
const canSave = computed(() => isValid.value && draft.value !== props.stock);
</script>

<template>
  <div class="flex items-center gap-2">
    <Input
      v-model="draft"
      type="number"
      min="0"
      aria-label="Quantité en stock"
      :error="isValid ? '' : 'Entier ≥ 0'"
      class="w-24"
    />
    <Button
      v-if="canSave"
      size="sm"
      :loading="loading"
      @click="emit('save', draft)"
    >
      Enregistrer
    </Button>
  </div>
</template>