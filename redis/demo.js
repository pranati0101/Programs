var express=require('express');
var app=express();
var redis=require('redis');
var client1=redis.createClient();
var client2 = redis.createClient();
client1.auth('1234');
client2.auth('1234');
app.get('/', function(req, res){
  client1.on('connect',function(){
    console.log("connected to redis!!");
  });
 });

app.listen(8000,function(){
  console.log("server running!");
  client1.on('connect',function(){
    var user='ram';
    console.log("connected to redis!!");
    client1.hmset('tokens',
      user,'756455.88888.ghjty5'
  );
  user='david';
    client1.hmset('tokens',
      user,'756455.88888.ghjty5'
  );
//   client1.hmset('tokens:2',
//     'user','ramu',
//     'token', '7555.88888.ghjty5'
// );
    // client1.del('tokens:1');
    // client1.del('tokens:2');
    // client1.hget('tokens',user, function(err, object) {
    //     console.log(object);
    // });
client1.hexists('tokens','zack',function(err,resp){
    console.log(err,resp);
});//,function(err,resp){
//   console.log(err,resp);
// })
//   client1.rpush(['list1', 'angularjs', 'backbone','nodejs'], function(err, reply) {
//     console.log(reply); //prints 2
// });
// client1.lrange('list1',0,-1,function(err,obj){
//   console.log(obj);
// })
// client1.sadd(['tags', 'a', 'b', 'br'], function(err, reply) {
//     console.log(reply); // 3
// });
// client1.sismember('tags','a',function(err,obj){
//   console.log(obj);
// })
// client1.exists('key', function(err, reply) {
//     if (reply === 1) {
//         console.log('exists');
//     } else {
//         console.log('doesn\'t exist');
//     }
// });
// client1.subscribe("pubsub");
//
// client1.on("subscribe", function(channel, count) {
//     console.log("Subscribed to " + channel + ". Now subscribed to " + count + " channel(s).");
// });
// client1.on("message", function(channel, message){
//   console.log(channel + ": " + message);
// });
// client2.publish("pubsub",'from node server');
// client2.publish("pubsub",'from node server again');
});
})
