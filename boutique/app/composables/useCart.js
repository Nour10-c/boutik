const MAX_QUANTITY = 100

const getLimit = (stock) => Math.min(stock ?? MAX_QUANTITY, MAX_QUANTITY)
const clamp = (quantity, limit) => Math.min(Math.max(Math.trunc(quantity), 1), limit)

export const useCart = () => {
    const items = useState('cart-items', () => [])
    const loaded = useState('cart-loaded', () => false)

    const count = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
    const total = computed(
        () => Math.round(items.value.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100) / 100,
    )

    const remove = (productId) => {
        items.value = items.value.filter((item) => item.productId !== productId)
    }

    const setQuantity = (productId, quantity) => {
        if (quantity < 1) return remove(productId)
        items.value = items.value.map((item) =>
            item.productId === productId
                ? { ...item, quantity: clamp(quantity, getLimit(item.stock)) }
                : item,
        )
    }

    const add = (product, quantity = 1) => {
        const stock = product.stock ?? null
        const existing = items.value.find((item) => item.productId === product.id)

        if (existing) {
            items.value = items.value.map((item) =>
                item.productId === product.id
                    ? { ...item, stock, quantity: clamp(item.quantity + quantity, getLimit(stock)) }
                    : item,
            )
            return
        }

        items.value = [
            ...items.value,
            {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images?.[0] ?? product.image ?? null,
                stock,
                quantity: clamp(quantity, getLimit(stock)),
            },
        ]
    }

    const clear = () => {
        items.value = []
    }

    return { items, loaded, count, total, add, setQuantity, remove, clear }
}