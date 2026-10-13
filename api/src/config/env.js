const required = [
    'DATABASE_URL',
    'ADMIN_TOKEN',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'CORS_ORIGIN',
]

for (const name of required) {
    if (!process.env[name]) {
        throw new Error(`Variable d'environnement manquante : ${name}`)
    }
}

export const env = {
    databaseUrl: process.env.DATABASE_URL,
    adminToken: process.env.ADMIN_TOKEN,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    corsOrigins: process.env.CORS_ORIGIN.split(','),
}