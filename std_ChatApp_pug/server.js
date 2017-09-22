//declaring modules
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
// var pug=require('pug');
app.set('view engine', 'pug');
var jwt = require('jsonwebtoken');
var redis=require('redis');
var redisClient=redis.createClient();
app.use(express.static('./User_Reg'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
url = 'mongodb://localhost/myTestDB';


app.use(require('./routes/'));
var User=require('./models/usermodel');
var Message=require('./models/msgmodel');
app.set('views','./User_Reg/views');
//socket programming
io.on('connection', function(socket) {
  console.log("socket connected!");
/*connecting to mongo database*/
mongoose.connect(url, {
    useMongoClient: true,
  }).then(function(db){
  }).catch(function(e){
    if(e) console.log(e);
  });
/*connecting to redis database*/
redisClient.on('connect',function(){
    console.log("connected to redis!!");
  });


// app.get('/home', function (req, res) {
//     // res.render('index.pug',{ title : 'Home' }
//     // )
//     console.log("in home");
//     pug.renderFile('findex', merge(options, locals));
//   });

/*emitting loggedin event when users log in*/
  socket.emit('loggedin');
/*updates number of users connected or online whenever any user logs in*/
  redisClient.keys('*',function(err,info){
    if(err) console.log(err);
    console.log("redis data   "+(info));
    io.emit('available',info);
  });
  /*esending chat history to newly connected user*/
  socket.on('prev_msgs', function(data) {
    User.find({name: data}, function(err, info) {
      if (err) console.log(err);
    })
    Message.find({}, function(err, info) {
      if (err) throw err;
      socket.emit('display_prev', info);
    });
  });
/*sending notification when any new users log in*/
  socket.on('welcum', function(data) {
    socket.broadcast.emit('welcum_notice', data);
  });
  /*sending notification when any  users log out*/
  socket.on('logout', function(data) {
    socket.broadcast.emit('logout_notice', data);
    redisClient.keys('*',function(err,info){
      if(err) console.log(err);
      console.log("redis data   "+(info));
      socket.broadcast.emit('available',info);
    });
  });
/*sending notification when any user sends message*/
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

//listening at port 8001
http.listen(8081, function() {
  console.log("server is running on 8081");
});
/*sexporting app*/
module.exports=app;
