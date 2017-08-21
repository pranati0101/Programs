//declaring modules
var express =require("express");
var bodyParser=require("body-parser");
var path = require("path");
var app=express();
var fs=require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",express.static('./sample'));

//api for saving file
app.post('/saving',function(req, res)
{
res.setHeader('Content-Type', 'application/json');
var d=JSON.stringify([req.body]);
//console.log(JSON.stringify([req.body],0,4));

res.send({firstName: req.body.firstName || null});
//console.log('you posted: First Name: ' + req.body.firstName);
fs.writeFile( "filename.json", d, "utf8", function (err,data) {
  try {
    console.log(err,data);
    if (err) {
      throw err;
    }
    console.log(data);
    res.send({data:data,status:true,"message":"get success"});
  }
  catch (e) {
    console.error(e);
  }
});
});

//for opening or getting filename

app.get('/opening',function(req, res){

console.log('in opened api ');
fs.readFile( __dirname+'/inventory.json','utf8' ,function (err,data) {
  try {
    console.log('you opened: ');
    if (err) {
      throw err;
    }
    console.log((data));
    data=JSON.parse(data);
    res.json(data);
  }
  catch (e) {
    console.error(e);
  }
});

});

app.listen(3001,function()
{
  console.log("server running ");
})
