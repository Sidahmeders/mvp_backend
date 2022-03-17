export default function makeFetchProfile({ User }) {
  return async function FetchProfile(req, res) {
    const userID = res.locals.user.id
    try {
      const user = await User.findOne({ where: { id: userID } })
      if (!user) {
        return res.status(400).json({ errorMsg: 'user not found' })
      }
      return res.status(200).json({ user })
    } catch (err) {
      return res.status(400).json({ errorMsg: err.message })
    }
  }
}
