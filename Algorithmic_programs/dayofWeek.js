var year=+process.argv[2];
var month=+process.argv[3];
var date=+process.argv[4];
//calculating using formula
y0=year-(14-month)/12;
x=y0+y0/4-y0/100+y0/400;
m0=month+12*x*((14-month)/12)-1;
d0=((date+x+31*m0/12)%7);
//printing result
console.log(year+"/"+month+"/"+date);
console.log(d0-1);
