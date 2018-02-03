var express = require('express');
var router  = express.Router();
var pry     = require('pryjs')
var environment   = process.env.NODE_ENV || 'development'
var configuration = require('../../knexfile')[environment]
var database      = require('knex')(configuration)

router.get('/:id', function(req, res, next) {
  var id = req.params.id

  database.raw(
    'SELECT * FROM secrets WHERE id=?',
    [id]
  ).then(function(secret) {
    if(!secret.rows) {
      return res.sendStatus(404)
    } else {
      res.json(secret.rows)
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

  database.raw(
    'INSERT INTO secrets(message, created_at) VALUES (?, ?) RETURNING *',
    [message, new Date]
  ).then(function(secret) {
      res.status(201).json(secret.rows)
  })
})

module.exports = router;
