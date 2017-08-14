//stock object
function stock(name,sn,sp){
  this.name=name;
  this.sn=sn;
  this.sp=sp;
  this.value=(sn*sp);
}
//list of stock
var list=[];
var sum=0;
//driver function
function cal(){
  var n=document.getElementById("n").value;
  while(n>0){
    var name=prompt("Enter the name of stock.");
    var sn=parseFloat(prompt("Enter number of shares"));
    var sp=parseFloat(prompt("Enter share price"));
    var obj=new stock(name,sn,sp);
    list.push(obj);
    //alert("Stock price is "+obj.value);
    n--;
  }
  for(obj in list){
    sum+=(list[obj].value);
  }
  document.write("Stock Report: ");
  for(obj in list){
    document.write("<br>Name of stock: "+list[obj].name+"<br>Value: "+list[obj].value);
  }
  document.write("<br>Total value of stock is "+sum);

}
