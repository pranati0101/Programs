'use strict';
// var Promise = require('mpromise');
var jwt = require('jsonwebtoken');
var User, Message;
// var promise = new Promise;
var mongoose = require('mongoose');
/*connecting to mongo database*/
mongoose.connect(url, {
    useMongoClient: true,
  }).then(function(db){
    console.log("After Then");
  }).catch(function(e){
    if(e) console.log(e);
});
User=require('../models/usermodel.js');
Message=require('../models/msgmodel.js');
//modules for redis db
var redis=require('redis');
var redisClient=redis.createClient();
var uuid = require('uuid');
var secretKey = uuid.v4();
var token;
var htmlEncode = require('js-htmlencode').htmlEncode;

/*-----logic for different api----*/
//logout api function
/*clearing token stored as user key from redis while logging out and
redirecting to home page*/
exports.logout_user=function(req,res){
  redisClient.get(req.body.user,function(err,info){
    if(err) console.log(err);
    if(info==null){
      res.json({
        status: "alreadyloggedout"
      });
      console.log("token null");
    }
    else {
      console.log("token not null");
       var cursor = User.findOneAndUpdate({name: req.body.user},
        {$set: {lastLogin: Date.now}});
        redisClient.del(req.body.user,function(err){
          console.log(err);
        });
      res.json({status: "success"});
      console.log("logout");
    }
  });
}
//sign up api function
/*chking for existing user and storing data in mongoose on getting apt result*/
exports.new_user = function(req, res) {
  console.log("in api");
  var newentry = new User({
    name: req.body.userid,
    password: req.body.password
  });
  newentry.save(function(err, data) {
    if (err) {
      console.log(err);
      res.json({data: false});
    } else {
      console.log('Saved : ', data);
      res.json({data: true});
    }
  });
}
//chk log in api function
/*chking for existing token on user name stored in redis, if not redirect to
login api else directly open chat page*/
exports.chk_login = function(req, res) {
  redisClient.exists(req.body.userid,function(err,result){
      console.log("result in chklogin  "+result+err);
      if(result){
        redisClient.get(req.body.userid, function(err, token) {
            console.log(token);
            if(token){
              res.json({status: "alreadylogged"});
            }
        });
      }
      else {
         //user is not logged in
         console.log("not logged in");
         res.redirect('/login?userid=' + req.body.userid + '&password=' + req.body.password);
       }
    });
}
//log in api function
/*chking for userid and password present in db and sends response accordingly*/
exports.login_user = function(req, res) {
  console.log("in log in api");
  console.log(req.query.userid);
  var cursor = User.findOne({
      name: req.query.userid,
      password: req.query.password
    },
    function(err, info) {
      if (err) console.log(err);
      console.log("login info "+info);
      if (info) {
        token = jwt.sign({
          userid: req.query.userid,
          password: req.query.password,
          expiresIn: 60 * 60
        }, secretKey);
        console.log(token);
        redisClient.set(req.query.userid,token);
        res.json({"status": "newlogin"});
      } else {
        res.json({"status": "invalid"});
      }
    });
  }
  //update_user api function
  /*chking for existing user and password in db, if found updates it*/
exports.update_user = function(req, res) {
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
        res.json({data:true});
      } else {
        res.json({data:false});
      }
    });
  }
  //search_user api function
  /*chking for existing user and password in db and send response accordingly*/
exports.search_user = function(req, res) {
    console.log("in search api");
    var cursor = User.findOne({
        name: req.body.userid,
        password: req.body.password
      },
      function(err, info) {
        if (err) console.log(err);
        if (info) {
          res.json({data: true});
        } else {
          res.json({data:false});
        }
      });
    }
    //delete_user api function
    /*chking for existing user and password in db and deletes it, if found*/
exports.delete_user = function(req, res) {
  console.log("in delete api");
  var cursor = User.findOneAndRemove({
      name: req.body.userid,
      password: req.body.password
    },
    function(err, info) {
      if (err) console.log(err);

      if (info) {
        res.json({data:true});
      } else {
        res.json({data:false});
      }
    });
  }
  //encode api function
  /*receives string in req and send encode_msg in response*/
exports.encode_msg= function(req, res) {
    console.log(req.body.msg);
    res.json({data:htmlEncode(req.body.msg)});
    }
