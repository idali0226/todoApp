const express = require('express')

const app = express()

const routes = require('./src/routes/todos')

app.use('/todos', routes)

app.listen(8000)
