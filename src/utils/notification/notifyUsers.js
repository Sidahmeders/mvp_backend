import UserNotification from '../../database/models/user_notification.js'

export default async function notifyUsers(notifications) {
  try {
    await notifications.map(async (notification) => {
      const { user_id, text, type, reference } = notification
      await UserNotification.create({
        user_id: user_id,
        text: text,
        type: type,
        reference: reference,
      })
    })
  } catch (e) {
    return e.message
  }
}
