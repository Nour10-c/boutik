<script setup>
const props = defineProps({
  product: { type: Object, default: null },
  submitLabel: { type: String, required: true },
  loading: { type: Boolean, default: false },
  slugError: { type: String, default: "" },
});

const emit = defineEmits(["submit"]);

const isEdit = computed(() => props.product !== null);

const form = reactive({
  name: props.product?.name ?? "",
  slug: props.product?.slug ?? "",
  description: props.product?.description ?? "",
  price: props.product?.price ?? 0,
  stock: props.product?.stock ?? 0,
  active: props.product?.active ?? true,
  imagesText: (props.product?.images ?? []).join("\n"),
});

// Le slug se remplit tout seul depuis le nom, tant qu'on ne l'a pas modifié à la main
const slugTouched = ref(isEdit.value);
watch(
  () => form.name,
  (name) => {
    if (!slugTouched.value) form.slug = slugify(name);
  },
);

const errors = reactive({ name: "", slug: "", price: "", stock: "", images: "" });

const parseImages = () =>
  form.imagesText.split("\n").map((line) => line.trim()).filter(Boolean);

const isUrl = (value) => {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
};

const validate = () => {
  const images = parseImages();
  errors.name = form.name.trim() ? "" : "Le nom est obligatoire";
  errors.slug =
    isEdit.value || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)
      ? ""
      : "Minuscules, chiffres et tirets uniquement";
  errors.price =
    Number.isFinite(form.price) && form.price >= 0
      ? ""
      : "Le prix doit être positif ou nul";
  errors.stock =
    isEdit.value || (Number.isInteger(form.stock) && form.stock >= 0)
      ? ""
      : "Entier positif ou nul";
  errors.images =
    images.length > 10
      ? "10 images maximum"
      : images.every(isUrl)
        ? ""
        : "Chaque ligne doit être une URL valide (http ou https)";

  return Object.values(errors).every((message) => !message);
};

const submit = () => {
  if (!validate()) return;

  const common = {
    name: form.name.trim(),
    description: form.description.trim() || null,
    price: form.price,
    active: form.active,
    images: parseImages(),
  };

  emit("submit", isEdit.value ? common : { ...common, slug: form.slug, stock: form.stock });
};
</script>

<template>
  <form class="space-y-4" novalidate @submit.prevent="submit">
    <Input v-model="form.name" label="Nom" required :error="errors.name" />

    <Input
      v-model="form.slug"
      label="Slug (adresse de la fiche)"
      :disabled="isEdit"
      :error="errors.slug || slugError"
      @input="slugTouched = true"
    />

    <Textarea v-model="form.description" label="Description" rows="4" />

    <div class="grid gap-4 sm:grid-cols-2">
      <Input
        v-model="form.price"
        label="Prix (€)"
        type="number"
        min="0"
        step="0.01"
        :error="errors.price"
      />
      <Input
        v-if="!isEdit"
        v-model="form.stock"
        label="Stock initial"
        type="number"
        min="0"
        :error="errors.stock"
      />
    </div>

    <Textarea
      v-model="form.imagesText"
      label="Images (une URL par ligne)"
      rows="4"
      placeholder="https://…"
      :error="errors.images"
    />

    <label class="flex items-center gap-2 text-base">
      <input v-model="form.active" type="checkbox" class="size-4 accent-primary-600" />
      Produit visible dans la boutique
    </label>

    <Button type="submit" :loading="loading">{{ submitLabel }}</Button>
  </form>
</template>