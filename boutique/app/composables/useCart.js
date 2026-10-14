const MAX_QUANTITY = 100

const clamp = (quantity) => Math.min(Math.max(Math.trunc(quantity), 1), MAX_QUANTITY)

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
            item.productId === productId ? { ...item, quantity: clamp(quantity) } : item,
        )
    }

    const add = (product, quantity = 1) => {
        const existing = items.value.find((item) => item.productId === product.id)
        if (existing) return setQuantity(product.id, existing.quantity + quantity)

        items.value = [
            ...items.value,
            {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images?.[0] ?? product.image ?? null,
                quantity: clamp(quantity),
            },
        ]
    }

    const clear = () => {
        items.value = []
    }

    return { items, loaded, count, total, add, setQuantity, remove, clear }
}