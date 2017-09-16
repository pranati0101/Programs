//declaring modules
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
var Promise = require('mpromise');
var session=require('express-session');

app.use(session({
  secret:"something",
  resave:true,
  saveUninitialized:true
}));


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
  console.log("after login");

  socket.on('prev_msgs', function(data) {
    console.log("prev msg " + data);
    User.find({
      name: data
    }, function(err, info) {
      if(err) console.log(err);
    })
    // Message.find({time:{ '$gt':new Date(info.lastLogin)}},function(err,info){
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
app.get('/logout', function (req, res) {
  req.session.destroy();
  var cursor = User.findOneAndUpdate({
    name: req.query.user}, {
    $set: {
      lastLogin: Date.now
    }
  });
  console.log("logout");
  res.send("logout success!");
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
      res.json({
        data: "false"
      });
    } else {
      console.log('Saved : ', data);
      res.json({
        data: "true"
      });
    }
  });
});


//chk user is already logged in or not
// app.post('/chklogin',function(req,res){
//   console.log("req.body:    "+req.body.userid);
//   console.log("req.session:    "+JSON.stringify(req.session));
//   if(req.session.user){
//     res.json({session:true,
//     status:"alreadylogged"});
//   }
// else{
//   console.log("not logged in");
//   res.redirect('/login'+'?userid='+req.body.userid+'&password='+req.body.password);
// }
// });

app.post('/login', function(req, res) {
  console.log("in log in api");
    var cursor = User.findOne({
        name: req.body.userid,
        password: req.body.password
      },
      function(err, info) {
        if (err) console.log(err);

        console.log(info);
        if (info) {
          req.session.user = req.body.userid;
          req.session.admin = true;
          req.session.cookie={expires:60*60};
          console.log("req.session in login   "+(req.session));
          res.json({session:req.session,
          status:"newlogin"});
        }
        else{
          res.json({status:"invalid"});
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
        res.json({
          data: "false"
        });
      }
    });
});

//listening at port 8001
http.listen(8080, function() {
  console.log("server running ");
});
