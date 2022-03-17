import { Router } from 'express'
import {
  FetchPosts,
  CreatePost,
  DeletePost,
  LikePost,
  DislikePost,
  AddComment,
  FetchComments,
  SavePost,
} from '../controllers/_index.js'

import {
  getUser,
  isAuthenticated,
  isMember,
  isOwner,
  isPrivate,
  firebaseFileUpload,
} from '../middlewares/_index.js'

//this option enables to pass :clique_id to /post
const router = Router({ mergeParams: true })

router.get('/', getUser, isPrivate, FetchPosts)

router.post(
  '/createPost',
  isAuthenticated,
  isMember,
  firebaseFileUpload.single('profile-images/', 'media'),
  CreatePost
)

router.delete('/:post/deletePost', isAuthenticated, isMember, isOwner, DeletePost)

router.get('/:post/like', isAuthenticated, isMember, LikePost)

router.get('/:post/dislike', isAuthenticated, isMember, DislikePost)

router.get('/:post/fetchComments', isAuthenticated, isMember, FetchComments)

router.post(
  '/:post/comments',
  isAuthenticated,
  isMember,

  AddComment
)

router.get('/:post/save', isAuthenticated, isMember, SavePost)

export default router
