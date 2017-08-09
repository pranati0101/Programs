var p=+process.argv[2];
var y=+process.argv[3];
var r=+process.argv[4];
var r2=r/(12*100);
var n=12*y;
var mt=Math.pow((1+r2),-n);  //payment=p*r/{1-(1+_r)^(-n)}
var payment=(p*r2)/(1-mt);
console.log(payment);
