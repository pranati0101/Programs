var p=process.argv[2];
var y=process.argv[3];
var r=process.argv[4];
//assigning values to variables
var r2=r/(12*100);
var n=12*y;
//payment=p*r/{1-(1+_r)^(-n)}
var mt=Math.pow((1+r2),-n);
//cal payment
var payment=(p*r2)/(1-mt);
console.log(payment);
