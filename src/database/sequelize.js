import { Sequelize } from 'sequelize'
import { HOST, USER, PASSWORD, DATABASE } from '../config/database.js'

const sequelize = new Sequelize({
  host: HOST,
  database: DATABASE,
  username: USER,
  password: PASSWORD,
  dialect: 'mysql',
  logging: false,
})

async function init() {
  try {
    await sequelize.authenticate()
    console.log('database connection has been established successfully...')
  } catch (err) {
    console.error('Unable to connect to the database:', err)
  }
}

init()

export default sequelize
