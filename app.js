var express= require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
// var port = process.env.PORT || 5000;
var test = require('./models/test.js');
var User = require('./models/user.js');
var path = require('path');
var config = require('./config.js');
formidable = require('formidable'),
   util = require('util'),
   fs   = require('fs-extra'),
   http  = require('http');

// test.saveItem()

// ------APP Configs-----------

//bodyparser for POST requests

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//log requests to console

app.use(morgan('dev'))


// ---------MONGO configs----------

  var uristring =
    config.mongoLabURI ||
    config.mongoLocal;

    mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });




//-------Routes ---------------

var userRouter = express.Router();

// userRouter.get('/', function(req,res) {
//   res.json('homepage of app')
// })

userRouter.route('/')
  .get(function(req,res) {
    res.json('homepage of the app')
  })
  .post(function(req,res) {
    var user = new User();
    user.racID = req.body.racID;
    user.password = req.body.password;

    user.save(function(err) {
      if(err) {
        if(err.code ==11000)
          return res.json({success:false, message:'a user like that already exists'});
        else
          return res.send(err)
      }
    })
  })

app.use('/users', userRouter)


app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + '/pages/login.html'))


});




// static route
// - This should be for static resources, like js/css/html files
app.use(express.static('assets'));


//  template routes
app.get('/template', function(req, res, next) {
  var options = {
    root: __dirname + '/pages/',
  };

  res.sendFile('template.html', options, function(err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', 'template.html');
    }
  });
});

app.get('/imageupload', function(req,res) {
  res.sendFile(path.join(__dirname + '/pages/imageupload.html'))
})

app.get('/workarea', function(req,res) {
  res.sendFile(path.join(__dirname + '/pages/workarea.html'))
})
app.get('/imageview', function(req,res) {
  res.sendFile(path.join(__dirname + '/pages/imageview.html'))
})

app.post('/upload', function (req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
  });

  form.on('end', function(fields, files) {
    /* Temporary location of our uploaded file */
    var temp_path = this.openedFiles[0].path;
    /* The file name of the uploaded file */
    var file_name = this.openedFiles[0].name;
    /* Location where we want to copy the uploaded file */
    var new_location = './assets/images/uploads/';

    fs.copy(temp_path, new_location + file_name, function(err) {
      if (err) {
        console.error(err);
      } 
      else {

        console.log("success!")

      }
    });

  });
  
});

// app.get('/uploads/fullsize/:file', function (req, res){
//   file = req.params.file;
//   var img = fs.readFileSync(__dirname + "/uploads/fullsize/" + file);
//   res.writeHead(200, {'Content-Type': 'image/jpg' });
//   res.end(img, 'binary');
// });


// TODO handle this route
app.get('/template/new', function(req, res, next) {
  res.send()
});


// app.route('/users')
//     .post(function(req,res) {
//         var user = new User();

//         user.name = req.body.name;
//         user.racID = req.body.racID;
//         user.password = req.body.password;

//         user.save(function(err) {
//           if (err) {
//             if (err.code === 11000) {
//               return res.json({success:false, message:'A user with that racID already exists'})
//             }
//             else {
//               return  res.send(err)
//             }
//           }
//           res.json({message: 'User Created!'})
//         })
//     })
//     .get(function(req,res) {
//       User.find(function(err, users) {
//         if(err) res.send(err)
//          res.json(users)
//       })
//     })

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
