import sequelize from '../sequelize.js'
import { Sequelize } from 'sequelize'

export default sequelize.define('clique_post', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  author_id: {
    type: Sequelize.STRING,
  },
  clique_id: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
  body: {
    type: Sequelize.STRING,
  },
  media_url: {
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
