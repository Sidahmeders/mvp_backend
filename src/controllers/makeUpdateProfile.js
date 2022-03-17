export default function makeUpdateProfile({ User }) {
  return async function updateProfile(req, res) {
    //fetch user from res.locals
    const user = res.locals.user
    //fetch user from req.body
    const { firstName, lastName, email, gender } = req.body
    //update sequelize User model with new values
    //check if email already exists on db
    if (email) {
      const userExists = await User.findOne({ where: { email: email } })
      if (userExists) {
        if (userExists.id == user.id) {
          //update sequelize User model
          await User.update({ firstName, lastName, email, gender }, { where: { id: user.id } })
          //return updated user
          res.json({
            user: await User.findOne({ where: { id: user.id } }),
          })
        } else {
          res.status(403).json({
            error: 'Email already exists',
          })
        }
      } else {
        //update sequelize User model
        await User.update(
          { firstName, lastName, email, gender, isVerified: false },
          { where: { id: user.id } }
        )
        //return updated user
        res.json({
          user: await User.findOne({ where: { id: user.id } }),
        })
      }
    } else {
      //update user
      await User.update({ firstName, lastName, gender }, { where: { id: user.id } })
      //return updated user
      res.json({
        user: await User.findOne({ where: { id: user.id } }),
      })
    }
  }
}
