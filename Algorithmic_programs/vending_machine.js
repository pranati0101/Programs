var cash =+process.argv[2];
//var cash=5101;
//available denominations
var denominations={
  1000:0,
  500:0,
  100:0,
  50:0,
  10:0,
  5:0,
  2:0,
  1:0
};
var denominationsarr=[1000,500,100,50,10,5,2,1];
notes(cash);

//cal min number of notes
function notes(cash){
  var cashtemp=cash,
      num=0;
  while(cashtemp>0){
    for(i=0;i<denominationsarr.length;i++){
      if(cashtemp>denominations[denominationsarr[i]])
      {
        denominations[denominationsarr[i]]=Math.floor(cashtemp/denominationsarr[i]);
        cashtemp=Math.floor(cashtemp%denominationsarr[i]);
      }
    }
  }
for(i=0;i<denominationsarr.length;i++){
  num=num+denominations[denominationsarr[i]];
}
console.log("Total number of notes is "+num);
console.log("Denomination : Number of notes");
var i=0;
while(i<denominationsarr.length){
  if(denominations[denominationsarr[i]]!=0){
    console.log(denominationsarr[i]+" : "+denominations[denominationsarr[i]]);
  }
  i++;
}
}
//console.log(mul);
