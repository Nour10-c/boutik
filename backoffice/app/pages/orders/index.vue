<script setup>
useHead({ title: "Commandes" });

const {
  filteredOrders,
  loading,
  errorMessage,
  search,
  filter,
  busyId,
  feedback,
  load,
  saveShipping,
  markProcessed,
  carrierOptionsFor,
} = useAdminOrders();

const filters = [
  { value: "all", label: "Toutes" },
  { value: "en attente", label: "En attente" },
  { value: "payée", label: "Payées" },
  { value: "traitée", label: "Traitées" },
];

const selectedOrder = ref(null);

const openShipping = (order) => {
  feedback.value = null;
  selectedOrder.value = order;
};

const onSave = async (form) => {
  if (await saveShipping(selectedOrder.value, form)) selectedOrder.value = null;
};

const onProcess = async (form) => {
  const order = selectedOrder.value;
  if ((await saveShipping(order, form)) && (await markProcessed(order))) {
    selectedOrder.value = null;
  }
};

const carrierOptions = computed(() =>
  selectedOrder.value ? carrierOptionsFor(selectedOrder.value) : [],
);

onMounted(load);
</script>

<template>
  <section class="space-y-6">
    <h1 class="text-3xl font-bold">Commandes</h1>

    <div class="flex flex-col gap-4 sm:flex-row sm:items-end">
      <Input
        v-model="search"
        label="Rechercher"
        placeholder="Référence ou email"
        class="sm:w-80"
      />
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="item in filters"
          :key="item.value"
          size="sm"
          :variant="filter === item.value ? 'primary' : 'outline'"
          @click="filter = item.value"
        >
          {{ item.label }}
        </Button>
      </div>
    </div>

    <Notice v-if="feedback && !selectedOrder" :variant="feedback.variant">
      {{ feedback.message }}
    </Notice>

    <p v-if="loading" class="text-neutral-500">Chargement…</p>

    <StateMessage
      v-else-if="errorMessage"
      title="Impossible de charger les commandes"
      :description="errorMessage"
    >
      <Button @click="load">Réessayer</Button>
    </StateMessage>

    <StateMessage
      v-else-if="filteredOrders.length === 0"
      title="Aucune commande"
      description="Aucune commande ne correspond à votre recherche."
    />

    <Card v-else class="overflow-x-auto p-0">
      <table class="w-full text-left text-sm">
        <thead
          class="border-b border-neutral-200 bg-neutral-50 text-neutral-700"
        >
          <tr>
            <th class="px-4 py-3 font-medium">Référence</th>
            <th class="px-4 py-3 font-medium">Date</th>
            <th class="px-4 py-3 font-medium">Client</th>
            <th class="px-4 py-3 font-medium">Offre de livraison</th>
            <th class="px-4 py-3 font-medium">Transporteur</th>
            <th class="px-4 py-3 font-medium">Total</th>
            <th class="px-4 py-3 font-medium">Statut</th>
            <th class="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in filteredOrders"
            :key="order.id"
            class="border-b border-neutral-100 last:border-0"
          >
            <td class="px-4 py-3 font-medium">#{{ order.ref }}</td>
            <td class="px-4 py-3">{{ formatDate(order.date) }}</td>
            <td class="px-4 py-3">{{ order.email }}</td>
            <td class="px-4 py-3">
              <p>{{ order.shipping_offer_name }}</p>
              <p class="text-neutral-500">
                {{ formatPrice(order.shipping_offer_price) }}
              </p>
            </td>
            <td class="px-4 py-3">
              <template v-if="order.shipping_company">
                <p>{{ order.shipping_company }}</p>
                <p v-if="order.shipping_cost !== null" class="text-neutral-500">
                  Coût {{ formatPrice(order.shipping_cost) }}
                </p>
                <p v-if="order.tracking_number" class="text-neutral-500">
                  {{ order.tracking_number }}
                </p>
              </template>
              <span v-else class="text-neutral-500">Non affecté</span>
            </td>
            <td class="px-4 py-3">{{ formatPrice(order.total) }}</td>
            <td class="px-4 py-3">
              <OrderStatusBadge :status="order.status" />
            </td>
            <td class="px-4 py-3">
              <Button
                size="sm"
                :variant="order.status === 'payée' ? 'primary' : 'outline'"
                :disabled="order.status === 'en attente' || busyId === order.id"
                @click="openShipping(order)"
              >
                {{ order.status === "payée" ? "Traiter" : "Modifier" }}
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>

    <OrderShippingModal
      :order="selectedOrder"
      :carrier-options="carrierOptions"
      :loading="busyId !== null"
      :error="feedback?.variant === 'error' ? feedback.message : ''"
      @close="selectedOrder = null"
      @save="onSave"
      @process="onProcess"
    />
  </section>
</template>
