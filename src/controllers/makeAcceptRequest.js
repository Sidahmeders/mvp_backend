export default function makeAcceptRequest({
  User,
  Clique,
  CliquesMember,
  CliqueRequest,
  notifyUsers,
}) {
  return async function AcceptRequest(req, res) {
    try {
      const { id, clique_id } = req.body
      const doc = await CliqueRequest.findOne({ where: { id: id, clique_id: clique_id } })
      if (!doc) {
        return res.status(404).json({ errorMsg: 'Request not found' })
      }
      if (doc.status === 'accepted') {
        return res.status(400).json({ errorMsg: 'User is already member of this clique' })
      }
      if (doc.status === 'rejected') {
        return res.status(400).json({
          errorMsg: 'This request is rejected please send another request',
        })
      }
      await CliqueRequest.update({ status: 'accepted' }, { where: { id: req.body.id } })
      const user = await User.findOne({ where: { id: doc.requestBy } })
      const clique = await Clique.findOne({ where: { id: doc.clique_id } })
      await CliquesMember.create({
        user_id: user.id,
        clique_id: clique.id,
      })
      res.status(200).json({
        successMsg: `Accepted the request from ${user.firstName}. Now he/she is officially a member of ${clique.title}`,
      })
      notifyUsers([
        {
          user_id: doc.requestBy,
          type: 'clique',
          text: `${clique.title} accepted you request. Now you are member of this clique`,
          reference: clique.id,
        },
      ])
    } catch (err) {
      res.status(400).json({ errorMsg: err.message })
    }
  }
}
