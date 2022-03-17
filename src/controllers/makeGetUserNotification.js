export default function makeGetNotification({ UserNotification }) {
  return async function GetNotification(req, res) {
    const user = res.locals.user
    const userId = user.id

    try {
      const notifications = await UserNotification.findAll({
        where: {
          user_id: userId,
          read: false,
        },
      })
      if (!notifications.length)
        return res.status(404).json({
          status: 404,
          error: 'No notifications found',
        })
      res.status(200).json({ count: notifications.length, notifications })
    } catch (err) {
      res.status(400).json({ errorMsg: err.message })
    }
  }
}
