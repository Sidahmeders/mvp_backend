export default function makeRegister({ User, generateToken, hashPassword }) {
  return async function Register(req, res) {
    const { firstName, lastName, email, password, mobile } = req.body

    try {
      const passwordHash = await hashPassword({ password })
      const user = await User.create({
        firstName,
        lastName,
        email,
        mobile,
        passwordHash,
      })
      const token = generateToken({ user })
      if (!token)
        res.status(203).json({
          errorMsg:
            'User has been created but login is not successfull. Please try to login with your new account',
        })
      res
        .cookie('authToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .status(200)
        .json({ user })
    } catch (err) {
      switch (err.parent.code) {
        case 'ER_DUP_ENTRY':
          res.status(400).json({ errorMsg: 'User Already Exists. Please login' })
          break
        default:
          res.status(400).json({ errorMsg: err.message })
          break
      }
    }
  }
}
