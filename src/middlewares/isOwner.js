import Clique from '../database/models/clique.js'
import CliquePost from '../database/models/clique_post.js'

export default async function isOwner(req, res, next) {
  const { user_id } = res.locals
  const { post } = req.params
  const Post = await CliquePost.findOne({ where: { id: post } })
  const clique = await Clique.findOne({ where: { id: Post.clique_id } })
  if (
    Post.author_id === user_id ||
    clique.moderator_id === user_id ||
    clique.subModerator_id === user_id
  )
    next()
  else res.status(403).json({ errorMsg: 'You are not authorized to delete this post' })
}
