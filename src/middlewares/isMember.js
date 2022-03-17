import CliqueMembers from '../database/models/cliques-member.js'

// only use these middlewares after isAuthenticated
export default async function isMember(req, res, next) {
  const { id } = res.locals.user
  const clique_id =
    req.body.clique_id ||
    req.body.clique_id ||
    req.params.cliques ||
    req.params.clique_id ||
    req.params.cliqueId
  try {
    const isMember = await CliqueMembers.findOne({
      where: { user_id: id, clique_id: clique_id },
    })
    if (!isMember || isMember.isDeleted) {
      res.status(403).json({ errorMsg: 'You are not a member of this clique' })
    } else if (!isMember.isDeleted) next()
  } catch (err) {
    res.status(400).json({ errorMsg: err.message })
  }
}
