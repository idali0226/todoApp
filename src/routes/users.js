const express = require('express')
const { User, Todo } = require('../sequelize')

const router = express.Router()

router
  .route('/')
  .get((req, res) => {
    User.findAll({
      include: [
        {
          model: Todo,
          as: 'todos',
        },
      ],
    }).then(users => res.json(users))
  })
  .post((req, res) => {
    User.create(req.body).then(user => res.json(user))
  })

router.route('/search').get((req, res) => {
  const { name } = req.query

  let query
  if (name) {
    query = User.findAll({
      include: [
        {
          model: Todo,
          as: 'todos',
        },
      ],
      where: { name },
    })

    query.then(users => res.json(users))
  }
})

router
  .route('/:id')
  .all((req, res, next) => {
    const { id } = req.params
    User.findById(id).then(usr => {
      req.user = usr
      next()
    })
  })
  .get((req, res) => {
    const { user } = req.user
    if (!user) {
      res.sendStatus(404)
    } else {
      res.status(200).json(user)
    }
  })

module.exports = router
