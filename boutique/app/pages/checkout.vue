<script setup>
import { getErrorMessage } from "~/services/api";

const { items, loaded, total: productsTotal } = useCart();
const {
  methods,
  status: methodsStatus,
  error: methodsError,
  refresh,
} = useShippingMethods();
const {
  form,
  shippingOfferId,
  order,
  submitting,
  paying,
  needsConfirmation,
  errorMessage,
  submit,
} = useCheckout();

const selectedMethod = computed(
  () =>
    methods.value?.find((method) => method.id === shippingOfferId.value) ??
    null,
);

const estimatedTotal = computed(
  () =>
    Math.round(
      (productsTotal.value + (selectedMethod.value?.price ?? 0)) * 100,
    ) / 100,
);

const displayedTotal = computed(
  () => order.value?.total ?? estimatedTotal.value,
);

watch(
  methods,
  (list) => {
    if (list?.length && shippingOfferId.value === null)
      shippingOfferId.value = list[0].id;
  },
  { immediate: true },
);

useHead({ title: "Commande" });
</script>

<template>
  <section class="space-y-6">
    <h1 class="text-3xl font-bold">Commande</h1>

    <p v-if="!loaded" class="text-neutral-500">Chargement...</p>

    <StateMessage
      v-else-if="!items.length && !order"
      title="Votre panier est vide"
      description="Ajoutez des produits avant de commander."
    >
      <Button variant="outline" @click="navigateTo('/')"
        >Voir le catalogue</Button
      >
    </StateMessage>

    <StateMessage
      v-else-if="methodsError"
      title="Impossible de charger les offres de livraison"
      :description="getErrorMessage(methodsError)"
    >
      <Button variant="outline" @click="refresh">Réessayer</Button>
    </StateMessage>

    <form
      v-else
      class="grid gap-8 lg:grid-cols-3"
      @submit.prevent="submit(estimatedTotal)"
    >
      <div class="space-y-6 lg:col-span-2">
        <Card class="space-y-4">
          <h2 class="text-xl font-semibold">Coordonnées</h2>
          <Input
            v-model="form.email"
            label="E-mail"
            type="email"
            autocomplete="email"
            maxlength="255"
            required
            :disabled="!!order"
          />
          <Input
            v-model="form.address"
            label="Adresse"
            autocomplete="street-address"
            maxlength="255"
            required
            :disabled="!!order"
          />
          <div class="grid gap-4 sm:grid-cols-2">
            <Input
              v-model="form.city"
              label="Ville"
              autocomplete="address-level2"
              maxlength="255"
              required
              :disabled="!!order"
            />
            <Input
              v-model="form.zip"
              label="Code postal"
              autocomplete="postal-code"
              pattern="[0-9A-Za-z \-]{3,10}"
              title="3 à 10 caractères"
              required
              :disabled="!!order"
            />
          </div>
        </Card>

        <Card>
          <p v-if="methodsStatus === 'pending'" class="text-neutral-500">
            Chargement des offres de livraison...
          </p>
          <ShippingOptions
            v-else-if="methods?.length"
            v-model="shippingOfferId"
            :methods="methods"
            :disabled="!!order"
          />
          <p v-else class="text-neutral-500">
            Aucune offre de livraison disponible.
          </p>
        </Card>
      </div>

      <div class="space-y-4 lg:sticky lg:top-6 lg:col-span-1 lg:self-start">
        <CheckoutSummary
          :items="items"
          :shipping="selectedMethod"
          :total="displayedTotal"
        />

        <p
          v-if="needsConfirmation"
          role="status"
          class="rounded-md bg-secondary-50 p-3 text-sm text-secondary-700"
        >
          Le total a changé depuis votre panier (prix ou tarif mis à jour).
          Vérifiez-le avant de payer.
        </p>

        <p
          v-if="errorMessage"
          role="alert"
          class="rounded-md bg-error-50 p-3 text-sm text-error-700"
        >
          {{ errorMessage }}
        </p>

        <Button
          type="submit"
          class="w-full"
          :loading="submitting || paying"
          :disabled="shippingOfferId === null"
        >
          Payer {{ formatPrice(displayedTotal) }}
        </Button>
      </div>
    </form>
  </section>
</template>
