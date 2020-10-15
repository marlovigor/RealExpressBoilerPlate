const express = require('express')
const cartServices = require('../cartServices')
// const xss = require('xss')
const cartRouter = express.Router()
const jsonParser = express.json()


cartRouter
  .route('/')
  .get((req, res, next) => {
    cartServices.getNotes(
      req.app.get('db')
    )
      .then(carts => {
        res.json(carts)
      })
      .catch(next)

  })
  .post(jsonParser, (req, res, next) => {
    const { userid, itemid } = req.body
    const newItem = { userid, itemid }

    for (const [key, value] of Object.entries(newItem)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
         if (!itemid) {
             return res.status(400).json({
               error: { message: `Missing 'itemid' in request body` }
             })
           }
    }
    cartServices.insertItem(
      req.app.get('db'),
      newItem
    )
      .then(article => {
        res
          .status(201)
          .json(article)
      })
      .catch(next)

  })
  cartRouter
  .route('/:itemid')
   .delete((req, res, next) => {
    cartServices.deleteCartitem(
      req.app.get('db'),
      req.params.itemid
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })


cartRouter
  .route('/:userid')
  .all((req, res, next) => {
    cartServices.getById(
      req.app.get('db'),
      req.params.userid
    )
      .then(id => {
        if (!id) {
          return res.status(404).json({
            error: { message: `id doesn't exist` }
          })
        }
        res.id = id // save the id for the next middleware
        next() // don't forget to call next so the next middleware happens!
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json({
      items: res.id,
      // items: res.itemcount
      // name: (res.id.name),
      //   title: xss(res.id.title), // sanitize title
    })
  })
  // .delete((req, res, next) => {
  //   cartServices.deleteCartitem(
  //     req.app.get('db'),
  //     req.params.itemid
  //   )
  //     .then(() => {
  //       res.status(204).end()
  //     })
  //     .catch(next)
  // })

//         .patch(jsonParser, (req, res, next) => {
//             const { name, content,} = req.body
//             const notesToUpdate = { name, content,}

//             const numberOfValues = Object.values(notesToUpdate).filter(Boolean).length
//             if (numberOfValues === 0)
//               return res.status(400).json({
//                 error: {
//                   message: `Request body must content either 'name','content'`
//                 }
//               })

//               NoteService.updatecart(
//               req.app.get('db'),
//               req.params.note_id,
//               notesToUpdate
//             )
//               .then(numRowsAffected => {
//                 res.status(204).end()
//               })
//               .catch(next)
//           })


module.exports = cartRouter