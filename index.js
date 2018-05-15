const express = require('express')

const app = express()

const todos = require('./src/routes/todos')
const users = require('./src/routes/users')

app.use('/todos', todos)
app.use('/users', users)

app.listen(8000)
