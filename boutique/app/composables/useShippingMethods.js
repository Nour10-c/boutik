import { fetchShippingMethods } from '~/services/shipping'

export const useShippingMethods = () => {
    const { data: methods, status, error, refresh } = useAsyncData('shipping-methods', () =>
        fetchShippingMethods(),
    )

    return { methods, status, error, refresh }
}