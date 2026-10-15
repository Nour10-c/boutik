<script setup>
const props = defineProps({
  state: { type: String, required: true },
  timedOut: { type: Boolean, default: false },
});

const emit = defineEmits(["check-again"]);
</script>

<template>
  <Card class="space-y-3" role="status">
    <template v-if="props.state === 'success'">
      <Badge variant="success">Paiement confirmé</Badge>
      <h2 class="text-xl font-semibold">Merci pour votre commande !</h2>
      <p class="text-base text-neutral-700">
        Votre commande est enregistrée et sera préparée prochainement.
      </p>
    </template>

    <template v-else-if="props.state === 'failed'">
      <Badge variant="error">Paiement échoué</Badge>
      <h2 class="text-xl font-semibold">Le paiement n'a pas abouti</h2>
      <p class="text-base text-neutral-700">
        Aucun montant n'a été débité. Votre panier est conservé, vous pouvez
        réessayer.
      </p>
    </template>

    <template v-else-if="props.timedOut">
      <Badge variant="secondary">Confirmation en attente</Badge>
      <h2 class="text-xl font-semibold">
        La confirmation prend plus de temps que prévu
      </h2>
      <p class="text-base text-neutral-700">
        Votre paiement n'est pas perdu : le statut sera mis à jour dès que
        Stripe nous l'aura confirmé.
      </p>
      <Button variant="outline" @click="emit('check-again')"
        >Vérifier à nouveau</Button
      >
    </template>

    <template v-else>
      <div class="flex items-center gap-3">
        <span
          class="size-5 animate-spin rounded-full border-2 border-neutral-300 border-t-primary-600"
          aria-hidden="true"
        ></span>
        <h2 class="text-xl font-semibold">
          Confirmation du paiement en cours...
        </h2>
      </div>
      <p class="text-base text-neutral-700">
        Cette page se met à jour automatiquement.
      </p>
    </template>
  </Card>
</template>
