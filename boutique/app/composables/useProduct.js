import { fetchProduct } from '~/services/products'

export const useProduct = (slug) => {
    const { data: product, status, error, refresh } = useAsyncData(
        `product-${slug}`,
        () => fetchProduct(slug),
    )

    const notFound = computed(() => error.value?.data?.error?.code === 'PRODUCT_NOT_FOUND')

    return { product, status, error, notFound, refresh }
}