var express = require('express');
var nano = require('nano')('http://admin:admin@localhost:5984');
var router = express.Router();
var twilio = require('twilio');
var accountSid = 'ACfc2f3b3a6f874ff7d52c5317aa06351f'; // Your Account SID from www.twilio.com/console
var authToken = 'e11ce46ef6177ed79376c24320ac4ae0';   // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);

/* GET home page. */
router.get('/getorders', function(req, res, next) {
  var ordersdb = nano.db.use("orders");
  ordersdb.view("orders", "orders", function(err, body){
    if(!err){
      res.send(body.rows.reverse());
    } else {
      res.send("err");
    }
  });
});

router.post("/acceptandreply", function(req, res){
  var ordersdb = nano.db.use("orders");
  ordersdb.insert(req.body, function(err, body){
    if(!err){
      // res.send("done");
		client.messages.create({
		    body: 'Hello, your order from Harbin Chinese Restaurant is accepted, and will be ready in ' + req.body.readyInMinute + ' minutes.',
		    to: req.body.contact,  // Text this number
		    from: '+16138016336' // From a valid Twilio number
		})
		.then((message) => console.log(message.sid));
        res.send("done");

    } else {
       res.send(err)
    }
  });   
});

module.exports = router;