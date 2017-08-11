num=+process.argv[2];
var bin=[];var str="";
binary(num);
function binary(num){
  var n=num; var i=0
  while(n>0){
   bin[i++]=Math.floor(n%2);  //converting into binary
    n=Math.floor(n/2);
  }
  i=0;
  bin=bin.reverse();
  while(i<bin.length){
    str=str+bin[i++];
  }
  console.log("Binary representation of "+num+" is "+str);
while(str.length%4!=0){
  str='0'+str;
}

console.log("Binary representation of "+num+" with padding is "+str);

}
