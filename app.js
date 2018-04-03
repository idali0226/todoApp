const express = require('express')  
const app = express()
 
const routes = require('./routes/todos');
   
app.use('/todos', routes) 
//app.use('/todos/:id', routes) 
//app.use('/todos/search', routes) 
 
app.listen(8000)