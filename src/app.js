const express = require('express'),
  consolidate = require('consolidate'),
  path = require('path'),
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

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.listen(port, function(err) {
  if (err) {
    console.error('Failure while openinig port ', port);
  }
  console.log('listenting to port ', port);
});

app.get('/', function(req, res) {
  res.status(200).render('index');
});
