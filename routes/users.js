var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var locals = {title: "User Show", name: "George", age: 44, hobbies: "Skydiving"}
  res.render('users/show', locals);
});

module.exports = router;
