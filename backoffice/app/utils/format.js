const priceFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

export const formatPrice = (value) => priceFormatter.format(value)

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })

export const formatDate = (value) => dateFormatter.format(new Date(value))