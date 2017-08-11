var arr=new Array();
var n=0;

for (var i = 0; i < 10; i++) {
  arr[i] = new Array();
  for (j = 0; j < 100; j++) {
        n++;
    if (prime(n) == true) {
      arr[i].push(n);
    }
  }
}
//print array
console.log("Prime numbers: ");
for(i=0;i<10;i++){
  console.log("["+arr[i].join(" ")+"]");
}


//function to check prime
function prime(num){
  if(num==2 || num==3){
        return true;
  }
  if(num%2==0 || num%3==0)
    return false;
  for(var i=2;i<Math.sqrt(num);i++){
    if(num%i===0){
        return false;
    }
  }
  return true;
}
