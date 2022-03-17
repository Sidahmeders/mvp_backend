import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../../config/jwt.js'

const generateToken = ({ user, expiry }) => {
  const expiresIn = expiry ? expiry : '30d'
  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_KEY,
    { expiresIn }
  )
  return token
}

const verifyToken = ({ token }) => {
  const decodedToken = jwt.verify(token, JWT_KEY)
  return decodedToken
}

export { generateToken, verifyToken }
