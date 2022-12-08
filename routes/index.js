var express = require('express');
var router = express.Router();
var nano = require('nano')('http://admin:admin@localhost:5984');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sendmessage/contactpage', function(req, res){
  var messagedb = nano.db.use("message");
  messagedb.insert(req.body, function(err, body){
  	if(!err){
  		res.send("Send");
  	} else {
  		res.send(err)
  	}
  })
});

router.get('/message/getmessages', function(req, res){
  var messagedb = nano.db.use("message");
  messagedb.view("message", "message", function(err, body){
  	if(!err){
  		res.send(body.rows);
  	} else {
  		res.send(err)
  	}
  })
});

module.exports = router;
