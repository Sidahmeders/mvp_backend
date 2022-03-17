export default function makeSavePost({ PostReaction }) {
  return async function SavePost(req, res) {
    const userId = res.locals.user.id
    const { post } = req.params
    try {

      //find if user already saved the post
      const postReaction = await PostReaction.findOne({
        where: {
          user_id:userId,
          post_id: post,
          action: 'saved'
        }
      })
      //if the user already saved the post send an error msg
      if (postReaction) {
        return res.status(400).json({
          error: 'You already saved this post'
        })
      }
      else{
        await PostReaction.create({
          post_id: post,
          user_id: userId,
          action: 'saved',
        })
        res.status(200).json({ successMsg: 'Saved' })
      }
    } catch (e) {
      console.log(e)
      res.status(500).json({ errorMsg: 'Could not save the post' })
    }
  }
}
