var express = require('express');
var router  = express.Router();
var secretsController = require('../../controllers/secretsController')

router.post('/', secretsController.create)
router.get('/:id', secretsController.show)

module.exports = router;
