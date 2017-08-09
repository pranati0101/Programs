var t=+process.argv[2];
var v=+process.argv[3];
if(t>50 || v<3 || v>120)
  system.exit(0);
var w=35.74+(0.6215*t)+((0.4275*t-35.75)*Math.pow(v,0.16));
console.log(w);
