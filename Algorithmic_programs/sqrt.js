var c=+process.argv[2];
//storing val in temp var
var temp=c;
var sqrt=0;
//chkng condition
while(Math.abs(t-(c/t))>(Number.EPSILON*t)){
  temp=(c/(2*t))+(t/2);
}
console.log(temp);
