var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
  var id      = req.params.id
  var message = req.app.locals.secrets[id]

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

module.exports = router;
