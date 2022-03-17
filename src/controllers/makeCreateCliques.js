export default function makeCreateCliques({ Clique, CliquesMember }) {
  return async function CreateCliques(req, res) {
    const { title, type, subModerator_id } = req.body
    const { user, fileURL } = res.locals
    const userId = user.id

    try {
      const { id } = await Clique.create({
        title,
        type,
        clique_poster: fileURL,
        author_id: userId,
        moderator_id: userId,
        subModerator_id,
      })
      await CliquesMember.create({
        user_id: userId,
        clique_id: id,
      })
      await CliquesMember.create({
        user_id: subModerator_id,
        clique_id: id,
      })
      res.status(200).json({ successMsg: `Congrats on the new clique ${user.firstName}` })
    } catch (e) {
      res.status(400).json({ errorMsg: e.message })
    }
  }
}
