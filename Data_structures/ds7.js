function find(){
  var total=0;
  var t=document.getElementById("t").value;
  while(t>0){
    var n=parseInt(prompt("Enter value of nodes."));
    total=count(n);
    alert("Total number of possible BSTs: "+total);
    t--;
  }
}
const mod=Math.pow(10,8)+7;
a=[1,2];
b=[1,2];
console.log(mul(a,b));
function mul(num, x) {
  var res =new Array();
  res=Array.apply(null,new Array());
  var carry = 0,
    prod = 0;
  for(j=0;j<x.length;j++){
  for (i = 0; i < num.length; i++) {
    prod = (num[i]*x[j])%mod+carry%mod;
    res[i].push((Math.floor(prod % 10)));
    carry = (Math.floor(prod / 10));
  }
  if (carry > 0) {
    res[i].push(carry);
  }
}
  return res;
}

function count(n){
  var lefttree=[0],
      righttree=[0],
      sum=[0];
  if(n<2){
    return 1;
  }
  for(i=1;i<n;i++){
    lefttree=count(i-1);
    righttree=count(n-i);
    sum=add(sum,mul(lefttree,righttree));
  }
  return sum;
}
