const LOW_STOCK_MAX = 10

export const getStockStatus = (stock) => {
    if (stock === 0) return 'out'
    if (stock <= LOW_STOCK_MAX) return 'low'
    return 'ok'
}