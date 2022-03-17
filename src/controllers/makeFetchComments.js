export default function makeFetchComments({ PostComments }) {
  return async function FetchComments(req, res) {
    const { post } = req.params
    try {
      const comments = await PostComments.findAll({
        where: {
          post_id: post,
        },
      })
      return res.status(200).json({ comments })
    } catch {
      return res.status(500).json({ errorMsg: 'Something went wrong' })
    }
  }
}
