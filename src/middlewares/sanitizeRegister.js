import { body } from 'express-validator'

export default function sanitizeRegister() {
  return [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    // body("mobile").isMobilePhone("any").notEmpty(),
    body('email').isEmail().notEmpty(),
    body('password').isLength({ min: 8 }).notEmpty(),
  ]
}
