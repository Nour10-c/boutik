const STORAGE_KEY = 'boutik-cart'

export default defineNuxtPlugin((nuxtApp) => {
    const { items, loaded } = useCart()

    nuxtApp.hook('app:mounted', () => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
            items.value = Array.isArray(saved) ? saved : []
        } catch {
            items.value = []
        }
        loaded.value = true

        watch(
            items,
            (value) => {
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
                } catch {
                    // stockage indisponible : le panier reste en mémoire pour la session
                }
            },
            { deep: true },
        )
    })
})