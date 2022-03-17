export default function makeForgetPassword({
  User,
  generateToken,
  sendEmails,
  FormTypes,
  webDomain,
}) {
  return async function ForgetPassword(req, res) {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ errorMsg: 'Please Enter your Email' })
    }

    try {
      const user = await User.findOne({ where: { email: email } })

      if (!user) {
        return res.status(400).json({ errorMsg: 'this Email does not Exist' })
      }

      const expiry = '1000s' // 16-min
      const token = generateToken({ user, expiry })
      const directUrl = `${webDomain}/reset-password?token=${token}`

      await sendEmails({
        recipients: email,
        subject: 'reeset password request',
        directUrl,
        formType: FormTypes.reset,
      })
      res.status(202).json({
        successMsg: 'please check your email, you will find a reset link',
      })
    } catch (err) {
      res.status(400).json({ errorMsg: err.message })
    }
  }
}
