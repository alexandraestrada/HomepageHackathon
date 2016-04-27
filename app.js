var express= require('express');
var app = express();
var path = require('path');

app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + '/index.html'))
});

app.route('/login')
	.get(function(req,res) {
		//login form goes here for user login
		res.send('login form goes here')
	})
	.post(function(req,res) {
		res.send('processing login for validation')
	})

app.listen(process.env.PORT || 5000)
console.log('magic port on 3000')