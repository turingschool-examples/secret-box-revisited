var Secret  = require('../models/secret')

var show = function(req, res, next) {
  var id = req.params.id

  Secret.find(id)
    .then(function(secret) {
      if(!secret) {
        return res.sendStatus(404)
      } else {
        res.json(secret)
      }
    })
}

var create = function(req, res, next) {
  var message = req.body.message

  if(!message) {
    return res.status(422).send({
      error: "No message property provided"
    })
  }

  Secret.create(message)
    .then(function(secret) {
      res.status(201).json(secret)
    })
}

module.exports = { show, create }
