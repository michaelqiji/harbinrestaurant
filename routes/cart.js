var express = require('express');
var nano = require('nano')('http://admin:admin@localhost:5984');
var router = express.Router();
var twilio = require('twilio');
var accountSid = 'ACfc2f3b3a6f874ff7d52c5317aa06351f'; // Your Account SID from www.twilio.com/console
var authToken = 'e11ce46ef6177ed79376c24320ac4ae0';   // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);

router.post('/sendorder', function(req, res, next) {
  var ordersdb = nano.db.use("orders");
  console.log(req.body);
  ordersdb.insert(req.body, function(err, body){
  	if(!err){
  		res.send("success");
  		client.messages.create({
		    body: '有人在网上下单，快看 -> ' + JSON.stringify(req.body.orderInfo),
		    to: '6139798935',  // Text this number
		    from: '+16138016336' // From a valid Twilio number
		})
		.then((message) => console.log(message.sid));

  	} else {
  		res.send(err);
  	}
  });
});

module.exports = router;