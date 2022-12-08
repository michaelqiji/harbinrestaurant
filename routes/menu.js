var express = require('express');
var nano = require('nano')('http://admin:admin@localhost:5984');
var router = express.Router();

/* GET home page. */
router.get('/image/:id', function(req, res, next) {
  var menudb = nano.db.use("menu");
  menudb.attachment.get(req.params.id, "IMAGE.JPG").pipe(res);
});

router.get('/getpots', function(req, res, next) {
  var menudb = nano.db.use("menu");
  menudb.view("pot", "pot", function(err, body){
  	res.send(body.rows);
  })
});

router.get('/getcolddish', function(req, res, next) {
  var menudb = nano.db.use("menu");
  menudb.view("colddish", "colddish", function(err, body){
  	res.send(body.rows);
  })
});

router.get('/getchefs', function(req, res, next) {
  var menudb = nano.db.use("menu");
  menudb.view("chef", "chef", function(err, body){
    res.send(body.rows);
  })
});

router.get('/getchuans', function(req, res, next) {
  var menudb = nano.db.use("menu");
  menudb.view("sichuan", "sichuan", function(err, body){
    res.send(body.rows);
  })
});

router.get('/getnortheasts', function(req, res, next) {
  var menudb = nano.db.use("menu");
  menudb.view("northeast", "northeast", function(err, body){
    res.send(body.rows);
  })
});

router.get('/gethomes', function(req, res, next) {
  var menudb = nano.db.use("menu");
  menudb.view("home", "home", function(err, body){
    res.send(body.rows);
  })
});

router.get('/gaifan', function(req, res, next) {
  var menudb = nano.db.use("menu");
  menudb.view("gaifan", "gaifan", function(err, body){
    res.send(body.rows);
  })
});

router.get('/chaofan', function(req, res, next) {
  var menudb = nano.db.use("menu");
  menudb.view("chaofan", "chaofan", function(err, body){
    res.send(body.rows);
  })
});

router.get('/combos', function(req, res, next) {
  var menudb = nano.db.use("menu");
  menudb.view("combo", "combo", function(err, body){
    res.send(body.rows);
  })
});

router.get('/zhushis', function(req, res, next) {
  var menudb = nano.db.use("menu");
  menudb.view("zhushi", "zhushi", function(err, body){
    res.send(body.rows);
  })
});

router.post('/insertdish', function(req, res, next) {
  console.log(req.body);
  var menudb = nano.db.use("menu");
  menudb.insert(req.body, function(err, body){
  	res.send(body);
  })

});

module.exports = router;