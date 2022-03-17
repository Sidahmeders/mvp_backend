import { Router } from 'express'
import {
  RequestAccountAccess,
  VerifyAccount,
  ForgetPassword,
  ResetPassword,
} from '../controllers/_index.js'

const router = Router()

router.post('/request-account-access', RequestAccountAccess)

router.get('/verify/:token', VerifyAccount)

router.post('/forget-password', ForgetPassword)

router.post('/reset-password/:token', ResetPassword)

export default router
