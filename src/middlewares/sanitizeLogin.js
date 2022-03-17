import { body } from 'express-validator'

export default function sanitizeLogin() {
  return [body('email').isEmail().notEmpty(), body('password').notEmpty()]
}
