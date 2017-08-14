num=+process.argv[2];
var bin=[];var str="";
str=binary(num);
str2=swapnibbles(str);

//converting to binary
function binary(num){
  var n=num; var i=0
  while(n>0){
   bin[i++]=Math.floor(n%2);
    n=Math.floor(n/2);
  }
  // str=str.concat(bin.reverse());
  i=0;
  bin=bin.reverse();
  while(i<bin.length){
    str=str+bin[i++];
  }
  while(str.length%4!=0){
    str='0'+str;
  }
console.log("Binary representation of "+num+" is "+str);
return str;
}

//to swap nibbles
function swapnibbles(str) {
  var sum = 0;
  ///calculating number of nibbles
  var i = Math.floor(str.length / 4);
  //only one nibble is present
  if(i<=1){
    return;
  }
  var str2 = new Array(str.length);
  var m = 1;
  for (j = i; j>0; j--) {
    var k = 1;
    //assigning values into first nibble of str2 from last nibble of str and so on
    while (k <= 4) {
      str2[4*m-k] = str[4*j-k];
      k++;
    }
    m++;
  }
  i = 1;
  //converrting into decimal
  while (i < str2.length) {
    sum += Math.pow(2, i-1) * str2[str2.length-i];
    i++;
  }
  console.log("Decimal representation of swapped nibbles: " + sum);
  chkpowerof2(str2);
  return str2;
}
//to chk power of 2
function chkpowerof2(str) {
  var count = 0;
  var i = 0;
  while (count < 2 && i < str.length) {
    //if number of 1's is >1 =>not a power of 2
    if (str[i++] == 1) {
      count++;
      if (count == 2) {
        console.log("Not a power of 2");
        return;
      }
    }
  }
  console.log("Power of 2");
}
