import {
    fetchAdminOrders,
    fetchCarriers,
    updateOrderShipping,
    updateOrderStatus,
} from '~/services/orders'
import { getErrorMessage } from '~/services/api'

export const useAdminOrders = () => {
    const orders = ref([])
    const carriers = ref([])
    const loading = ref(false)
    const errorMessage = ref('')
    const search = ref('')
    const filter = ref('all')
    const busyId = ref(null)
    const feedback = ref(null)

    const filteredOrders = computed(() => {
        const term = search.value.trim().toLowerCase()

        return orders.value.filter((order) => {
            if (filter.value !== 'all' && order.status !== filter.value) return false
            if (!term) return true
            return order.email.toLowerCase().includes(term) || String(order.ref).includes(term)
        })
    })

    const load = async () => {
        loading.value = true
        errorMessage.value = ''
        try {
            ;[orders.value, carriers.value] = await Promise.all([fetchAdminOrders(), fetchCarriers()])
        } catch (error) {
            errorMessage.value = getErrorMessage(error)
        } finally {
            loading.value = false
        }
    }

    const patchLocal = (id, changes) => {
        orders.value = orders.value.map((o) => (o.id === id ? { ...o, ...changes } : o))
    }

    // Une seule fonction gère l'attente, la confirmation et l'erreur de toute action
    const runAction = async (order, action, successMessage) => {
        busyId.value = order.id
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

    const saveShipping = (order, { shipping_company, tracking_number }) => {
        const payload = { shipping_company }
        if (tracking_number) payload.tracking_number = tracking_number

        return runAction(
            order,
            async () => {
                await updateOrderShipping(order.id, payload)
                patchLocal(order.id, {
                    shipping_company,
                    tracking_number: tracking_number || order.tracking_number,
                })
            },
            `Livraison de la commande #${order.ref} mise à jour.`,
        )
    }

    const markProcessed = (order) =>
        runAction(
            order,
            async () => {
                await updateOrderStatus(order.id, 'traitée')
                patchLocal(order.id, { status: 'traitée' })
            },
            `La commande #${order.ref} est passée en « traitée ».`,
        )

    const carrierOptionsFor = (order) =>
        carriers.value
            .map((carrier) => ({
                name: carrier.name,
                cost: carrier.costs.find((c) => c.offer === order.shipping_offer_name)?.cost,
            }))
            .filter((option) => option.cost !== undefined)
            .sort((a, b) => a.cost - b.cost)

    return {
        filteredOrders, carriers, loading, errorMessage, search, filter, busyId, feedback,
        load, saveShipping, markProcessed,
        carrierOptionsFor,
    }
}