var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res) {
	res.render('index', {title: 'Hello World!', value: 'hello'});
});

// Get Userlist page
router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{}, function(e, docs) {
		res.render('userlist', {
			"userlist" : docs
		});
	});
});

// New user
router.get('/newuser', function(req, res) {
	res.render('newuser', {title:"New User"});
});

/* Post to add user service */
router.post('/adduser', function(req, res) {
	//Set our db variable
	var db = req.db;

	// Get our form value. These rely on name attributes
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	// Set our collection
	var collection = db.get('usercollection');

	//Submit to the DB
	collection.insert({
		"username": userName,
		"email": userEmail
	}, function (err, doc) {
		if(err) {
			// If failed, then return error
			res.send("There was a problem adding the ingormation to the database.");
		}
		else {
			// If it worked, set the header so the address bar
			// It shouldn't still say /adduser
			res.location("userlist");
			// And forward to success page
			res.redirect("userlist");
		}
	});
});

module.exports = router;
