import sequelize from '../sequelize.js'
import { Sequelize } from 'sequelize'

export default sequelize.define('post_reaction', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  post_id: {
    type: Sequelize.STRING,
  },
  user_id: {
    type: Sequelize.STRING,
  },
  action: {
    type: Sequelize.ENUM('liked', 'disliked', 'shared', 'saved'),
  },
  createdAt: {
    type: Sequelize.DOUBLE,
  },
  updatedAt: {
    type: Sequelize.DOUBLE,
  },
})
