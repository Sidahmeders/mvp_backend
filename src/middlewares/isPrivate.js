import Clique from '../database/models/clique.js'
import CliqueMembers from '../database/models/cliques-member.js'

export default async function (req, res, next) {
  const clique_id =
    req.body.clique_id ||
    req.body.clique_id ||
    req.params.cliques ||
    req.params.clique_id ||
    req.params.cliqueId
  try {
    const clique = await Clique.findOne({ where: { id: clique_id } })
    if (clique.type === 'public') return next()
    if (!res.locals.user)
      return res.status(403).json({ errorMsg: 'You are not a member of this clique' })

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
