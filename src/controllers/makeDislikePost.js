export default function makeDislikePost({ PostReaction, sequelize, CliquePost }) {
  return async function DislikePost(req, res) {
    const { post } = req.params
    //check if post is null
    const Post = await CliquePost.findOne({ where: { id: post } })
    if (!Post) return res.status(404).json({ errorMsg: 'No Post Found' })
    const userId = res.locals.user.id

    try {
      //checking if user has already liked or disliked this post
      const isAlreadyDone = await PostReaction.findOne({
        where: {
          post_id: post,
          user_id: userId,
          action: {
            [sequelize.Op.or]: ['liked', 'disliked'],
          },
        },
      })
      //if already done something
      if (isAlreadyDone) {
        //if already disliked return an error msg if already liked move ahead
        if (isAlreadyDone.action === 'disliked')
          return res.status(400).json({ errorMsg: 'Already disliked' })
        //update this document if it is already liked
        await PostReaction.update(
          {
            action: 'disliked',
          },
          {
            where: {
              post_id: post,
              user_id: userId,
            },
          }
        )
      }
      //if user has not interaced with this post in like or dislike  create the record
      else {
        await PostReaction.create({
          post_id: post,
          user_id: userId,
          action: 'disliked',
        })
      }
      res.status(200).json({ successMsg: 'Disliked' })
    } catch (err) {
      res.status(400).json({ errorMsg: err.message })
    }
  }
}
