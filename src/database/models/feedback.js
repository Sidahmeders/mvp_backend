import sequelize from '../sequelize.js'
import { Sequelize } from 'sequelize'

export default sequelize.define('feedback', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: Sequelize.STRING,
  },
  img: {
    type: Sequelize.STRING,
  },
  user: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DOUBLE,
  },
  updatedAt: {
    type: Sequelize.DOUBLE,
  },
})
