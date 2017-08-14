//taking input from cmd
var str=process.argv[2];
palindrome(str);
//implementing dequeue using array
function Dequeue()
{
 this.dq=new Array();
 //add item at front
 this.addFront=function(item){
  this.dq.unshift(item);
 }
 //add item at rear
 this.addRear=function(item){
  this.dq.push(item);
 }
 //function to remove item from rear
 this.removeFront=function(){
  return this.dq.shift();
 }
 //function to remove item from rear
 this.removeRear=function(){
  return this.dq.pop();
 }
//function to give length of Dequeue
this.size=function(){
  return this.dq.length;
}
 //function to chk stack is empty
 this.isEmpty=function(){
   if(this.dq.length==0){
     return true;
   }
   return false;
 }
}

function palindrome(str){
  var dq=new Dequeue();
  str=str.split("");
  for(var i=0;i<str.length;i++){
    dq.addRear(str[i]);
  }
  for(i=0;i<(dq.size()/2);i++){
    if(dq.removeFront()!=dq.removeRear()){
      console.log("Not palindrome!");
      return;
    }
  }
  console.log("Palindrome!");
}
