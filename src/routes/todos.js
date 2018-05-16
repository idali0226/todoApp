const express = require('express')
const { Todo } = require('../sequelize')

const router = express.Router()

router
  .route('/')
  .get((req, res) => {
    Todo.findAll().then(todos => res.json(todos))
  })
  .post((req, res) => {
    Todo.create(req.body).then(todo => res.json(todo))
  })

router.route('/search').get((req, res) => {
  const { status, userId } = req.query

  let where = {}
  if (status) {
    where = { status }
  }
  if (userId) {
    where = { ...where, userId }
  }

  Todo.findAll({
    where,
  }).then(todos => res.json(todos))
})

router
  .route('/:id')
  .all((req, res, next) => {
    const { id } = req.params
    Todo.findById(id).then(todoItem => {
      req.item = todoItem
      next()
    })
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
      todoItem.destroy()
      res.status(200).json(todoItem)
    }
  })
  .put((req, res) => {
    const { name, description, status } = req.body

    const todoItem = req.item
    if (!todoItem) {
      res.sendStatus(404)
    } else {
      const newData = {
        name,
        description,
        status,
      }

      todoItem
        .update(newData, {
          returning: true,
        })
        .then(updatedTodo => {
          res.status(200).json(updatedTodo)
        })
    }
  })
  .patch((req, res) => {
    const { status } = req.body
    const todoItem = req.item
    if (!todoItem) {
      res.sendStatus(404)
    } else {
      const updateObj = {
        status,
      }
      todoItem
        .update(updateObj, {
          returning: true,
        })
        .then(updatedTodo => {
          res.status(200).json(updatedTodo)
        })
    }
  })

module.exports = router
