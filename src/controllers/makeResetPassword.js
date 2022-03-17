export default function make({ User, verifyToken, hashPassword }) {
  return async function ResetPassword(req, res) {
    const { token } = req.params
    const { password, password2 } = req.body

    if (!token) {
      return res.status(400).json({ errorMsg: 'token is null or undefined' })
    }
    if (!password || !password2) {
      return res.status(400).render('reset-password', {
        errorMsg: 'please provide the new password and confirm',
      })
    }

    if (password !== password2) {
      return res.status(400).render('reset-password', {
        errorMsg: 'passwords did not match',
      })
    }

    try {
      const payload = verifyToken({ token })
      const userID = payload.id
      const passwordHash = await hashPassword({ password })

      await User.update(
        { passwordHash: passwordHash },
        {
          where: { id: userID },
        }
      )

      res.status(200).render('reset-password', {
        successMsg: 'password has been changed successfully',
      })
    } catch (err) {
      res.status(400).render('reset-password', {
        errorMsg: err.message,
      })
    }
  }
}
