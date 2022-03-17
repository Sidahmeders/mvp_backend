import Clique from '../database/models/clique.js'

export default async function isModerator(req, res, next) {
  const clique_id = req.body.clique_id || req.body.clique_id || req.params.cliques
  const { id } = res.locals.user
  try {
    const clique = await Clique.findOne({ where: { id: clique_id } })
    if (clique.moderator_id === id) next()
    else
      res.status(403).json({
        errorMsg: 'Access Denied!! You are not moderator of this clique.',
      })
  } catch (err) {
    res.status(400).json({ errorMsg: err.message })
  }
}
