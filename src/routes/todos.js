const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()
const jsonParser = bodyParser.json()

const inMemoryTodos = [
  { id: 0, name: 'Task 1', description: 'Read a book', status: 'Done' },
  { id: 1, name: 'Task 2', description: 'Watch a movie', status: 'Done' },
  { id: 2, name: 'Task 3', description: 'Eat pizza', status: 'New' },
  { id: 3, name: 'Task 4', description: 'Buy milk', status: 'New' },
  { id: 4, name: 'Task 5', description: 'Hot yoga', status: 'New' },
]

router
  .route('/')
  .get((req, res) => {
    res.status(200).json(inMemoryTodos)
  })
  .post(jsonParser, (req, res) => {
    const { name, description, status } = req.body
    const lastId = inMemoryTodos[inMemoryTodos.length - 1].id
    const id = lastId + 1
    const newTodo = { id, name, description, status }
    inMemoryTodos.push(newTodo)

    res
      .status(201)
      .location(`/todos/${id}`)
      .json(newTodo)
  })

router.route('/search').get((req, res) => {
  const { status } = req.query
  if (status) {
    res
      .status(200)
      .json(
        inMemoryTodos.filter(
          todo => todo.status.toLowerCase() === status.toLowerCase()
        )
      )
  } else {
    res.status(200).json(inMemoryTodos)
  }
})

router
  .route('/:id')
  .all((req, res, next) => {
    const { id } = req.params
    const todoItem = inMemoryTodos.find(todo => `${todo.id}` === id)
    req.item = todoItem
    next()
  })
  .get((req, res) => {
    const todoItem = req.item
    if (!todoItem) {
      res.sendStatus(404)
    } else {
      res.status(200).json(todoItem)
    }
  })
  .delete((req, res) => {
    const todoItem = req.item
    if (!todoItem) {
      res.sendStatus(404)
    } else {
      const index = inMemoryTodos.indexOf(todoItem)
      inMemoryTodos.splice(index, 1)
      res.sendStatus(200)
    }
  })
  .put(jsonParser, (req, res) => {
    const { name, description, status } = req.body
    const todoItem = req.item
    if (!todoItem) {
      res.sendStatus(404)
    } else {
      todoItem.name = name
      todoItem.description = description
      todoItem.status = status
    }
    res.status(200).json(todoItem)
  })
  .patch(jsonParser, (req, res) => {
    const { status } = req.body
    const todoItem = req.item
    if (!todoItem) {
      res.sendStatus(404)
    } else {
      todoItem.status = status
    }
    res.status(200).json(todoItem)
  })

module.exports = router
