import sequelize from '../sequelize.js'
import { Sequelize } from 'sequelize'

export default sequelize.define(
  'clique_request',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    clique_id: {
      type: Sequelize.STRING,
    },
    requestBy: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM('accepted', 'rejected', 'pending'),
    },
    createdAt: {
      type: Sequelize.DOUBLE,
    },
    updatedAt: {
      type: Sequelize.DOUBLE,
    },
  },
  {
    timestamps: false,
  }
)
