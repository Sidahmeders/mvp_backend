import PostReaction from '../../database/models/post_reaction.js'
import PostComments from '../../database/models/post_comment.js'

export default async function buildPostsResponse(posts) {
  const postsPromise = posts.map(async (post) => {
    const likeCount = await PostReaction.count({
      where: { post_id: post.id, action: 'liked' },
    })
    const dislikeCount = await PostReaction.count({
      where: { post_id: post.id, action: 'disliked' },
    })
    const commentCount = await PostComments.count({
      where: { post_id: post.id, status: 1 },
    })
    return { ...post.dataValues, likeCount, dislikeCount, commentCount }
  })
  const _posts = await Promise.all(postsPromise)
  return _posts
}
