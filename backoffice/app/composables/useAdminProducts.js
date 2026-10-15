import {
    fetchAdminProducts,
    updateProductStock,
    updateProductActive,
    deleteProduct,
} from '~/services/products'
import { getErrorMessage } from '~/services/api'

export const useAdminProducts = () => {
    const { consumeFlash } = useFlash()

    const products = ref([])
    const loading = ref(false)
    const errorMessage = ref('')
    const search = ref('')
    const filter = ref('all')
    const busyId = ref(null)
    // Récupère le message laissé par le formulaire (« Produit créé »), puis l'efface
    const feedback = ref(consumeFlash())

    const filteredProducts = computed(() => {
        const term = search.value.trim().toLowerCase()

        return products.value.filter((product) => {
            if (term && !product.name.toLowerCase().includes(term)) return false

            switch (filter.value) {
                case 'active': return product.active
                case 'hidden': return !product.active
                case 'low': return getStockStatus(product.stock) === 'low'
                case 'out': return getStockStatus(product.stock) === 'out'
                default: return true
            }
        })
    })

    const load = async () => {
        loading.value = true
        errorMessage.value = ''
        try {
            products.value = await fetchAdminProducts()
        } catch (error) {
            errorMessage.value = getErrorMessage(error)
        } finally {
            loading.value = false
        }
    }

    const patchLocal = (id, changes) => {
        products.value = products.value.map((p) => (p.id === id ? { ...p, ...changes } : p))
    }

    // Une seule fonction gère l'attente, la confirmation et l'erreur de toute action
    const runAction = async (product, action, successMessage) => {
        busyId.value = product.id
        feedback.value = null
        try {
            await action()
            feedback.value = { variant: 'success', message: successMessage }
            return true
        } catch (error) {
            feedback.value = { variant: 'error', message: getErrorMessage(error) }
            return false
        } finally {
            busyId.value = null
        }
    }

    const changeStock = (product, stock) =>
        runAction(
            product,
            async () => {
                await updateProductStock(product.id, stock)
                patchLocal(product.id, { stock })
            },
            `Stock de « ${product.name} » mis à jour.`,
        )

    const toggleActive = (product) => {
        const active = !product.active
        return runAction(
            product,
            async () => {
                await updateProductActive(product.id, active)
                patchLocal(product.id, { active })
            },
            active ? `« ${product.name} » est de nouveau visible.` : `« ${product.name} » est masqué.`,
        )
    }

    const removeProduct = (product) =>
        runAction(
            product,
            async () => {
                await deleteProduct(product.id)
                products.value = products.value.filter((p) => p.id !== product.id)
            },
            `« ${product.name} » a été supprimé.`,
        )

    return {
        filteredProducts, loading, errorMessage, search, filter, busyId, feedback,
        load, changeStock, toggleActive, removeProduct,
    }
}