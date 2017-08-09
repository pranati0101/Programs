var cash =+process.argv[2];
//var cash=5101;
var mul={
  1000:0,
  500:0,
  100:0,
  50:0,
  10:0,
  5:0,
  2:0,
  1:0
};
var arr=[1000,500,100,50,10,5,2,1];
notes(cash);
function notes(cash){
  c=cash;
  while(c>0){
    for(i=0;i<arr.length;i++){
      if(c>mul[arr[i]]){
        mul[arr[i]]=Math.floor(c/arr[i]);
        c=Math.floor(c%arr[i]);
      }
    }
  }
num=0;
for(i=0;i<arr.length;i++){
  num=num+mul[arr[i]];
}
console.log("Total number of notes is "+num);
console.log("Denomination : Number of notes");
var i=0;
while(i<arr.length){
  if(mul[arr[i]]!=0){
    console.log(arr[i]+" : "+mul[arr[i]]);
  }
  i++;
}
}
//console.log(mul);
