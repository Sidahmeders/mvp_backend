import sequelize from '../sequelize.js'
import { Sequelize } from 'sequelize'

export default sequelize.define(
  'post_comments',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    post_id: {
      type: Sequelize.STRING,
    },
    author_id: {
      type: Sequelize.STRING,
    },
    text_comment: {
      type: Sequelize.STRING,
    },
    audio_url: {
      type: Sequelize.STRING,
    },
    is_audio: {
      type: Sequelize.TINYINT,
    },
    status: {
      type: Sequelize.ENUM('intact', 'updated', 'deleted'),
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
