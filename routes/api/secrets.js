var express = require('express');
var router = express.Router();
var pry    = require('pryjs')

router.get('/:id', function(req, res, next) {
  var id      = req.params.id

  req.app.locals.database.raw(
    'SELECT * FROM secrets WHERE id=?',
    [id]
  ).then((data) => {
    if(!data.rows) {
      return res.sendStatus(404)
    } else {
      res.json(data.rows)
    }
  })
})

router.post('/', function(req, res, next) {
  var message = req.body.message

  if(!message) {
    return res.status(422).send({
      error: "No message property provided"
    })
  }

  req.app.locals.database.raw(
    'INSERT INTO secrets(message, created_at) VALUES (?, ?) RETURNING *',
    [message, new Date]
  ).then((inserted) => {
      res.status(201).json(inserted.rows)
  })
})

module.exports = router;
