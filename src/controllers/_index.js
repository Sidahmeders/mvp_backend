import User from '../database/models/user.js'
import UserNotification from '../database/models/user_notification.js'
import Clique from '../database/models/clique.js'
import CliquesMember from '../database/models/cliques-member.js'
import CliqueRequest from '../database/models/clique_request.js'
import CliquePost from '../database/models/clique_post.js'
import PostComments from '../database/models/post_comment.js'
import PostReaction from '../database/models/post_reaction.js'
import Feedback from '../database/models/feedback.js'
import sequelize from 'sequelize'

import buildCliquesResponse from '../utils/lib/buildCliquesResponse.js'
import buildPostsResponse from '../utils/lib/buildPostsResponse.js'
import { generateToken, verifyToken } from '../utils/lib/jwt.js'
import { verifyPassword, hashPassword } from '../utils/lib/bcrypt.js'
import { sendEmails, FormTypes } from '../utils/lib/nodemailer.js'
import notifyUsers from '../utils/notification/notifyUsers.js'
const devEnv = process.env.NODE_ENV === 'development'
const webDomain = devEnv ? 'http://localhost:5000' : 'https://themovieplay.com'

// Auth
import makeLogin from './makeLogin.js'
import makeRegister from './makeRegister.js'
import makeRequestAccountAccess from './makeRequestAccountAccess.js'
import makeVerifyAccount from './makeVerifyAccount.js'
import makeForgetPassword from './makeForgetPassword.js'
import makeResetPassword from './makeResetPassword.js'

// Cliques
import makeFetchMovieNames from './makeFetchMovieNames.js'
import makeFetchCliques from './makeFetchCliques.js'
import makeCreateCliques from './makeCreateCliques.js'
import makeChangeModerator from './makeChangeModerator.js'
import makeChangeSubModerator from './makeChangeSubModerator.js'
import makeJoinClique from './makeJoinClique.js'
import makeFetchRequests from './makeFetchRequests.js'
import makeAcceptRequest from './makeAcceptRequest.js'
import makeRejectRequest from './makeRejectRequest.js'
import makeLeaveClique from './makeLeaveClique.js'

// Posts
import makeFetchPosts from './makeFetchPosts.js'
import makeCreatePost from './makeCreatePost.js'
import makeDeletePost from './makeDeletePost.js'
import makeLikePost from './makeLikePost.js'
import makeDislikePost from './makeDislikePost.js'
import makeAddComment from './makeAddComment.js'
import makeFetchComments from './makeFetchComments.js'
import makeSavePost from './makeSavePost.js'

//user
import makeFetchFeed from './makeFetchFeed.js'
import makeFetchSavedPost from './makeFetchSavedPost.js'
import makeGetUserNotification from './makeGetUserNotification.js'
import makeMarkAsRead from './makeMarkAsRead.js'
import makeHomeFeed from './makeHomeFeed.js'
import makeFetchProfile from './makeFetchProfile.js'
import makeUpdateProfile from './makeUpdateProfile.js'
import makeChangePassword from './makeChangePassword.js'
import makeFeedback from './makeFeedback.js'

const Login = makeLogin({ User, generateToken, verifyPassword })
const Register = makeRegister({ User, generateToken, hashPassword })
const RequestAccountAccess = makeRequestAccountAccess({
  User,
  generateToken,
  sendEmails,
  FormTypes,
  webDomain,
})
const VerifyAccount = makeVerifyAccount({ User, verifyToken })
const ForgetPassword = makeForgetPassword({ User, generateToken, sendEmails, FormTypes, webDomain })
const ResetPassword = makeResetPassword({ User, verifyToken, hashPassword })

const FetchCliques = new makeFetchCliques({
  Clique,
  CliquesMember,
  buildCliquesResponse,
  sequelize,
})
const SearchClique = FetchCliques.SearchCliques()
const FetchCliquesWhereUserIsMember = FetchCliques.fetch_cliques_user_is_member()
const FetchCliquesWhereUserIsMod = FetchCliques.fetch_cliques_user_is_mod()
const FetchMovieNames = makeFetchMovieNames()
const CreateCliques = makeCreateCliques({ Clique, CliquesMember })
const JoinClique = makeJoinClique({ Clique, CliquesMember, CliqueRequest })
const ChangeMod = makeChangeModerator({ Clique, User })
const ChangeSubMod = makeChangeSubModerator({ Clique, User })
const FetchRequests = makeFetchRequests({ CliqueRequest })
const AcceptRequest = makeAcceptRequest({ User, Clique, CliquesMember, CliqueRequest, notifyUsers })
const RejectRequest = makeRejectRequest({ Clique, CliqueRequest, notifyUsers })
const LeaveClique = makeLeaveClique({ CliquesMember })

const FetchPosts = makeFetchPosts({
  Clique,
  CliquePost,
  buildCliquesResponse,
  buildPostsResponse,
})
const CreatePost = makeCreatePost({ CliquePost })
const DeletePost = makeDeletePost({ CliquePost })
const LikePost = makeLikePost({ Clique, PostReaction, CliquePost, User, sequelize, notifyUsers })
const DislikePost = makeDislikePost({ PostReaction, sequelize, CliquePost })
const FetchComments = makeFetchComments({ PostComments })
const AddComment = makeAddComment({ Clique, CliquePost, PostComments, notifyUsers })
const SavePost = makeSavePost({ PostReaction })

const FetchProfile = makeFetchProfile({ User })
const FetchFeed = makeFetchFeed({
  Clique,
  CliquesMember,
  CliquePost,
  sequelize,
  buildCliquesResponse,
  buildPostsResponse,
})
const HomeFeed = makeHomeFeed({
  Clique,
  CliquesMember,
  CliquePost,
  sequelize,
  buildCliquesResponse,
  buildPostsResponse,
})
const FetchSavedPosts = makeFetchSavedPost({ PostReaction, CliquePost })
const GetUserNotification = makeGetUserNotification({ UserNotification })
const MarkAsRead = makeMarkAsRead({ UserNotification, sequelize })
const UpdateProfile = makeUpdateProfile({ User })
const ChangePassword = makeChangePassword({ User, verifyPassword, hashPassword })
const PostFeedback = makeFeedback({ Feedback, User })
export {
  Login,
  Register,
  RequestAccountAccess,
  VerifyAccount,
  ForgetPassword,
  ResetPassword,
  SearchClique,
  FetchCliquesWhereUserIsMember,
  FetchCliquesWhereUserIsMod,
  FetchMovieNames,
  CreateCliques,
  ChangeMod,
  ChangeSubMod,
  JoinClique,
  FetchRequests,
  AcceptRequest,
  RejectRequest,
  LeaveClique,
  FetchPosts,
  CreatePost,
  DeletePost,
  LikePost,
  DislikePost,
  FetchComments,
  AddComment,
  SavePost,
  FetchProfile,
  FetchFeed,
  HomeFeed,
  FetchSavedPosts,
  GetUserNotification,
  MarkAsRead,
  UpdateProfile,
  ChangePassword,
  PostFeedback,
}
