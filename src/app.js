const express = require('express'),
      consolidate = require('consolidate'),
      path = require('path'),
      app = express();

let port =  process.env.PORT || 3000;
app.engine('html', consolidate.handlebars);
app.use('/pics', express.static(__dirname+'/pics'));
app.use('/js', express.static(__dirname+'/../build'));
app.set('view engine', 'html');
app.set('views', __dirname+'/views');

app.listen(port,function (err) {
  if(err) {
    console.error('Failure while openinig port ',port);
  }
  console.log('listenting to port ',port);
});

app.get('/',function(req, res) {
  res.status(200).render('index',{hello:"lol"});
});
