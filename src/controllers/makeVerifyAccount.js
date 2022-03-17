let usedVerifyAccountsTokens = {}

export default function makeVerifyAccount({ User, verifyToken }) {
  return async function VerifyAccount(req, res) {
    const { token } = req.params

    if (!token) {
      return res.status(400).json({ errorMsg: 'token is null or undefined' })
    }

    // restric the user to use the verify token only once in period
    if (token in usedVerifyAccountsTokens) {
      return res.status(400).end()
    }

    try {
      const payload = verifyToken({ token })
      const userID = payload.id

      await User.update(
        { isVerified: 1 },
        {
          where: { id: userID },
        }
      )

      // set the token as true, to reject excessive request
      usedVerifyAccountsTokens[token] = true
      const latency = 1000 * 60 * 60 // 1000 = 1s * 60 = 1m * 60 = 60min

      // clear all the saved tokens from memory(RAM)
      setTimeout(() => {
        usedVerifyAccountsTokens = {}
      }, latency)

      res.render('verified')
    } catch (err) {
      res.status(400).json({ errorMsg: err.message })
    }
  }
}
