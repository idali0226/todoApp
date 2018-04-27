const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const todos = require('./src/routes/todos')
const users = require('./src/routes/users')

app.use('/todos', todos)
app.use('/users', users)

app.listen(8000)
