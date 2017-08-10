//global array to store prime values
var p=[];
var arr=[[]];
//  printing palindromes
  console.log("Prime Palindromes: ");
  for(i=2;i<=1000;i++){
    if(prime(i)===true ){
      if(palindrome(i)==true){
        p.push(i);
        console.log(i);
      }
    }
  }

anagram();

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

function palindrome(num){
var arr=new Array();var i=0;
//converting number to array
while(num>0){
  arr[i++]=num%10;
  num=num/10;
}
//chkng palindrome condition
if(arr==arr.reverse()){
  return true;
}
}

    //chk anagram
function anagram(){
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
