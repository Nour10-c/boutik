import { Hono } from 'hono'
import { adminAuth } from '../middlewares/adminAuth.js'

export const adminRoutes = new Hono()

adminRoutes.use('*', adminAuth)

adminRoutes.get('/verify', (c) => c.json({ ok: true }))