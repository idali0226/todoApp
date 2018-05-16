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

  let query
  if (status && userId) {
    query = Todo.findAll({
      where: {
        status,
        userId,
      },
    })
  } else if (status) {
    query = Todo.findAll({
      where: {
        status,
      },
    })
  } else {
    query = Todo.findAll({
      where: {
        userId,
      },
    })
  }

  query.then(todos => res.json(todos))
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
      res.sendStatus(200)
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
        .updateAttributes(updateObj, {
          returning: true,
        })
        .then(updatedTodo => {
          res.status(200).json(updatedTodo)
        })
    }
  })

module.exports = router
