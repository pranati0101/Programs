const mod=Math.pow(10,8)+7;

function find(){
  var total=[];
  var t=document.getElementById("t").value;
  while(t>0){
    var n=parseInt(prompt("Enter value of nodes."));
    total=count(n);
    alert("Total number of possible BSTs: "+total);
    t--;
  }
}
//count(4);
a=[9,0,0];
b=[9,9,9,9];
console.log("final result : "+mul(a,b));

//function for addition
function add(a,b){
  var c=[],
  carry=0,sum=0;var i=0,j=0;

    while(i< a.length && j<b.length){
      sum=(a[i++]+b[j++])+carry;
      c.push(Math.floor(sum%10));
      carry=Math.floor(sum/10);
  }
  while(i<a.length){
    sum=a[i++]+carry;
    c.push(Math.floor(sum%10));
    carry=Math.floor(sum/10);
  }
  while(i<b.length){
    sum=b[i++]+carry;
    c.push(Math.floor(sum%10));
    carry=Math.floor(sum/10);
  }
  return c;
}

//function for multiplication
function mul(num, x) {
//     1 2 3 4
//     x 1 2 4
//    ----------------
//     4 9 3 6
//   2 4 6 8 0
// 1 2 3 4 0 0
//------------------
// 1 5 3 0 1 6
//-------------------

res=[];
var sum=[0];
  //res=Array.apply(null,new Array());
  var carry = 0,
    prod = 0;
  for(j=0;j<x.length;j++){
      res[j]=new Array();
      //appending 0 for next lines
      for(k=0;k<j;k++){
        res[j][k]=(0);
      }
  for (i = 0; i < num.length; i++) {
    prod = (num[i]*x[j])%mod+carry%mod;
    res[j][i]=((Math.floor(prod % 10)));
    carry = (Math.floor(prod / 10));
  }
  if (carry > 0) {
    res[j][i]=(carry);
  }
  console.log("res: "+res[j]);
}


for(k=0;k<x.length;k++){
  sum=add(sum,res[k]);
  console.log("sum : "+sum);
}
  return sum;
}



function count(n){
  var lefttree=[0],
      righttree=[0],
      sum=[0];
  if(n<2){
    return [1];
  }
  else{
    for(i=1;i<n;i++){
      lefttree=count(i-1);
      righttree=count(n-i);
      sum=add(sum,mul(lefttree,righttree));
    }
      return sum;
  }

}
