import { Router } from 'express'
import CliquesRoutes from './cliques.js'
import AuthRoutes from './auth.js'
import MailsRoutes from './mails.js'
import UserRoutes from './user.js'

const router = Router()

router.use('/cliques', CliquesRoutes)
router.use('/auth', AuthRoutes)
router.use('/accounts', MailsRoutes)
router.use('/user', UserRoutes)
export default router
