<script setup>
const props = defineProps({
  order: { type: Object, default: null },
  carrierOptions: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  error: { type: String, default: "" },
});

const emit = defineEmits(["close", "save", "process"]);

const company = ref("");
const tracking = ref("");
const selectId = useId();

// À l'ouverture : transporteur déjà affecté, sinon le moins cher
watch(
  () => props.order,
  (order) => {
    company.value =
      order?.shipping_company ?? props.carrierOptions[0]?.name ?? "";
    tracking.value = order?.tracking_number ?? "";
  },
);

const selected = computed(() =>
  props.carrierOptions.find((c) => c.name === company.value),
);
const margin = computed(() =>
  selected.value
    ? Number(props.order.shipping_offer_price) - selected.value.cost
    : 0,
);

const form = () => ({
  shipping_company: company.value,
  tracking_number: tracking.value.trim(),
});
</script>

<template>
  <Modal
    :model-value="order !== null"
    :title="`Livraison de la commande #${order?.ref}`"
    @update:model-value="emit('close')"
  >
    <p class="text-sm text-neutral-500">
      Offre choisie par le client : {{ order?.shipping_offer_name }} ({{
        formatPrice(order?.shipping_offer_price)
      }})
    </p>

    <div class="flex flex-col gap-1">
      <label :for="selectId" class="text-sm font-medium text-neutral-700"
        >Transporteur</label
      >
      <select
        :id="selectId"
        v-model="company"
        class="rounded-md border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        <option value="" disabled>Choisir un transporteur</option>
        <option
          v-for="(carrier, index) in carrierOptions"
          :key="carrier.name"
          :value="carrier.name"
        >
          {{ carrier.name }} : coût {{ formatPrice(carrier.cost)
          }}{{ index === 0 ? " (le moins cher)" : "" }}
        </option>
      </select>
    </div>

    <p v-if="selected" class="text-sm text-neutral-700">
      Prix client {{ formatPrice(order.shipping_offer_price) }} · Coût
      {{ formatPrice(selected.cost) }} · Marge {{ formatPrice(margin) }}
    </p>

    <Input v-model="tracking" label="Numéro de suivi" placeholder="Optionnel" />

    <Notice v-if="error" variant="error">{{ error }}</Notice>

    <template #actions>
      <Button variant="outline" @click="emit('close')">Annuler</Button>
      <Button
        :variant="order?.status === 'payée' ? 'outline' : 'primary'"
        :disabled="!company"
        :loading="loading"
        @click="emit('save', form())"
      >
        Enregistrer
      </Button>
      <Button
        v-if="order?.status === 'payée'"
        :disabled="!company"
        :loading="loading"
        @click="emit('process', form())"
      >
        Enregistrer et traiter
      </Button>
    </template>
  </Modal>
</template>
