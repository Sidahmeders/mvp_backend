export default function makeFeedback({ Feedback, User }) {
  return async function PostFeedback(req, res) {
    const { text } = req.body
    const img = res.locals.fileURL
    const userID = res.locals.user.id
    if (!text) {
      return res.status(400).json({ errorMsg: 'please provide all the fields' })
    }
    try {
      const user = await User.findOne({ where: { id: userID } })
      if (!user) {
        return res.status(400).json({ errorMsg: 'user not found' })
      }
      await Feedback.create({
        text: text,
        img: img,
        user: userID,
      })
      return res.status(200).json({ successMsg: 'feedback has been posted successfully' })
    } catch (err) {
      return res.status(400).json({ errorMsg: err.message })
    }
  }
}
