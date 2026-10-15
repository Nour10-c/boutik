<script setup>
import { getErrorMessage } from "~/services/api";

definePageMeta({ layout: "login" });
useHead({ title: "Connexion" });

const { login } = useAuth();
const token = ref("");
const loading = ref(false);
const errorMessage = ref("");

const submit = async () => {
  errorMessage.value = "";
  loading.value = true;
  try {
    await login(token.value.trim());
    await navigateTo("/");
  } catch (error) {
    errorMessage.value =
      error?.statusCode === 401
        ? "Token refusé. Vérifiez-le et réessayez."
        : getErrorMessage(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Card class="w-full max-w-sm space-y-4">
    <h1 class="text-2xl font-bold">Administration</h1>

    <form class="space-y-4" @submit.prevent="submit">
      <Input v-model="token" label="Token" type="password" required />
      <Button type="submit" :loading="loading" class="w-full"
        >Se connecter</Button
      >
    </form>

    <p
      v-if="errorMessage"
      role="alert"
      class="rounded-md bg-error-50 p-3 text-sm text-error-700"
    >
      {{ errorMessage }}
    </p>
  </Card>
</template>