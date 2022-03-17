export default function makeMarkAsRead({ UserNotification, sequelize }) {
  return async function markAsRead(req, res) {
    try {
      const { notification_id } = req.body
      if (!notification_id || !notification_id.length) {
        return res.status(400).json({
          error: 'notification_id is required and it must be an array',
        })
      }
      //find all notifications in notification_id array
      const notifications = await UserNotification.findAll({
        where: {
          id: {
            [sequelize.Op.in]: notification_id,
          },
          user_id: res.locals.user.id,
        },
      })
      //if no notifications found
      if (!notifications.length) {
        return res.status(400).json({
          error: 'no unread notifications found',
        })
      }
      //mark all notifications as read
      await UserNotification.update(
        {
          read: true,
        },
        {
          where: {
            id: {
              [sequelize.Op.in]: notification_id,
            },
            user_id: res.locals.user.id,
          },
        }
      )
      return res.status(200).json({
        message: 'notifications marked as read',
      })
    } catch (err) {
      return res.status(500).json({
        error: 'something went wrong',
      })
    }
  }
}
