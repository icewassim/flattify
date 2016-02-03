const express = require('express'),
      path = require('path'),
      app = express();

let port =  process.env.PORT || 3000;

app.listen(port,function (err) {
  if(err) {
    console.error('Failure while openinig port ',port);
  }
  console.log('listenting to port ',port);
});


//TODO routes, controllers ,view engines
app.get('/source.png',function (rq,res) {
  res.status(200).sendFile(path.join(__dirname+'/pics/soundcloud.png'));
});

app.get('/',function(req, res) {
  res.status(200).sendFile(path.join(__dirname+'/index.html'));
});
