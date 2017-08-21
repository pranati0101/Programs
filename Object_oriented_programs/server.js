var express = require('express');
var app = express();
var path = require('path');
// viewed at http://localhost:8080
app.get('/', function(req, res) {
  res.sendFile(__dirname+path.join('/addressBook.html'));
});
app.listen(8086);
