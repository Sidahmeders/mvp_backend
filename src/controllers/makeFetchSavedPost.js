export default function makeFetchSavedPosts({ CliquePost, PostReaction }) {
  return async function FetchSavedPosts(req, res) {
    const userId = res.locals.user.id
    try {
      const savedPosts = await PostReaction.findAll({
        where: {
          user_id: userId,
          action: 'saved',
        },
      })
      if (!savedPosts) return res.status(404).json({ errorMsg: 'No saved posts found' })
      const postsPromise = savedPosts.map(async (savedPost) => {
        return await CliquePost.findOne({ where: { id: savedPost.post_id } })
      })
      const posts = await Promise.all(postsPromise)
      return res.status(200).json({ posts })
    } catch {
      return res.status(500).json({ errorMsg: 'Something went wrong' })
    }
  }
}
