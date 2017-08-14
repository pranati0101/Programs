//global array to store prime values
var p=[];
test();
 //printing desired numbers
 function test(){
   console.log("in test function");
   console.log("Prime Palindromes: ");
   for(var i=2;i<1000;i++){
     if(prime(i)==true ){
       p.push(i);
       if(palindrome(i)==true){
         console.log(i);
       }
     }
   }
 anagram();
 }

//console.log(palindrome(2));

//function to check prime
function prime(num){
  if(num<2){
    return false;
  }
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
//function to chk palindrome
function palindrome(num){
var arr=new Array();

//converting number to array
while(num>0){
  arr.push(Math.floor(num%10));
  num=Math.floor(num/10);
}
if(arr.length<2){
  return false;
}
//chkng palindrome condition
for(i=0;i<Math.floor(arr.length/2);i++){
  if(arr[i]!=arr[arr.length-1-i]){
    return false;
  }
}
return true;
}

    //chk anagram
function anagram(){
  var arr=[[]];
  //extracting element from p[] and sort
    for(j=0;j<p.length;j++){
    var m=p[j]+"";
    m=m.split("").sort().join("");
    arr[j]=m;
  }
  console.log("anagrams: ");

  for(j=0;j<arr.length-1;j++){
    var ana=[];
    for(k=j+1;k<arr.length;k++){
      if(arr[j]===arr[k]){

        ana.push(p[k]);
      }
    }
    if(ana != ""){
      ana.push(p[j]);
      console.log(ana);
    }
  }
  }
