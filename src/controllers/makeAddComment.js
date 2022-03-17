export default function makeAddComment({ Clique, CliquePost, PostComments, notifyUsers }) {
  return async function AddComment(req, res) {
    const { post } = req.params
    const { user } = res.locals
    const post_author_id = user.id
    const { text_comment, is_audio, audio_url } = req.body
    const _text_comment = is_audio ? null : text_comment
    const _audio_url = is_audio ? audio_url : null
    try {
      const id = await PostComments.create({
        post_id: post,
        author_id: post_author_id,
        text_comment: _text_comment,
        is_audio,
        audio_url: _audio_url,
      })
      console.log(id)
      //get the count of postComments
      const commentCount = await PostComments.count({
        where: {
          post_id: post,
        },
      })
      //get the clique_id which this post belongs to
      const { clique_id, author_id } = await CliquePost.findOne({ where: { id: post } })
      //get the name of the clique this post belongs to
      const { title } = await Clique.findOne({ where: { id: clique_id } })
      notifyUsers([
        {
          user_id: author_id,
          type: 'post',
          text: `Someone commented on one of your post in ${title}. Now there are ${commentCount} comments on it `,
          reference: post,
        },
      ])
      res.status(200).json({ successMsg: 'Successfully commented your thoughts' })
    } catch (err) {
      res.status(400).json({ errorMsg: err.message })
    }
  }
}
