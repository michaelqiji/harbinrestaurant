var express = require('express');
var nano = require('nano')('http://localhost:5984');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/insertdish', function(req, res, next) {
  console.log(req.body);

});

module.exports = router;
