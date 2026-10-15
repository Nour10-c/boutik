# BOUTIK - API

## Installation

```bash
pnpm install
cp .env.example .env
```

Renseigner dans `.env` :

- `DATABASE_URL` : URL du pooler Supabase (port 6543)
- `ADMIN_TOKEN` : token admin (`openssl rand -hex 32`)
- `STRIPE_SECRET_KEY` : clé secrète Stripe (mode test)
- `STRIPE_WEBHOOK_SECRET` : secret du webhook (`whsec_…`)
- `FRONTEND_URL` : URL de la boutique, avec `http://` (retour après paiement)
- `CORS_ORIGIN` : origines autorisées à appeler l'API

## Lancement

```bash
pnpm dev
```

`pnpm dev` utilise `src/local.index.js`, un serveur Node réservé au développement local. En production, seul le handler AWS Lambda est déployé.

API sur http://localhost:3000

Pour recevoir les événements Stripe en local :

```bash
stripe listen --events checkout.session.completed,checkout.session.expired,payment_intent.payment_failed --forward-to localhost:3000/payments/webhook
```

## Routes

### Catalogue

| Méthode | Route             | Paramètres                   | Accès  |
| ------- | ----------------- | ---------------------------- | ------ |
| GET     | `/products`       | query : `search` (optionnel) | public |
| GET     | `/products/:slug` | path : `slug`                | public |

### Livraison

| Méthode | Route                      | Paramètres                                                               | Accès  |
| ------- | -------------------------- | ------------------------------------------------------------------------ | ------ |
| GET     | `/shipping/methods`        | aucun                                                                    | public |
| GET     | `/admin/shipping/carriers` | header : token admin. Renvoie les transporteurs avec leur coût par offre | admin  |

### Commandes

| Méthode | Route         | Paramètres                                                                                                                                          | Accès  |
| ------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| POST    | `/orders`     | body : `items` (`product_id`, `quantity`), `email`, `address`, `city`, `zip`, `shipping_offer_id`. Renvoie `order_id`, `ref`, `access_key`, `total` | public |
| GET     | `/orders/:id` | path : `id`, query : `key` (`access_key` de la commande)                                                                                            | public |

### Paiement

| Méthode | Route                | Paramètres                                                                            | Accès  |
| ------- | -------------------- | ------------------------------------------------------------------------------------- | ------ |
| POST    | `/payments/checkout` | body : `order_id`, `key` (`access_key` de la commande). Renvoie l'URL Stripe Checkout | public |
| POST    | `/payments/webhook`  | header : `stripe-signature`, body brut Stripe                                         | Stripe |

### Admin : accès

| Méthode | Route           | Paramètres                               | Accès |
| ------- | --------------- | ---------------------------------------- | ----- |
| GET     | `/admin/verify` | header : `Authorization: Bearer <token>` | admin |

### Admin : produits

| Méthode | Route                       | Paramètres                                                                                                       | Accès |
| ------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----- |
| POST    | `/admin/products`           | header : token admin, body : `slug`, `name`, `price` (≥ 0), `description`, `active`, `stock`, `images` (URLs)    | admin |
| PATCH   | `/admin/products/:id`       | path : `id`, header : token admin, body (au moins un) : `name`, `description`, `price` (≥ 0), `active`, `images` | admin |
| DELETE  | `/admin/products/:id`       | path : `id`, header : token admin                                                                                | admin |
| PATCH   | `/admin/products/:id/stock` | path : `id`, header : token admin, body : `stock` (entier ≥ 0)                                                   | admin |

### Admin : commandes et livraisons

| Méthode | Route                        | Paramètres                                                                                                                                          | Accès |
| ------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| GET     | `/admin/orders`              | header : token admin                                                                                                                                | admin |
| GET     | `/admin/orders/:id`          | path : `id`, header : token admin. Renvoie la commande, ses lignes et ses paiements                                                                 | admin |
| PATCH   | `/admin/orders/:id`          | path : `id`, header : token admin, body : `status` (`payée` ou `traitée`). « traitée » exige une commande payée avec un transporteur                | admin |
| PATCH   | `/admin/orders/:id/shipping` | path : `id`, header : token admin, body (au moins un) : `shipping_company` (transporteur disponible pour l'offre de la commande), `tracking_number` | admin |

## Format d'erreur

```json
{ "error": { "code": "NOT_FOUND", "message": "Route introuvable" } }
```
