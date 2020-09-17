const express = require('express')
const UserService = require('./UserServices')
// const xss = require('xss')
const UserRouter = express.Router()
const jsonParser = express.json()


UserRouter
.route('/:name')
  .all((req, res, next) => {
    UserService.getByname(
      req.app.get('db'),
      req.params.name
    )
      .then(name => {
        if (!name) {
          return res.status(404).json({
            error: { message: `name doesn't exist` }
          })
        }
        res.name = name // save the article for the next middleware
        next() // don't forget to call next so the next middleware happens!
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json({
      user: res.name,
    //   name: res.name,
    //   title: xss(res.article.title), // sanitize title
    })
  })

module.exports = UserRouter