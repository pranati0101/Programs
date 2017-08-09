//var exp=process.argv[2++];
var exp = "(5+6)∗(7+8)/(4+3)(5+6)∗(7+8)/(4+3)";
var i = 0;
check(exp);


function Stack()
{
 this.stac=new Array();
 //function to remove element
 this.pop=function(){
  return this.stac.pop();
 }
 //function to push element
 this.push=function(item){
  this.stac.push(item);
 }
 //function to chk stack is empty
 this.isEmpty=function(){
   if(this.stac.length==0){
     return true;
   }
   else{
     return false;
   }
 }
}


function check(exp) {
  var stk = new Stack();
  while (i != exp.length) {
    if (exp[i] == "(" || exp[i] == "[" || exp[i] == "{") {
      stk.push(exp[i]);
    }
    if (exp[i] == ")" || exp[i] == "]" || exp[i] == "}") {
      stk.pop();
    }
    i++;
  }
  if (stk.isEmpty()) {
    console.log("true");
  } else {
    console.log("false");
  }
}
