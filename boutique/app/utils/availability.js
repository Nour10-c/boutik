const availabilities = {
    in_stock: { label: 'En stock', variant: 'success' },
    low_stock: { label: 'Stock faible', variant: 'secondary' },
    out_of_stock: { label: 'Épuisé', variant: 'error' },
}

export const getAvailability = (value) => availabilities[value] ?? availabilities.in_stock