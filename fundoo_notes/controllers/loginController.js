'use strict';
// var Promise = require('mpromise');
var jwt = require('jsonwebtoken');
var User, Message;
// var passport = require('passport');
var flash    = require('connect-flash');
var db=require('../config/database')
// var promise = new Promise;
var mongoose = require('mongoose');
/*connecting to mongo database*/
mongoose.connect(db.url, {
    useMongoClient: true,
  }).then(function(db){
    console.log("connected to mongodb!");
  }).catch(function(e){
    if(e) console.log(e);
  });

User=require('../models/users.js');
// authModel=require('../models/authModel.js');
//modules for redis db
// var redis=require('redis');
// var redisClient=redis.createClient();
// var uuid = require('uuid');
// var secretKey = uuid.v4();
var token;
// var htmlEncode = require('js-htmlencode').htmlEncode;

/*-----logic for different api----*/
//search_user api function
/*chking for userid and password present in db and sends response accordingly*/
exports.loginLocal = function(req, res,passport) {
  // console.log("in log in api",req.route.Route.stack);
  passport.authenticate('local-login', {
   successRedirect : '/profile', // redirect to the secure profile section
   failureRedirect : '/', // redirect back to the signup page if there is an error
   failureFlash : true // allow flash messages
 });
}
exports.googleLogin=function(req,res,passport){
  console.log("logging by google");
  passport.authenticate('google', {scope: ['profile', 'email']})
}
// the callback after google has authenticated the user
exports.googleCallback=function(req,res,passport){
  passport.authenticate('google', {
      successRedirect: '/profile',
      failureRedirect: '/'
    });
}



  //encode api function
  /*receives string in req and send encode_msg in response*/
exports.encode_msg= function(req, res) {
    console.log(req.body.msg);
    res.json({data:htmlEncode(req.body.msg)});
    }



//logout api function
/*clearing token stored as user key from redis while logging out and
// redirecting to home page*/
// exports.logout_user=function(req,res){
//   redisClient.get(req.body.user,function(err,info){
//     if(err) console.log(err);
//     if(info==null){
//       res.json({
//         status: "alreadyloggedout"
//       });
//       console.log("token null");
//     }
//     else {
//       console.log("token not null");
//        var cursor = User.findOneAndUpdate({name: req.body.user},
//         {$set: {lastLogin: Date.now}});
//         redisClient.del(req.body.user,function(err){
//           console.log(err);
//         });
//       res.json({status: "success"});
//       console.log("logout");
//     }
//   });
// }
//sign up api function
/*chking for existing user and storing data in mongoose on getting apt result*/
// exports.new_user = function(req, res) {
//   console.log("in api");
//   var newentry = new User({
//     name: req.body.userid,
//     password: req.body.password
//   });
//   newentry.save(function(err, data) {
//     if (err) {
//       console.log(err);
//       res.json({data: false});
//     } else {
//       console.log('Saved : ', data);
//       res.json({data: true});
//     }
//   });
// }
//chk log in api function
/*chking for existing token on user name stored in redis, if not redirect to
login api else directly open chat page*/
// exports.chk_login = function(req, res) {
//   redisClient.exists(req.body.userid,function(err,result){
//       console.log("result in chklogin  "+result+err);
//       if(result){
//         redisClient.get(req.body.userid, function(err, token) {
//             console.log(token);
//             if(token){
//               res.json({status: "alreadylogged"});
//             }
//         });
//       }
//       else {
//          //user is not logged in
//          console.log("not logged in");
//          res.redirect('/login?userid=' + req.body.userid + '&password=' + req.body.password);
//        }
//     });
// }
//log in api function
