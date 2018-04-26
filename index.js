const express = require('express')
const bodyParser = require('body-parser')
const { User, Todo } = require('./src/sequelize')

const app = express()
app.use(bodyParser.json())

const routes = require('./src/routes/todos')

app.use('/todos', routes)

app.listen(8000)
