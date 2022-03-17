export default function makeChangeModerator({ Clique, User }) {
  return async function changeModerator(req, res) {
    const { newMod, clique_id } = req.body
    const NewMod = await User.findOne({ where: { id: newMod } })
    if (!NewMod) {
      return res.status(404).json({ errorMsg: "The user 'newMod' does not exists" })
    }
    const clique = await Clique.findOne({ where: { id: clique_id } })
    if (!clique) return res.status(404).json({ errorMsg: 'Requested clique does not exist' })
    if (clique.moderator_id === newMod)
      return res.status(400).json({ errorMsg: `${NewMod.firstName} is already the moderator` })
    try {
      await Clique.update(
        {
          moderator_id: newMod,
        },
        {
          where: {
            id: clique_id,
          },
        }
      )
      return res.status(200).json({
        successMsg: `DING DING!! ${NewMod.firstName} is now the moderator of the clique!! Be Quiet And Follow His/Her Rules`,
      })
    } catch (e) {
      return res.status(500).json({ errorMsg: 'Something went wrong' })
    }
  }
}
