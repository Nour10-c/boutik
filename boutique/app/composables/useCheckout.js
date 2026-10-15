import { createOrder } from '~/services/orders'
import { createCheckoutSession } from '~/services/payments'
import { getErrorMessage } from '~/services/api'

const toCents = (value) => Math.round(value * 100)

export const useCheckout = () => {
    const { items } = useCart()

    const form = reactive({ email: '', address: '', city: '', zip: '' })
    const shippingOfferId = ref(null)
    const order = ref(null)
    const submitting = ref(false)
    const paying = ref(false)
    const needsConfirmation = ref(false)
    const errorMessage = ref('')

    const startPayment = async () => {
        paying.value = true
        try {
            const { url } = await createCheckoutSession(order.value.order_id, order.value.access_key)
            await navigateTo(url, { external: true })
        } catch (error) {
            errorMessage.value = getErrorMessage(error)
            paying.value = false
        }
    }

    const placeOrder = async () => {
        submitting.value = true
        try {
            order.value = await createOrder({
                items: items.value.map(({ productId, quantity }) => ({
                    product_id: productId,
                    quantity,
                })),
                ...form,
                shipping_offer_id: shippingOfferId.value,
            })
            return true
        } catch (error) {
            errorMessage.value = getErrorMessage(error)
            return false
        } finally {
            submitting.value = false
        }
    }

    const submit = async (estimatedTotal) => {
        errorMessage.value = ''

        if (!order.value) {
            if (!(await placeOrder())) return
            if (toCents(order.value.total) !== toCents(estimatedTotal)) {
                needsConfirmation.value = true
                return
            }
        }

        needsConfirmation.value = false
        await startPayment()
    }

    return {
        form,
        shippingOfferId,
        order,
        submitting,
        paying,
        needsConfirmation,
        errorMessage,
        submit,
    }
}