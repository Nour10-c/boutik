import { createOrder } from '~/services/orders'
import { createCheckoutSession } from '~/services/payments'
import { getErrorMessage } from '~/services/api'

export const useCheckout = () => {
    const { items } = useCart()

    const form = reactive({ email: '', address: '', city: '', zip: '' })
    const shippingOfferId = ref(null)
    const order = ref(null)
    const submitting = ref(false)
    const paying = ref(false)
    const errorMessage = ref('')

    const submitOrder = async () => {
        errorMessage.value = ''
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
        } catch (error) {
            errorMessage.value = getErrorMessage(error)
        } finally {
            submitting.value = false
        }
    }

    const pay = async () => {
        errorMessage.value = ''
        paying.value = true
        try {
            const { url } = await createCheckoutSession(order.value.order_id, order.value.access_key)
            await navigateTo(url, { external: true })
        } catch (error) {
            errorMessage.value = getErrorMessage(error)
            paying.value = false
        }
    }

    return { form, shippingOfferId, order, submitting, paying, errorMessage, submitOrder, pay }
}