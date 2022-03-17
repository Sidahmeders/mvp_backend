export default function makeLeaveClique({ CliquesMember }) {
  return async function LeaveClique(req, res) {
    //UPDATE 'cliques_members SET isDeleted=0 WHERE user_id=?,clique_id=?
    const user_id = res.locals.user.id
    const { clique_id } = req.body
    try {
      await CliquesMember.update(
        { isDeleted: 1 },
        {
          where: {
            user_id: user_id,
            clique_id: clique_id,
          },
        }
      )
      res.status(200).json({ successMsg: 'Left Clique' })
    } catch (err) {
      res.status(400).json({ errorMsg: err.message })
    }
  }
}
