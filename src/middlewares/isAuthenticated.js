import { verifyToken } from '../utils/lib/jwt.js'
import User from '../database/models/user.js'

export default async function isAuthenticated(req, res, next) {
  const token = req.header('authToken') || req.cookies['authToken']
  // check if the user provided a token or not
  if (!token) {
    res.status(401).json({ errorMsg: 'Please Login Or Register to get full access' })
    return
  }
  try {
    const decodedToken = verifyToken({ token })
    const userID = decodedToken.id
    const user = await User.findOne({ where: { id: userID } })

    res.locals.decodedToken = decodedToken
    res.locals.user = user

    next()
  } catch (err) {
    res.status(401).json({ errorMsg: err.message })
  }
}
