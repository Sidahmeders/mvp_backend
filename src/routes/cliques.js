import { Router } from 'express'
import {
  FetchMovieNames,
  SearchClique,
  FetchCliquesWhereUserIsMod,
  FetchCliquesWhereUserIsMember,
  CreateCliques,
  ChangeMod,
  ChangeSubMod,
  JoinClique,
  AcceptRequest,
  RejectRequest,
  LeaveClique,
  FetchRequests,
} from '../controllers/_index.js'
import PostRoutes from './post.js'
import {
  isAuthenticated,
  isMember,
  isModerator,
  getUser,
  firebaseFileUpload,
} from '../middlewares/_index.js'

const router = Router()

router.get('/', getUser, SearchClique)
router.get('/userismember', isAuthenticated, FetchCliquesWhereUserIsMember)
router.get('/userismod', isAuthenticated, FetchCliquesWhereUserIsMod)
router.get('/fetchNames/:query', FetchMovieNames)
router.post(
  '/create',
  isAuthenticated,
  firebaseFileUpload.single('cliques/', 'clique_poster'),
  CreateCliques
)

router.post('/changeMod', isAuthenticated, isModerator, ChangeMod)
router.post('/changeSubMod', isAuthenticated, isModerator, ChangeSubMod)
router.post('/join', isAuthenticated, JoinClique)
router.post('/fetchRequest', isAuthenticated, isModerator, FetchRequests)
router.post('/acceptRequest', isAuthenticated, isModerator, AcceptRequest)
router.post('/rejectRequest', isAuthenticated, isModerator, RejectRequest)

router.put('/leave', isAuthenticated, isMember, LeaveClique)

router.use('/:cliqueId/posts', PostRoutes)
export default router
