export default function makeRejectRequest({ Clique, CliqueRequest, notifyUsers }) {
  return async function RejectRequest(req, res) {
    try {
      const doc = await CliqueRequest.findOne({ where: { id: req.body.id } })
      if (doc.status === 'rejected') {
        return res.status(400).json({ errorMsg: 'This request is already rejected' })
      }
      if (doc.status === 'accepted') {
        return res.status(400).json({
          errorMsg: 'This request is already accepted',
        })
      }
      await CliqueRequest.update({ status: 'rejected' }, { where: { id: req.body.id } })
      const clique = await Clique.findOne({ where: { id: doc.clique_id } })
      notifyUsers([
        {
          user_id: doc.requestBy,
          type: 'clique',
          text: `Your request to ${clique.title} has been rejected`,
          reference: clique.id,
        },
      ])
      res.status(200).json({
        successMsg: `Rejected the request.`,
      })
    } catch (err) {
      res.status(400).json({ errorMsg: err.message })
    }
  }
}
