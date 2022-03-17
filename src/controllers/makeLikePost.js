export default function makeLikePost({
  Clique,
  PostReaction,
  CliquePost,
  User,
  sequelize,
  notifyUsers,
}) {
  return async function LikePost(req, res) {
    const { post } = req.params
    const user_id = res.locals.user.id
    const Post = await CliquePost.findOne({ where: { id: post } })
    //if Post is null return res.status 404 with no post found
    if (!Post) return res.status(404).json({ errorMsg: 'No Post Found' })

    try {
      //checking if user has already liked or disliked this post
      const isAlreadyDone = await PostReaction.findOne({
        where: {
          post_id: post,
          user_id,
          action: {
            [sequelize.Op.or]: ['liked', 'disliked'],
          },
        },
      })
      //if already done something
      if (isAlreadyDone) {
        //if already liked return an error msg if already disliked move ahead
        if (isAlreadyDone.action === 'liked')
          return res.status(400).json({ errorMsg: 'Already Liked' })
        //update this document if it is already disliked
        await PostReaction.update(
          {
            action: 'liked',
          },
          {
            where: {
              post_id: post,
              user_id,
            },
          }
        )
      }
      //if user has not interaced with this post in like or dislike  create the record
      else {
        await PostReaction.create({
          post_id: post,
          user_id: user_id,
          action: 'liked',
        })
      }
      const author = await User.findOne({ where: { id: Post.author_id } })
      //getting the clique it was posted to
      const { title } = await Clique.findOne({ where: { id: Post.clique_id } })
      // get the number of current likes on the post
      const likes = await PostReaction.count({ where: { post_id: post, action: 'liked' } })
      notifyUsers([
        {
          user_id: author.id,
          type: 'post',
          text: `Someone liked one of your post to ${title}. Now it has ${likes} likes `,
          reference: post,
        },
      ])
      res.status(200).json({ successMsg: 'Liked' })
    } catch (err) {
      res.status(400).json({ errorMsg: err.message })
    }
  }
}
