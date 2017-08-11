const mod=Math.pow(10,8)+7;
//modulo 10^8+7

function binomial_coeff(n,k){
  var res=1;
  if(k>n-k){
    k=n-k;
  }
  // Calculate value of [n*(n-1)*---*(n-k+1)] / [k*(k-1)*---*1]
    for (var i = 0; i < k; ++i)
    {
        res *= (n - i);
        res /= (i + 1);
    }
    return res;
}

function catalan(n){
  var c=binomial_coeff(2*n,n);
  return Math.floor((c/(n+1)));
}

function find(){
  var t=document.getElementById("t").value;
  while(t>0){
    var n=parseInt(prompt("Enter value of nodes."));
    var catln=catalan(n);
    alert("Total number of possible BSTs: "+catln);
    t--;
  }
}
