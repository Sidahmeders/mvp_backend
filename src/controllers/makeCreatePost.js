export default function makeCreatePost({ CliquePost }) {
  return async function CreatePost(req, res) {
    //INSERT into 'clique_posts'("author_id","clique_id","title","body") VALUES(?,?,?,?),[]
    const { title, body } = req.body
    const author_id = res.locals.user.id
    const clique_id = req.params.cliqueId
    const media_url = res.locals.fileURL

    try {
      await CliquePost.create({
        author_id,
        clique_id,
        title,
        body,
        media_url,
      })
      res.status(200).json({ successMsg: 'Successfully created the post' })
    } catch (err) {
      res.status(400).json({ errorMsg: err.message })
    }
  }
}
