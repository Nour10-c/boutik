import { zValidator } from '@hono/zod-validator'
import { AppError } from './errors.js'

export const validate = (target, schema) =>
    zValidator(target, schema, (result) => {
        if (!result.success) {
            const message = result.error.issues
                .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
                .join(', ')
            throw new AppError(400, 'VALIDATION_ERROR', message)
        }
    })