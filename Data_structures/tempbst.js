//modulo 10^8+7
const mod=parseInt(parseInt(Math.pow(10,8))+parseInt(7));
var memo=[];


//function for multiplying
function mul(num,x){
  var res=[];var carry=0,prod=0;
  console.log(mod);
  for(i=0;i<num.length;i++){
    prod=(((num[i]*x)%mod)+(carry%mod));
    res.push((Math.floor(prod%10)));
    carry=(Math.floor(prod/10))%mod;
  }
  if(carry>0){res.push(carry);}
  return res;
}

//function for calculating factorial
function fact(n){
  if(n in memo){
    return memo[n];
  }
  if(n<2)
    return 1;
  var num=[];var res=[1];
  var n1=n;i=0;
  while(n1>0){
    num[i]=n1%10;
    n1=n1/10;i++;
  }
  for(var i=1;i<=n;i++){
    res=mul(res,i);
  }str=""+res.reverse();
  memo[n]=parseInt(str.split(",").join(""))
  return memo[n];
}
//driver function
function find(){
  var t=document.getElementById("t").value;
  while(t>0){
    var n=parseInt(prompt("Enter value of nodes."));
    //var catln=fact(n);
   var catln=Math.floor(fact(2*n)/(fact(n+1)*fact(n)));
    alert("Total number of possible BSTs: "+catln);
    t--;
  }
}
