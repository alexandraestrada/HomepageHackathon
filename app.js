var express= require('express');
var http= require('http');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
// var port = process.env.PORT || 5000;
var test = require('./models/test.js');
var templateView = require('./models/template.js').templateView;

var User = require('./models/user.js');
var path = require('path');
var config = require('./config');
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var methodOverride = require('method-override');
console.log(templateView)
formidable = require('formidable'),
   util = require('util'),
   fs   = require('fs-extra'),
   http  = require('http'),
   jwt = require('jsonwebtoken')
   // superSecret = 'ilovescotchscotchyscotchscotch'

// var fs = require('fs');

// test.saveItem()

// ------APP Configs-----------

//bodyparser for POST requests
// app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view-engine', 'ejs')



app.use(morgan('dev'))




// mongoose.connect(config.database);
// app.set('superSecret', config.secret)





//-------Routes ---------------


//------User Routes---------

// app.get('/setup', function(req,res) {
//   var carmen = new User({
//     racID: 'm88',
//     password: 'password',
//     admin:true
//   })

//   carmen.save(function(err) {
//     if(err) throw err;
//     console.log('user saved successss');
//     res.json({succes: true})
//   })
// })

// app.get('/login',function(req,res) {
//  res.sendFile(path.join(__dirname + '/pages/login.html'))

// } )
// app.post('/authenticate', function(req,res) {
//   User.findOne({racID: req.body.racID})
//   console.log(req.body.racID)
// })

// app.post('/authenticate', function(req,res) {
//   User.findOne({
//     racID: req.body.racID
//   }, function(err,user) {
//     if (err) throw err;
//     if(!user) {
//       res.json({success:false, message: "Authenication failed b/c user does not exist"})
//     }
//     else if(user) {
//       if(user.password != req.body.password) {
//         res.json({success:false, message: "Auth failed! wrong password"})
//       }
//       else {
//         var token = jwt.sign(user, app.get(superSecret), {
//           expiresInMinutes:1440
//         })
//         res.json({
//           success:true,
//           message: "enjoy your token",
//           token: token
//         })
//       }
//     }
//   })
// })

// })

//-------- HP Route -------

app.get('/', function(req,res) {
  res.render('login.ejs', {
    greeting: "Hello there"
  })
})

app.get('/templates', function(req,res) {
  res.render('templates.ejs')
})

app.get('/template', function(req,res) {
  res.render('template.ejs')
})
app.get('/preview', function(req,res,data) {
  res.render('preview.ejs')
})





app.get('/practice', function(req,res) {
  res.render('practice.ejs')
})

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



// TODO handle this route
app.get('/template/new', function(req, res, next) {
  res.send()
});


// Upload
app.post('/uploadhtml', function(req, res, next) {
  console.log(req.body);
  fs.writeFile('test.html', req.body.html, function(err) {
    if (err) return console.log(err);
    console.log("wrote text to file");
    console.log(req.body.html);
  });
  // TODO
  // Before sending response, make sure the final export file is ready from server.
  // Otherwise, client can immediately request for the file before its ready to be served.
  res.send('uploaded');
});

app.get('/download', function(req, res, next) {
  res.attachment('./test.html');  
  res.sendFile(path.join(__dirname + '/test.html'));
});

// app.route('/users')
//     .post(function(req,res) {
//         var user = new User();


//------Start Server---------


app.listen(config.port)
console.log('magic port on' + config.port)
