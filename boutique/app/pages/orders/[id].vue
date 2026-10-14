<script setup>
import { getErrorMessage } from "~/services/api";

const route = useRoute();
const key = typeof route.query.key === "string" ? route.query.key : "";

const { order, error, status, notFound, state, timedOut, checkAgain, refresh } =
  useOrderConfirmation(route.params.id, key);

useHead({ title: "Confirmation de commande" });
</script>

<template>
  <section class="space-y-6">
    <h1 class="text-3xl font-bold">Confirmation de commande</h1>

    <StateMessage
      v-if="!key"
      title="Lien invalide"
      description="Le justificatif d'accès à la commande est manquant."
    >
      <Button variant="outline" @click="navigateTo('/')"
        >Voir le catalogue</Button
      >
    </StateMessage>

    <StateMessage
      v-else-if="notFound"
      title="Commande introuvable"
      description="Ce lien est incorrect ou la commande n'existe pas."
    >
      <Button variant="outline" @click="navigateTo('/')"
        >Voir le catalogue</Button
      >
    </StateMessage>

    <StateMessage
      v-else-if="error && !order"
      title="Impossible de charger la commande"
      :description="getErrorMessage(error)"
    >
      <Button variant="outline" @click="refresh">Réessayer</Button>
    </StateMessage>

    <p v-else-if="!order && status === 'pending'" class="text-neutral-500">
      Chargement...
    </p>

    <div v-else-if="order" class="grid gap-8 lg:grid-cols-3">
      <div class="space-y-4 lg:col-span-1">
        <PaymentStatusCard
          :state="state"
          :timed-out="timedOut"
          @check-again="checkAgain"
        />
        <Button v-if="state === 'failed'" @click="navigateTo('/cart')"
          >Retourner au panier</Button
        >
        <Button
          v-else-if="state === 'success'"
          variant="outline"
          @click="navigateTo('/')"
        >
          Continuer mes achats
        </Button>
      </div>

      <div class="lg:col-span-2">
        <OrderRecap :order="order" />
      </div>
    </div>
  </section>
</template>
