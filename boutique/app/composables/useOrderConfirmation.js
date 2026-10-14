import { fetchOrder } from '~/services/orders'

const POLL_INTERVAL = 3000
const MAX_ATTEMPTS = 20

export const useOrderConfirmation = (id, key) => {
    const { clear, loaded } = useCart()

    const { data: order, error, status, refresh } = useAsyncData(
        `order-${id}`,
        () => fetchOrder(id, key),
        { immediate: Boolean(key) },
    )

    const notFound = computed(() => error.value?.statusCode === 404)

    const state = computed(() => {
        if (!order.value) return null
        if (['payée', 'traitée'].includes(order.value.status) || order.value.payment_status === 'réussi') {
            return 'success'
        }
        if (order.value.payment_status === 'échoué') return 'failed'
        return 'pending'
    })

    const timedOut = ref(false)
    let timer
    let attempts = 0

    const stop = () => clearInterval(timer)

    const checkAgain = () => {
        stop()
        attempts = 0
        timedOut.value = false
        timer = setInterval(async () => {
            attempts += 1
            await refresh()
            if (state.value !== 'pending' || error.value) return stop()
            if (attempts >= MAX_ATTEMPTS) {
                timedOut.value = true
                stop()
            }
        }, POLL_INTERVAL)
    }

    if (import.meta.client) {
        watch(
            state,
            (value) => {
                if (value === 'pending') checkAgain()
                else stop()
            },
            { immediate: true },
        )

        watch(
            [state, loaded],
            ([value, isLoaded]) => {
                if (value === 'success' && isLoaded) clear()
            },
            { immediate: true },
        )
    }

    onScopeDispose(stop)

    return { order, error, status, notFound, state, timedOut, checkAgain, refresh }
}