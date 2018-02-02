var express = require('express');
var router = express.Router();
var pry    = require('pryjs')

router.get('/:id', function(req, res, next) {
  var id      = req.params.id
  var message = showSecret(req, id)

  if(!message) { return res.sendStatus(404) }

  res.json({id, message})
})

router.post('/', function(req, res, next) {
  req.app.locals.current_id += 1

  var id      = req.app.locals.current_id
  var message = req.body.message

  if(!message) {
    return res.status(422).send({
      error: "No message property provided"
    })
  }

  req.app.locals.secrets[id] = message

  res.status(201).json({id, message})
})

function createSecret(req, message) {
  req.app.locals.database.raw(
    'INSERT INTO secrets(message, created_at) VALUES (?, ?)',
    [message, new Date]
  )
  .then(() => {
    return req.app.locals.database.raw('SELECT * FROM secrets')
  })
}

function showSecret(req, id) {
  return req.app.locals.database.raw(
    'SELECT * FROM secrets WHERE id=?',
    [id]
  ).then((data) => {
    eval(pry.it)
    return data.rows
  })
}

module.exports = router;

