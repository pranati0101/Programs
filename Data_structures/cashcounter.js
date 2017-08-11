var q=new Queue();
var cash=0;



function Queue()
{
 this.q=new Array();
 //function to remove element
 this.deq=function(){
  return this.q.pop();
 }
 //function to push element
 this.enq=function(item){
  this.q.unshift(item);
 }
 //function to chk stack is empty
 this.isEmpty=function(){
   if(this.q.length==0){
     return true;
   }
   else{
     return false;
   }
 }
}

function start(){
  cash=parseInt(document.getElementById("cash").value);
}
//function to transact
function transact(){

  amt=parseInt(document.getElementById("amount").value);

  q.enq(amt);

  if(document.getElementById("withdraw").checked==true){
    cash=cash-amt;
  }
  if(document.getElementById("deposit").checked==true){
      cash=cash+amt;
  }
  q.deq(amt);
  alert("Remaining cash balance is Rs."+cash);
}
