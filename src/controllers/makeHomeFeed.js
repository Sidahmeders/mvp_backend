export default function makeHomeFeed({
  Clique,
  CliquesMember,
  CliquePost,
  sequelize,
  buildCliquesResponse,
  buildPostsResponse,
}) {
  // a function to check if offset and limit is null and assigning them default values
  const checkoffsetAndLimit = (offset, limit) => {
    if (offset === null) {
      offset = 0
    }
    if (limit === null) {
      limit = 10
    }
    return { offset, limit }
  }
  return async function FetchFeed(req, res) {
    //get offset and limit from query
    const { offset, limit } = req.query
    //check if page and limit is null and assigning them default values
    const { offset: _offset, limit: _limit } = checkoffsetAndLimit(offset, limit)
    const userId = res.locals.user.id
    try {
      //get all the cliques which are public
      const publicCliques = await Clique.findAll({
        where: {
          type: 'public',
        },
      })
      //get all cliques which user has joined
      const joinedCliques = await CliquesMember.findAll({
        where: {
          user_id: userId,
        },
      })
      //get all the posts from all the public cliques and filter out cliques in which user is member  and limit them to limit and fetch posts after the offset fetch
      const posts = await CliquePost.findAll({
        where: {
          clique_id: {
            [sequelize.Op.in]: [publicCliques.map((clique) => clique.id)],
            [sequelize.Op.notIn]: [joinedCliques.map((clique) => clique.clique_id)],
          },
        },
      })
      //build the posts response
      const postsResponse = await buildPostsResponse(posts)
      //sort postsResponse with the number of likes
      postsResponse.sort((a, b) => b.likeCount - a.likeCount)
      //fetch mod and sub mod of all cliques user has joined
      const cliques = await Clique.findAll({
        where: {
          id: {
            [sequelize.Op.in]: postsResponse.map((post) => post.clique_id),
          },
        },
      })
      //build the response
      const cliqueResponse = await buildCliquesResponse(cliques, userId)
      res.status(200).json({
        totalFeedCount: posts.length,
        cliques: cliqueResponse,
        postsResponse,
      })
    } catch (err) {
      res.status(500).json({
        error: err,
        message: 'Something went wrong',
      })
    }
  }
}
