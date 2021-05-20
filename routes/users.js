var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/book/:id', function(req, res, next) {
  res.send(req.params.id);
});

router.get('/book/create', function(req, res, next) {
  res.send('create');
});



router.get('/cool', function(req, res) {
  res.send('you are so cool');
});

module.exports = router;
