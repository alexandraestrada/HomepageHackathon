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
var http = require('http');
var fsnative = require('fs');


var methodOverride = require('method-override');
console.log(templateView)
formidable = require('formidable'),
   util = require('util'),
   fs   = require('fs-extra'),
   jwt = require('jsonwebtoken')
   // superSecret = 'ilovescotchscotchyscotchscotch'
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
// var fs = require('fs');

// test.saveItem()

// ------APP Configs-----------



app.set('view-engine', 'ejs')



app.use(morgan('dev'))




// mongoose.connect(config.database);
// app.set('superSecret', config.secret)





//-------Routes ---------------




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
app.get('/preview', function(req,res) {
  res.render('preview.ejs')
})
// app.get('/export', function(req,res) {
//   res.end()
// })
// app.get('/export', function(req,res) {
//   res.attachment('index.html')
// })
// app.post('/export', function(req,res) {
//   // console.log('success')
//    var data = req.body.data
//    console.log(data)
//    // app.set('data', req.body.data)
//    // console.log(data)
//   //  fs.writeFile(path.join(__dirname + 'hp.html')) 
//   //  res.setHeader('Content-Type', 'application/octet-stream')
//   // res.end(JSON.stringify(data, null, 2), 'utf8')
// })

// var file = fs.createWriteStream("file.jpg");
// var request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
//   response.pipe(file);
// });



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
  res.send('uploaded');
});

// app.route('/users')
//     .post(function(req,res) {
//         var user = new User();


//------Start Server---------


app.listen(config.port)
console.log('magic port on' + config.port)
