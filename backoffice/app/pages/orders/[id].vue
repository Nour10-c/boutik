<script setup>
useHead({ title: "Commande" });

const route = useRoute();
const {
  order,
  loading,
  errorMessage,
  load,
  customerInfo,
  shippingInfo,
  paymentInfo,
  itemsTotal,
} = useOrderDetail(route.params.id);

onMounted(load);
</script>

<template>
  <section class="space-y-6">
    <NuxtLink
      to="/orders"
      class="text-sm font-medium text-primary-600 hover:text-primary-700"
    >
      ← Retour aux commandes
    </NuxtLink>

    <p v-if="loading" class="text-neutral-500">Chargement…</p>

    <StateMessage
      v-else-if="errorMessage"
      title="Impossible de charger la commande"
      :description="errorMessage"
    >
      <Button @click="load">Réessayer</Button>
    </StateMessage>

    <template v-else-if="order">
      <div class="flex flex-wrap items-center gap-3">
        <h1 class="text-3xl font-bold">Commande #{{ order.ref }}</h1>
        <OrderStatusBadge :status="order.status" />
        <span class="text-neutral-500">{{ formatDate(order.date) }}</span>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 class="mb-3 text-lg font-semibold">Client</h2>
          <InfoList :items="customerInfo" />
        </Card>

        <Card>
          <h2 class="mb-3 text-lg font-semibold">Livraison</h2>
          <InfoList :items="shippingInfo" />
        </Card>
      </div>

      <Card>
        <h2 class="mb-3 text-lg font-semibold">Paiement</h2>
        <p v-if="order.payments.length === 0" class="text-sm text-neutral-500">
          Aucun paiement enregistré pour cette commande.
        </p>
        <div
          v-for="payment in order.payments"
          :key="payment.id"
          class="space-y-3"
        >
          <PaymentStatusBadge :status="payment.status" />
          <InfoList :items="paymentInfo(payment)" />
        </div>
      </Card>

      <Card class="overflow-x-auto p-0">
        <table class="w-full text-left text-sm">
          <thead
            class="border-b border-neutral-200 bg-neutral-50 text-neutral-700"
          >
            <tr>
              <th class="px-4 py-3 font-medium">Produit</th>
              <th class="px-4 py-3 font-medium">Quantité</th>
              <th class="px-4 py-3 font-medium">Prix payé</th>
              <th class="px-4 py-3 font-medium">Sous-total</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in order.items"
              :key="item.product_id"
              class="border-b border-neutral-100"
            >
              <td class="px-4 py-3 font-medium">{{ item.name }}</td>
              <td class="px-4 py-3">{{ item.quantity }}</td>
              <td class="px-4 py-3">{{ formatPrice(item.paid_price) }}</td>
              <td class="px-4 py-3">
                {{ formatPrice(item.quantity * item.paid_price) }}
              </td>
            </tr>
          </tbody>
          <tfoot class="text-neutral-700">
            <tr>
              <td colspan="3" class="px-4 pt-3 text-right">Produits</td>
              <td class="px-4 pt-3">{{ formatPrice(itemsTotal) }}</td>
            </tr>
            <tr>
              <td colspan="3" class="px-4 py-1 text-right">Livraison</td>
              <td class="px-4 py-1">
                {{ formatPrice(order.shipping_offer_price) }}
              </td>
            </tr>
            <tr class="font-semibold text-neutral-900">
              <td colspan="3" class="px-4 pb-3 text-right">Total</td>
              <td class="px-4 pb-3">{{ formatPrice(order.total) }}</td>
            </tr>
          </tfoot>
        </table>
      </Card>
    </template>
  </section>
</template>
