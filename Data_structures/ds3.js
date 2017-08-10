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


function find(exp) {
  var i=0;
  var exp=document.getElementById("exp").value;
  var stk = new Stack();
  while (i != exp.length) {
    if (exp[i] == "(" || exp[i] == "[" || exp[i] == "{") {
      stk.push(exp[i]);
    }
    if (exp[i] == ")" || exp[i] == "]" || exp[i] == "}") {
      if(stk.isEmpty())
      {
        alert("False");
        return;
      }
      stk.pop();
    }
    i++;
  }
  if (stk.isEmpty()) {
    alert("True");
  } else {
    alert("False");
  }
}
