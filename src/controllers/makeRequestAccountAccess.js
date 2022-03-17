export default function makeRequestAccountAccess({
  User,
  generateToken,
  sendEmails,
  FormTypes,
  webDomain,
}) {
  return async function RequestAccountAccess(req, res) {
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

      const directUrl = `${webDomain}/api/accounts/verify/${token}`

      await sendEmails({
        recipients: email,
        subject: 'verify my account',
        directUrl,
        formType: FormTypes.verify,
      })
      res.end()
    } catch (err) {
      res.status(400).json({ errorMsg: err.message })
    }
  }
}
