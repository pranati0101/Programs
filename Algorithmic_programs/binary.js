num=+process.argv[2];
var bin=[];var str="";
str=binary(num);
str2=swapnibbles(str);
chkpowerof2(str2);

function binary(num){
  var n=num; var i=0
  while(n>0){
   bin[i++]=Math.floor(n%2);  //converting into binary
    n=Math.floor(n/2);
  }
  // str=str.concat(bin.reverse());
  i=0;bin=bin.reverse();
  while(i<bin.length){
    str=str+bin[i++];
  }
  while(str.length%4!=0){
    str='0'+str;
  }
console.log("Binary representation of "+num+" is "+str);
return str;
}

function swapnibbles(str){  //to swap nibbles
var i=Math.floor(str.length/4);  ///calculating number of nibbles
var str2=new Array(str.length);
var m=1;
for(j=i;j>0;j--){
  var k=1;
  while(k<=4){
    str2[4*m-k]=str[4*j-k];  //assigning values into first nibble of str2 from last nibble of str and so on
    k++;
  }
  m++;
   //   if(j==1){
  //     str2=str.substr(3)+str2;
  //   }
  // str2=str.substr(4*j-1,4*j-4)+str2;
}
//console.log(str2);
var sum=0;
i=1;
while(i<str2.length){
  sum+=Math.pow(2,i-1)*str2[str2.length-i]; //converrting into decimal
    i++;
}
console.log("Decimal representation of swapped nibbles: "+sum);
return str2;
}

function chkpowerof2(str){  //to chk power of 2
  var count=0;
  var i=0;
  while(count<2 && i<str.length){
    if(str[i++]==1){   //if number of 1's is >1 =>not a power of 2
      count++;
      if(count==2){
         console.log("Not a power of 2");
         return;
      }
    }
  }
  console.log("Power of 2");
}
