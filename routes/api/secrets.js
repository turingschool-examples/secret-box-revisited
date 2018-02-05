var express = require('express');
var router  = express.Router();
var Secret  = require('../../models/secret')

router.get('/:id', function(req, res, next) {
  var id = req.params.id

  console.log(id)
  Secret.find(id)
    .then(function(secret) {
      if(!secret) {
        return res.sendStatus(404)
      } else {
        res.json(secret)
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

  Secret.create(message)
    .then(function(secret) {
      res.status(201).json(secret)
    })
})

module.exports = router;
