const express = require('express')
const bodyParser = require('body-parser')
const { User } = require('../sequelize')

const router = express.Router()
const jsonParser = bodyParser.json()

router
  .route('/')
  .get((req, res) => {
    console.log('get users')
    User.findAll().then(users => res.json(users))
  })
  .post(jsonParser, (req, res) => {
    const body = req.body

    User.create(body).then(user => res.json(user))
  })

module.exports = router
