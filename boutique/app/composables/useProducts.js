import { fetchProducts } from '~/services/products'

export const useProducts = () => {
    const search = ref('')
    const query = ref('')

    let timer
    watch(search, (value) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            query.value = value.trim()
        }, 300)
    })
    onScopeDispose(() => clearTimeout(timer))

    const { data: products, status, error, refresh } = useAsyncData(
        'products',
        () => fetchProducts(query.value || undefined),
        { watch: [query] },
    )

    return { search, query, products, status, error, refresh }
}