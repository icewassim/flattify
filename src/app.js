const express = require('express'),
  consolidate = require('consolidate'),
  path = require('path'),
  busboy = require("connect-busboy"),
  fs =  require('fs'),
  app = express();

var port = process.env.PORT || 3000;
app.engine('html', consolidate.handlebars);
app.use('/pics', express.static(__dirname + '/pics'));
if(process.env.PROD) {
  app.use('/js', express.static(__dirname + '/../release'));
}else {
  app.use('/js', express.static(__dirname + '/../build'));
}

app.use('/seiyria-bootstrap-slider', express.static(__dirname + '/../bower_components/seiyria-bootstrap-slider/dist'));
app.use('/color-picker', express.static(__dirname + '/../bower_components/mjolnic-bootstrap-colorpicker/dist'));
app.use('/color-picker', express.static(__dirname + '/../bower_components/mjolnic-bootstrap-colorpicker/dist'));
app.use('/bootstrap', express.static(__dirname + '/../bower_components/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/../bower_components/jquery/dist'));
app.use('/bootstrap-toggle', express.static(__dirname + '/../bower_components/bootstrap-toggle'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/icons', express.static(__dirname + '/uploaded-icons'));
app.use('/fonts',express.static(__dirname + '/fonts'));
app.use('/preview-icons', express.static(__dirname + '/icons'));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(busboy());

app.listen(port, function(err) {
  if (err) {
    console.error('Failure while openinig port ', port);
  }
  console.log('listenting to port ', port);
});

app.get('/', function(req, res) {
  console.log(req.query.icon);
  var icon = "twitter.png";
  if(req.query.icon)
    icon = req.query.icon;

  res.status(200).render('index',{'icon':icon});
});

app.post('/uploadicon',function (req,res) {
  var fstream;
          req.pipe(req.busboy);
          req.busboy.on('file', function (fieldname, file, filename) {
              var randomNumber = Math.random() * (100000 - 1) + 1;
              console.log("Uploading: " + filename);

              //Path where image will be uploaded
              fstream = fs.createWriteStream(__dirname +"/uploaded-icons/" + randomNumber);
              file.pipe(fstream);
              fstream.on('close', function () {
                  console.log("Upload Finished of " + filename);
                  res.redirect('/?icon='+randomNumber);           //where to go next
              });
          });
});
