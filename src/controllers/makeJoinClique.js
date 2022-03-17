export default function makeJoinClique({ Clique, CliquesMember, CliqueRequest }) {
  return async function JoinClique(req, res) {
    //INSERT into 'cliques_members'("user_id","clique_id","joinedDateTime") VALUES(?,?,?),[]
    const { clique_id } = req.body
    const user_id = res.locals.user.id
    try {
      const clique = await Clique.findOne({ where: { id: clique_id } })
      if (clique === null) return res.status(404).json({ errorMsg: 'Clique not found' })
      const isAlreadyMember = await CliquesMember.findOne({
        where: { user_id: user_id, clique_id: clique.id },
      })
      if (isAlreadyMember) {
        //check if isAlreadyeMember has a isDeleted of 0
        if (!isAlreadyMember.isDeleted) {
          return res.status(400).json({ errorMsg: 'You are already member of this clique' })
        }
      }
      const isAlreadyRequested = await CliqueRequest.findOne({
        where: { requestBy: user_id, clique_id: clique.id },
      })
      if (isAlreadyRequested) {
        //check if status is pending or not
        if (isAlreadyRequested.status === 'pending') {
          return res
            .status(400)
            .json({ errorMsg: 'You have already requested to join this clique' })
        }
      }
      if (clique.type === 'private') {
        try {
          await CliqueRequest.create({
            clique_id: clique.id,
            requestBy: user_id,
          })
          res.status(200).json({ successMsg: 'Sent a request' })
        } catch (e) {
          res.status(400).json({ errorMsg: 'Could not send a request', e })
        }
      } else {
        if (isAlreadyMember && isAlreadyMember.isDeleted) {
          await CliquesMember.update(
            { isDeleted: 0 },
            {
              where: {
                user_id: user_id,
                clique_id: clique.id,
              },
            }
          )
          return res.status(200).json({ successMsg: 'Joined Clique' })
        } else {
          await CliquesMember.create({
            user_id: user_id,
            clique_id: clique.id,
          })
          return res.status(200).json({ successMsg: 'Joined Clique' })
        }
      }
    } catch (err) {
      res.status(400).json({ data: { errorMsg: err.message } })
    }
  }
}
