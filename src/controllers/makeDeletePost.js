export default function makeDeletePost({ CliquePost }) {
  return async function DeletePost(req, res) {
    //UPDATE 'cliques_members SET status=0 WHERE author_id=?,clique_id=?
    const { cliques, post } = req.params
    const author_id = res.locals.user.id
    try {
      await CliquePost.update(
        { status: 0 },
        {
          where: {
            id: post,
            author_id: author_id,
            clique_id: cliques,
          },
        }
      )
      res.status(200).json({ successMsg: 'Deleted post' })
    } catch (err) {
      res.status(400).json({ errorMsg: err.message })
    }
  }
}
