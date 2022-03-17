import bcrypt from 'bcryptjs'

const verifyPassword = async ({ givenPassword, dbHashPassword }) => {
  const isMatch = await bcrypt.compare(givenPassword, dbHashPassword)
  return isMatch
}

const hashPassword = async ({ password }) => {
  let salt = await bcrypt.genSalt(10)
  let hash = await bcrypt.hash(password, salt)

  return hash
}

export { hashPassword, verifyPassword }
