<script setup>
useHead({ title: "Produits" });

const {
  filteredProducts, loading, errorMessage, search, filter, busyId, feedback,
  load, changeStock, toggleActive, removeProduct,
} = useAdminProducts();

const filters = [
  { value: "all", label: "Tous" },
  { value: "active", label: "Actifs" },
  { value: "hidden", label: "Masqués" },
  { value: "low", label: "Stock faible" },
  { value: "out", label: "Épuisés" },
];

const createProduct = () => navigateTo("/products/new");
const editProduct = (product) => navigateTo(`/products/${product.id}`);

const productToDelete = ref(null);

const confirmDelete = async () => {
  await removeProduct(productToDelete.value);
  productToDelete.value = null;
};

onMounted(load);
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">Produits</h1>
      <Button @click="createProduct">Nouveau produit</Button>
    </div>

    <div class="flex flex-col gap-4 sm:flex-row sm:items-end">
      <Input
        v-model="search"
        label="Rechercher par nom"
        placeholder="Nom du produit"
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

    <Notice v-if="feedback" :variant="feedback.variant">{{ feedback.message }}</Notice>

    <p v-if="loading" class="text-neutral-500">Chargement…</p>

    <StateMessage
      v-else-if="errorMessage"
      title="Impossible de charger les produits"
      :description="errorMessage"
    >
      <Button @click="load">Réessayer</Button>
    </StateMessage>

    <StateMessage
      v-else-if="filteredProducts.length === 0"
      title="Aucun produit"
      description="Aucun produit ne correspond à votre recherche."
    />

    <Card v-else class="overflow-x-auto p-0">
      <table class="w-full text-left text-sm">
        <thead class="border-b border-neutral-200 bg-neutral-50 text-neutral-700">
          <tr>
            <th class="px-4 py-3 font-medium">Nom</th>
            <th class="px-4 py-3 font-medium">Prix</th>
            <th class="px-4 py-3 font-medium">Stock</th>
            <th class="px-4 py-3 font-medium">Visibilité</th>
            <th class="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in filteredProducts"
            :key="product.id"
            class="border-b border-neutral-100 last:border-0"
          >
            <td class="px-4 py-3">
              <p class="font-medium">{{ product.name }}</p>
              <p class="text-neutral-500">{{ product.slug }}</p>
            </td>
            <td class="px-4 py-3">{{ formatPrice(product.price) }}</td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <StockEditor
                  :stock="product.stock"
                  :loading="busyId === product.id"
                  @save="changeStock(product, $event)"
                />
                <StockBadge :stock="product.stock" />
              </div>
            </td>
            <td class="px-4 py-3">
              <Badge :variant="product.active ? 'success' : 'neutral'">
                {{ product.active ? "Actif" : "Masqué" }}
              </Badge>
            </td>
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <Button size="sm" variant="outline" @click="editProduct(product)">
                  Modifier
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  :disabled="busyId === product.id"
                  @click="toggleActive(product)"
                >
                  {{ product.active ? "Masquer" : "Afficher" }}
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  :disabled="busyId === product.id"
                  @click="productToDelete = product"
                >
                  Supprimer
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>

    <Modal
      :model-value="productToDelete !== null"
      title="Supprimer ce produit ?"
      @update:model-value="productToDelete = null"
    >
      <p class="text-base text-neutral-700">
        « {{ productToDelete?.name }} » sera supprimé définitivement. Cette action est irréversible.
      </p>
      <template #actions>
        <Button variant="outline" @click="productToDelete = null">Annuler</Button>
        <Button variant="danger" @click="confirmDelete">Supprimer</Button>
      </template>
    </Modal>
  </section>
</template>