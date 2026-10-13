const required = ["DATABASE_URL", "ADMIN_TOKEN"]

for (const name of required) {
    if (!process.env[name]) {
        throw new Error(`Variable d'environnement manquante : ${name}`)
    }
}

export const env = {
    databaseUrl: process.env.DATABASE_URL,
    adminToken: process.env.ADMIN_TOKEN,
}