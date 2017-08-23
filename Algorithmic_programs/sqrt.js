var c=+process.argv[2];
//storing val in temp var
var temp=c;
var sqrt=0;
//chkng condition
while(Math.abs(temp-(c/temp))>(Number.EPSILON*temp)){
  temp=(c/(2*temp))+(temp/2);
}
console.log(temp);
console.log(Number.EPSILON);
