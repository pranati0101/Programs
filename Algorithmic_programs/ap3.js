var p=[];  //global array to store prime values
function node(){

}
var arr=[[]];
//  printing palindromes
  console.log("Prime Palindromes: ");
  for(i=2;i<=1000;i++){
    if(prime(i)===true ){
      p.push(i);
      if(palindrome(i)==true){
        console.log(i);
      }
    }
  }

anagram();


function prime(num){
  if(num==2 || num==3){
        return true;   //function to check prime
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
while(num>0){  //converting number to array
  arr[i++]=num%10;
  num=num/10;
}
if(arr==arr.reverse()){  //chkng palindrome condition
  return true;
}
}


function anagram(){
            //chk anagram
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
        //console.log(p[k]);
        ana.push(p[k]);
      }
    }
    if(ana != ""){
      ana.push(p[j]);
      console.log(ana);
    }
  }

  }
