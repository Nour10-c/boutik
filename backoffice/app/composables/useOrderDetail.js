import { fetchAdminOrder } from '~/services/orders'
import { getErrorMessage } from '~/services/api'

export const useOrderDetail = (id) => {
    const order = ref(null)
    const loading = ref(false)
    const errorMessage = ref('')

    const load = async () => {
        loading.value = true
        errorMessage.value = ''
        try {
            order.value = await fetchAdminOrder(id)
        } catch (error) {
            errorMessage.value = getErrorMessage(error)
        } finally {
            loading.value = false
        }
    }

    const customerInfo = computed(() => [
        { label: 'E-mail', value: order.value.email },
        {
            label: 'Adresse',
            value: `${order.value.address}, ${order.value.zip} ${order.value.city}`,
        },
    ])

    const shippingInfo = computed(() => {
        const { shipping_offer_name, shipping_offer_price, shipping_company, shipping_cost, tracking_number } =
            order.value
        const hasCost = shipping_cost !== null

        return [
            {
                label: 'Offre choisie',
                value: `${shipping_offer_name} (${formatPrice(shipping_offer_price)})`,
            },
            { label: 'Transporteur', value: shipping_company ?? 'Non affecté' },
            { label: 'Coût transporteur', value: hasCost ? formatPrice(shipping_cost) : '—' },
            {
                label: 'Marge livraison',
                value: hasCost ? formatPrice(shipping_offer_price - shipping_cost) : '—',
            },
            { label: 'Suivi', value: tracking_number ?? '—' },
        ]
    })

    const paymentInfo = (payment) => [
        { label: 'Montant', value: formatPrice(payment.amount) },
        { label: 'Référence Stripe', value: payment.stripe_ref },
        { label: 'Événement Stripe', value: payment.stripe_event_id ?? '—' },
    ]

    const itemsTotal = computed(() =>
        order.value.items.reduce((sum, item) => sum + item.quantity * item.paid_price, 0),
    )

    return { order, loading, errorMessage, load, customerInfo, shippingInfo, paymentInfo, itemsTotal }
}