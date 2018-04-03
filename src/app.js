const express = require('express')

const app = express()

const routes = require('./routes/todos')

app.use('/todos', routes)

app.listen(8000)
