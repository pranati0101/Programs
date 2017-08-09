var mod=Math.pow(10,8)+7;

//fact(200);
//mul(num,10);

function mul(num,x){
  var res=[[]];var carry=0,prod=0;var res2=[];
for(j=0;j<x.lenght;j++){
  for(i=0;i<num.length;i++){
    prod=((num[i]*x[i])%mod+carry%mod)%mod;
    res[i].push(Math.floor(prod%10));
    carry=Math.floor(prod/10);
  }
  if(carry>0){res[i].push(carry);}
  for(k=0;k<=j;k++){
    res[j+1].push(0);
  }
}
for(i=0;i<x.length;i++){
  res2=add(res2,res[i]);
}
  return res2;
}
a=[1,2,3];b=[5,3,6];
console.log(add(a,b));
function add(a,b){
  var c=[],
  carry=0,sum=0;var i=0;

    for(data in a || data in b){
      sum=(a[i++]+b[i++])+carry;
      c.push(Math.floor(sum%10));
      carry=Math.floor(sum/10);

    if(carry>0){res[i].push(carry);}
  }
  return c;
}

function fact(n){
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
  console.log(str.split(",").join(""));
}
