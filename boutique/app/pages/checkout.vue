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
  errorMessage,
  submitOrder,
  pay,
} = useCheckout();

const selectedMethod = computed(
  () =>
    methods.value?.find((method) => method.id === shippingOfferId.value) ??
    null,
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

    <div v-else class="grid gap-8 lg:grid-cols-3">
      <div class="space-y-6 lg:col-span-2">
        <form class="space-y-6" @submit.prevent="submitOrder">
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

          <Button
            v-if="!order"
            type="submit"
            :loading="submitting"
            :disabled="shippingOfferId === null"
          >
            Valider la commande
          </Button>
        </form>

        <Card v-if="order" class="space-y-4">
          <div class="flex items-center justify-between gap-2">
            <h2 class="text-xl font-semibold">Commande n° {{ order.ref }}</h2>
            <Badge variant="success">Créée</Badge>
          </div>
          <p class="text-base">
            Total validé par le serveur :
            <strong>{{ formatPrice(order.total) }}</strong>
          </p>
          <Button :loading="paying" @click="pay">Payer avec Stripe</Button>
        </Card>

        <p
          v-if="errorMessage"
          role="alert"
          class="rounded-md bg-error-50 p-3 text-sm text-error-700"
        >
          {{ errorMessage }}
        </p>
      </div>

      <div class="lg:col-span-1">
        <CheckoutSummary
          :items="items"
          :products-total="productsTotal"
          :shipping="selectedMethod"
          :validated-total="order?.total ?? null"
        />
      </div>
    </div>
  </section>
</template>
