var express= require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
// var port = process.env.PORT || 5000;
var User = require('./models/user.js');
var config = require('./config.js')



// ------APP Configs-----------

//bodyparser for POST requests

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//log requests to console

app.use(morgan('dev'))


// ---------MONGO configs----------

  // var uristring =
  //   process.env.MONGOLAB_URI ||
  //   process.env.MONGOHQ_URL ||
  //   'mongodb://localhost/HelloMongoose';

  //   mongoose.connect(uristring, function (err, res) {
  //     if (err) {
  //     console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  //     } else {
  //     console.log ('Succeeded connected to: ' + uristring);
  //     }
  //   });
mongoose.connect(config.mongoLabURI);




//-------Routes ---------------



app.get('/', function(req,res) {
	// res.sendFile(path.join(__dirname + '/index.html'))
  res.send('test test')
});

app.route('/users')
    .post(function(req,res) {
        var user = new User();

        user.name = req.body.name;
        user.racID = req.body.racID;
        user.password = req.body.password;

        user.save(function(err) {
          if (err) {
            if (err.code === 11000) {
              return res.json({success:false, message:'A user with that racID already exists'})
            }
            else {
              return  res.send(err)
            }
          }
          res.json({message: 'User Created!'})
        })
    })
    .get(function(req,res) {
      User.find(function(err, users) {
        if(err) res.send(err)
         res.json(users)
      })
    })

// app.route('/login')
// 	.get(function(req,res) {
// 		//login form goes here for user login
// 		res.send('login form goes here')
// 	})
// 	.post(function(req,res) {
// 		res.send('processing login for validation')
// 	})



//------Start Server---------


app.listen(config.port)
console.log('magic port on' + config.port)