import sequelize from '../sequelize.js'
import { Sequelize } from 'sequelize'

export default sequelize.define('clique', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
  clique_poster: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.generationsforpeace.org/wp-content/uploads/2018/07/empty.jpg',
  },
  author_id: {
    type: Sequelize.STRING,
  },
  moderator_id: {
    type: Sequelize.STRING,
  },
  subModerator_id: {
    type: Sequelize.STRING,
  },
  secretCode: {
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
