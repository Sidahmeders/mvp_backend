import { Router } from 'express'
import {
  FetchProfile,
  FetchSavedPosts,
  GetUserNotification,
  FetchFeed,
  MarkAsRead,
  HomeFeed,
  UpdateProfile,
  ChangePassword,
  PostFeedback,
} from '../controllers/_index.js'
import { firebaseFileUpload, isAuthenticated } from '../middlewares/_index.js'

const router = Router()
router.get('/', isAuthenticated, FetchProfile)
router.get('/savedPosts', isAuthenticated, FetchSavedPosts)
router.get('/feed', isAuthenticated, FetchFeed)
router.get('/home-feed', isAuthenticated, HomeFeed)
router.get('/notifications', isAuthenticated, GetUserNotification)
router.post('/markAsRead', isAuthenticated, MarkAsRead)
router.post('/profile', isAuthenticated, UpdateProfile)
router.post('/changePassword', isAuthenticated, ChangePassword)
router.post(
  '/feedback',
  isAuthenticated,
  firebaseFileUpload.single('feedback/', 'img'),
  PostFeedback
)
// router.put('/users/profile-image', isAuthenticated) TODO: add the update profile-image contoller.

export default router
