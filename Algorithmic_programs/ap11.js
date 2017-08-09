var y=+process.argv[2];
var m=+process.argv[3];
var d=+process.argv[4];
y0=y-(14-m)/12;
x=y0+y0/4-y0/100+y0/400;
m0=m+12*x*((14-m)/12)-1;
d0=Math.floor((d+x+31*m0/12)%7);
console.log(y+"/"+m+"/"+d);
console.log(d0-1);
