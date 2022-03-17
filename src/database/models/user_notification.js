import sequelize from '../sequelize.js'
import { Sequelize } from 'sequelize'

export default sequelize.define('user_notifications', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.ENUM('clique', 'post', 'rank', 'prediction'),
  },
  text: {
    type: Sequelize.STRING,
  },
  read: {
    type: Sequelize.TINYINT,
  },
  reference: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.TINYINT,
  },
  createdAt: {
    type: Sequelize.DOUBLE,
  },
  updatedAt: {
    type: Sequelize.DOUBLE,
  },
})
