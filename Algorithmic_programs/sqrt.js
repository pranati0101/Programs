var c=+process.argv[2];

var t=c;
var sqrt=0;
while(Math.abs(t-(c/t))>(Number.EPSILON*t)){
  t=(c/(2*t))+(t/2);
}
console.log(t);
