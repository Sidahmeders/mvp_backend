export default function makeFetchPosts({
  Clique,
  CliquePost,
  buildCliquesResponse,
  buildPostsResponse,
}) {
  return async function FetchPosts(req, res) {
    try {
      const { cliqueId } = req.params
      const userId = res.locals.user?.id
      const clique = await Clique.findOne({
        where: { id: cliqueId },
      })
      //build response for clique
      const cliqueResponse = await buildCliquesResponse([clique], userId)
      const cliqueDetails = cliqueResponse[0]
      //limit : for logged in users:unlimited for normal users : 20
      const limit = res.locals.user ? null : 20
      //find all the post related to this clique
      const _posts = await CliquePost.findAll({
        where: { clique_id: cliqueId },
        limit,
      })
      const posts = await buildPostsResponse(_posts)
      return res.status(200).json({ cliqueDetails, posts })
    } catch (err) {
      return res.status(400).json({ errorMsg: err.message })
    }
  }
}
