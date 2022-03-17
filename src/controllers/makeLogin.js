export default function makeLogin({ User, generateToken, verifyPassword }) {
  return async function Login(req, res) {
    const { email, password } = req.body

    try {
      const user = await User.findOne({ where: { email: email } })
      if (!user) {
        return res.status(400).json({ errorMsg: 'invalid email or password' })
      }
      const givenPassword = password
      const dbHashPassword = user.passwordHash
      const isValidPassword = await verifyPassword({
        givenPassword,
        dbHashPassword,
      })

      if (isValidPassword) {
        const token = generateToken({ user })

        res
          .cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          })
          .status(200)
          .json({ user })
      } else {
        res.status(403).send('Invalid Password')
      }
    } catch (e) {
      res.status(400).send(e.message)
    }
  }
}
