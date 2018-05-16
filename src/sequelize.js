/* eslint-disable no-console */
const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const TodoModel = require('./models/todo')

const sequelize = new Sequelize('postgres', 'postgres', 'mysecretpassword', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

const User = UserModel(sequelize, Sequelize)
const Todo = TodoModel(sequelize, Sequelize)

Todo.belongsTo(User)
User.hasMany(Todo, { as: 'todos' })

// sequelize.sync().then(() => {
//  console.log(`Database & tables created!`)
// })

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`)
})

module.exports = {
  User,
  Todo,
}
