export default function makeFetchRequests({ CliqueRequest }) {
  return async function FetchRequests(req, res) {
    const { clique_id } = req.body
    try {
      const requests = await CliqueRequest.findAll({
        where: {
          clique_id: clique_id,
          status: 'pending',
        },
      })
      if (!requests.length) {
        return res.status(203).json({ errorMsg: 'No pending requests' })
      }
      return res.status(200).json({ requests })
    } catch (e) {
      return res.status(500).json({ errorMsg: e.message })
    }
  }
}
