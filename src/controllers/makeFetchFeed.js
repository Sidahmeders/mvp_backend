export default function makeFetchFeed({
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
      //get all the cliques user has joined
      const joinedCliques = await CliquesMember.findAll({
        where: {
          user_id: userId,
          isDeleted: false,
        },
      })
      //if user has not joined any clique send an empty response
      if (!joinedCliques.length)
        return res.status(200).json({ totalFeedCount: 0, cliques: [], postsResponse: [] })
      //get all the posts from all the cliques user has joined and limit them to limit and fetch posts after the offset fetch
      const posts = await CliquePost.findAll({
        where: {
          clique_id: {
            [sequelize.Op.in]: joinedCliques.map((clique) => clique.clique_id),
          },
          status: 1,
        },
        order: [['createdAt', 'DESC']],
        limit: _limit,
        offset: _offset,
      })
      //build the posts response
      const postsResponse = await buildPostsResponse(posts)
      //fetch mod and sub mod of all cliques user has joined
      const cliques = await Clique.findAll({
        where: {
          id: {
            [sequelize.Op.in]: joinedCliques.map((clique) => clique.clique_id),
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
