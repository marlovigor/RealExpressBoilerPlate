const express = require('express')
const itemServices = require('../itemServices')
// const xss = require('xss')
const itemsRouter = express.Router()
const jsonParser = express.json()



itemsRouter
  .route('/')
  .get((req, res, next) => {
    itemServices.getAllItems(
      req.app.get('db')
    )
      .then(items => {
        res.json(items)
      })
      .catch(next)
      
  })
  // .patch(jsonParser, (req, res, next) => {
  //   const { numberofitems } = req.body
  //   const notesToUpdate = { numberofitems}

  //   const numberOfValues = Object.values(notesToUpdate).filter(Boolean).length
  //   if (numberOfValues === 0)
  //     return res.status(400).json({
  //       error: {
  //         message: `Request body must content either 'name','content'`
  //       }
  //     })

  //     NoteService.updateArticle(
  //     req.app.get('db'),
  //     req.params.item.id,
  //     notesToUpdate
  //   )
  //     .then(numRowsAffected => {
  //       res.status(204).end()
  //     })
  //     .catch(next)
  // })

itemsRouter
  .route('/:id')
  .all((req, res, next) => {
    itemServices.getById(
      req.app.get('db'),
      req.params.id
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
      item: res.id,
      // name: (res.id.name),
    //   title: xss(res.id.title), // sanitize title
    })
  })
   .patch(jsonParser, (req, res, next) => {
    const { numberofitems } = req.body
    const notesToUpdate = { numberofitems }

    const numberOfValues = Object.values(notesToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must content either 'name','content'`
        }
      })

      itemServices.updateArticle(
      req.app.get('db'),
      req.params.id,
      notesToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  // .delete((req, res, next) => {
  //   idsService.deleteid(
  //     req.app.get('db'),
  //     req.params.id_id
  //   )
  //     .then(() => {
  //       res.status(204).end()
  //     })
  //     .catch(next)
  // })
 

module.exports = itemsRouter