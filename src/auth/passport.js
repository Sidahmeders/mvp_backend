import User from '../database/models/user.js'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JWT_KEY } from '../../config/jwt.js'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_KEY,
}

//new Stratergy
new Strategy(options, async (payload, done) => {
  const _user = await User.findOne({ where: { id: payload.sub } })
  if (_user) {
    return done(null, _user)
  } else if (error) {
    return done(error, false)
  } else {
    return done(null, false)
  }
})
