
/******************************************************************************
 *
 *  Purpose         : Chat app.
 *
 *  @description    : Group chat app. User enters his userid and password. After
                      verification group chat page is opened.
 *  @file           : server.js
 *  @overview       : 
 *  @author         : Pranati Pragya
 *  @version        : 1.0
 *  @since          : 07-09-2017
 *
 ******************************************************************************/

//declaring modules
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
var Promise = require('mpromise');
var jwt = require('jsonwebtoken');
var uuid = require('uuid');

var secretKey = uuid.v4();
var token;

app.use("/", express.static('./User_Reg'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

url = 'mongodb://localhost/myTestDB';

var User;
var Message;
var promise = new Promise;
promise = mongoose.connect('mongodb://localhost/myTestDB', {
  useMongoClient: true,
});
promise.then(function(db) {
  console.log("connected");

  var Schema = mongoose.Schema;
  var userSchema = new Schema({
    name: {
      type: String,
      unique: true
    },
    password: String,
    lastLogin: Date
  });
  User = mongoose.model('User', userSchema);

  var msgSchema = new Schema({
    user: String,
    message: String,
    time: {
      type: Date,
      default: Date.now()
    }
  });
  Message = mongoose.model('Message', msgSchema);
});

//socket programming
io.on('connection', function(socket) {
  console.log("socket connected!");
  socket.emit('loggedin');
  socket.on('prev_msgs', function(data) {
    User.find({name: data}, function(err, info) {
      if (err) console.log(err);
    })
    Message.find({}, function(err, info) {
      if (err) throw err;
      socket.emit('display_prev', info);
    });
  });

  socket.on('welcum', function(data) {
    socket.broadcast.emit('welcum_notice', data);
  });

  socket.on('logout', function(data) {
    socket.broadcast.emit('logout_notice', data);
  });

  socket.on('msg', function(data) {
    var newentry = new Message({
      message: data.message,
      user: data.user
    });
    newentry.save(function(err, data) {
      if (err) console.log(err);
      else console.log('Saved : ', data);
    });
    io.sockets.emit('newmsg', data);
  });
});

// Logout endpoint
app.post('/logout', function(req, res) {
  if (req.body.token == null) {
    res.json({
      status: "alreadyloggedout"
    });
    console.log("token null");
  } else {
    console.log("token not null");
    str = req.body.token;
    str = str.replace(/^'(.*)'$/, '$1');
    console.log("logout token " + str);
    var cursor = User.findOneAndUpdate({name: req.body.user},
      {$set: {lastLogin: Date.now}});
    res.json({status: "success"});
  }
  console.log("logout");
});


app.post('/newUser', function(req, res) {
  console.log("in api");
  var newentry = new User({
    name: req.body.userid,
    password: req.body.password
  });
  newentry.save(function(err, data) {
    if (err) {
      console.log(err);
      res.json({data: "false"});
    } else {
      console.log('Saved : ', data);
      res.json({data: "true"});
    }
  });
});

//chk user is already logged in or not
app.post('/chklogin', function(req, res) {
  console.log(req.body.token);
  if ((req.body.token) == null || (req.body.token) == 'undefined' ||
    (req.body.token) == 'null' || (req.body.token) == '' || (req.body.token) == undefined) {
    //user is not logged in
    console.log("not logged in");
    res.redirect('/login?userid=' + req.body.userid + '&password=' + req.body.password);
  } else {
    str = req.body.token;
    str = str.replace(/^'(.*)'$/, '$1');
    var decoded = jwt.verify(str, secretKey, function(err, info) {
      if (err) console.log(err);
      console.log(info);
      if (info.userid == req.body.userid) {
        res.json({
          "token": req.body.token,
          status: "alreadylogged"
        });
      } else {
        res.redirect('/login?userid=' + req.body.userid + '&password=' + req.body.password);
      }
    });
  }
});

app.get('/login', function(req, res) {
  console.log("in log in api");
  var cursor = User.findOne({
      name: req.query.userid,
      password: req.query.password
    },
    function(err, info) {
      if (err) console.log(err);
      console.log(info);
      if (info) {
        token = jwt.sign({
          userid: req.query.userid,
          password: req.query.password,
          expiresIn: 60 * 60
        }, secretKey);
        res.json({
          "token": token,
          "status": "newlogin"
        });
      } else {
        res.json({
          "token": null,
          "status": "invalid"
        });
      }
    });
});
//api to delete user from database
app.post('/delete', function(req, res) {
  console.log("in delete api");
  var cursor = User.findOneAndRemove({
      name: req.body.userid,
      password: req.body.password
    },
    function(err, info) {
      if (err) console.log(err);

      if (info) {
        res.json({
          data: "true"
        });
      } else {
        res.json({
          data: "false"
        });
      }
    });
});
//api to update password
app.post('/update', function(req, res) {
  console.log("in update api");
  var cursor = User.findOneAndUpdate({
      name: req.body.userid
    }, {
      $set: {
        name: req.body.userid,
        password: req.body.password
      }
    },
    function(err, info) {
      if (err) console.log(err);
      console.log(info);
      if (info) {
        res.json({
          data: "true"
        });
      } else {
        res.json({data: "false"});
      }
    });
});

//listening at port 8001
http.listen(8081, function() {
  console.log("server running ");
});
