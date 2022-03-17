export default function makeChangePassword({ User, verifyPassword, hashPassword }) {
  return async function ChangePassword(req, res) {
    const { oldPassword, newPassword, newPassword2 } = req.body
    const userID = res.locals.user.id
    if (!oldPassword || !newPassword || !newPassword2) {
      return res.status(400).json({ errorMsg: 'please provide all the fields' })
    }
    if (newPassword !== newPassword2) {
      return res.status(400).json({ errorMsg: 'passwords did not match' })
    }
    try {
      const user = await User.findOne({ where: { id: userID } })
      const givenPassword = oldPassword
      const dbHashPassword = user.passwordHash
      const isValidPassword = await verifyPassword({
        givenPassword,
        dbHashPassword,
      })
      if (isValidPassword) {
        const passwordHash = await hashPassword({ password: newPassword })
        await User.update({ passwordHash: passwordHash }, { where: { id: userID } })
        return res.status(200).json({ successMsg: 'password has been changed successfully' })
      } else {
        return res.status(400).json({ errorMsg: 'invalid password' })
      }
    } catch (err) {
      return res.status(400).json({ errorMsg: err.message })
    }
  }
}
