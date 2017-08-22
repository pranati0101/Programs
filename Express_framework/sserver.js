//declaring modules
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var fs = require('fs');
// var result={status:}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/", express.static('./sample'));

//api for saving file
app.post('/saving', function(req, res) {
  console.log("saving");
  res.setHeader('Content-Type', 'application/json');
  console.log([req.body]);
  fs.readFile(__dirname + "/filename.json", "utf8", function(err, data) {
    if (err) throw err;
    try {
      data = JSON.parse(data);
    } catch (err) {
      console.log(err);
      data = [];
      // throw err;
    }
    if (!(data instanceof Array)) {
      data = [];
    }
    data.push([req.body]);

    fs.writeFile(__dirname + "/filename.json", JSON.stringify(data), "utf8", function(err, data) {
      if (err) {
        throw err;
      }
      try {
        res.send({
          data: data,
          status: true,
          "message": "get success"
        });
      } catch (e) {
        console.log(e);
      }
    });

  });

});

//for displaying present CONTACTS
app.get('/opening', function(req, res) {

  console.log('in opened api ');

  fs.readFile(__dirname + "/filename.json", "utf8", function(err, data) {
    if (err) throw err;
    try {
      data = JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
    console.log(JSON.stringify(data));

    res.json(data);

  })
});

//for editing present CONTACTS
app.post('/edit', function(req, res) {

  console.log('in edit api ');

  fs.readFile(__dirname + "/filename.json", "utf8", function(err, data) {
    if (err) throw err;
    if (data == null) {
      alert("no contacts!");
    }
    try {
      data = JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
    for (ind in data) {
      if(data[ind][0]!=null && data[ind][0]!=undefined){
        console.log(data[ind][0].firstname);
        if (data[ind][0].firstname == req.body.firstname) {
          data[ind] = req.body;
          console.log("successfully edited");
          break;

        }
      }

    }
    //saving data to file
    fs.writeFile("filename.json", JSON.stringify(data), "utf8", function(err, data) {
      if (err) throw err;
      console.log("successfully updated");
    })
  })
});


//for deleting present CONTACTS
app.post('/delete', function(req, res) {

  console.log('in delete api ');

  fs.readFile(__dirname + "/filename.json", "utf8", function(err, data) {
    if (err) console.log(err);
    if (data == null) {
      alert("no contacts!");

    }
    try {
      data = JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
    console.log("data "+data);
    for (index in data) {
      // if(data[ind][0]!=null && data[ind][0] !=undefined){
        if(data[index][0]){
          console.log(data[index][0].firstname);
        if (data[index][0].firstname == req.body.firstname) {
          data.splice(index, 1);
          console.log("successfully deleted");
          break;
        }
      }

    }
    fs.writeFile("filename.json", JSON.stringify(data), "utf8", function(err, data) {
      if (err) throw err;
      console.log("successfully updated");
    })
  });
});

//listening at port 8001
app.listen(8001, function() {
  console.log("server running ");
})
