# BOUTIK - API

## Installation

```bash
pnpm install
cp .env.example .env
```

Renseigner dans `.env` :

- `DATABASE_URL` : URL du pooler Supabase (port 6543)
- `ADMIN_TOKEN` : token admin (`openssl rand -hex 32`)

## Lancement

```bash
pnpm dev
```

API sur http://localhost:3000

## Routes

| Méthode | Route                 | Paramètres                                                                                                       | Accès  |
| ------- | --------------------- | ---------------------------------------------------------------------------------------------------------------- | ------ |
| GET     | `/products`           | query : `search` (optionnel)                                                                                     | public |
| GET     | `/products/:slug`     | path : `slug`                                                                                                    | public |
| GET     | `/admin/verify`       | header : `Authorization: Bearer <token>`                                                                         | admin  |
| POST    | `/admin/products`     | header : token admin, body : `slug`, `name`, `price` (≥ 0), `description`, `active`, `stock`, `images` (URLs)    | admin  |
| PATCH   | `/admin/products/:id` | path : `id`, header : token admin, body (au moins un) : `name`, `description`, `price` (≥ 0), `active`, `images` | admin  |

## Format d'erreur

```json
{ "error": { "code": "NOT_FOUND", "message": "Route introuvable" } }
```
