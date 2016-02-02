var express = require('express');
var path = require('path');
var app = express();

app.listen(3000,function (err) {
  if(err) {
    console.log('error openinig port ');
  }
  console.log('listenting to port 3000');
});

app.get('/twitter.jpg',function (rq,res) {
  res.status(200).sendFile(path.join(__dirname+'/twitter.jpg'));
})

app.get('/',function(req, res) {
  res.status(200).sendFile(path.join(__dirname+'/index.html'));
})
