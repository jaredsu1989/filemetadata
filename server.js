'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
// require and use "multer"...
var multer = require('multer');
var app = express();
//bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });



//set storage///////////////////////////////////////////////////////////////////////
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
  }
});
var upload = multer({ storage: storage });

//Uploading file handler and post request///////////////////////////////////////////////////
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next){
  const file = req.file;
  //Return error if no file is uploaded
  if (!file) {
    res.send('Please go back and upload a file');
  } else {
    //res.send(file);
    res.json({name: file.originalname, size: file.size + " bytes", type: file.mimetype});
  };
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
