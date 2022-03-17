import { Router } from 'express'
import { Login, Register } from '../controllers/_index.js'
import { sanitizeLogin, sanitizeRegister, validate } from '../middlewares/_index.js'

const router = Router()

router.post('/login', sanitizeLogin(), validate, Login)

router.post('/register', sanitizeRegister(), validate, Register)

export default router
