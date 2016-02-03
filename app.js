var express = require('express'),
    path = require('path'),
    app = express();

app.listen(3000,function (err) {
  if(err) {
    console.log('error openinig port ');
  }
  console.log('listenting to port 3000');
});

app.get('/source.png',function (rq,res) {
  console.log(path.join(__dirname+'/public/pics/soundcloud.png'));
  res.status(200).sendFile(path.join(__dirname+'/public/pics/soundcloud.png'));
})

app.get('/',function(req, res) {
  res.status(200).sendFile(path.join(__dirname+'/index.html'));
})
