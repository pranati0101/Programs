const DMAX=100000;
var taskList=[0];
for(i=0;i<DMAX;i++){
  taskList[i]=0;
}

var prevd=1, prevtotal=0, prev_overshoot=0;
var total=0, overshoot=0;

function calculate() {
  // storing values
  var t = document.getElementById("t").value;  //taking input
  while ((t--) > 0) {
    var d=parseInt(prompt("Enter deadline."));
    var m=parseInt(prompt("Enter time required."));
    calovershoot(d,m);
  }
  console.log(taskList[d]);
}
//calculating overshoot
function calovershoot(d,m){
if(d>=prevd){
  prevtotal+=m;
}
else{
  taskList[d]+=m;
  for(k=prevd;k<d;k++){
    total+=taskList[k];
  }
  prev_overshoot=prevtotal-prevd;
  for(k=d;k<DMAX;k++){
    total+=taskList[k];
    if((total-k)>=prev_overshoot){
      prevd=d;
      prevtotal=total;
      prev_overshoot=prevtotal-prevd;
    }
  }
}
  if((prevtotal-prevd)>=0){
    console.log(prevtotal-prevd);
  }
  else{
    console.log(0);
  }
}
