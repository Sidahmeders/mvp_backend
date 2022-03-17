import sequelize from '../sequelize.js'
import { Sequelize } from 'sequelize'

export default sequelize.define(
  'clique_members',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.STRING,
    },
    clique_id: {
      type: Sequelize.STRING,
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
    },
    join_date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
  }
)
