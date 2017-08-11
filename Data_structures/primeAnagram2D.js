var p=new Array();
var result=new Array();
var flag=true;
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

//storing prime numbers
for(i=2;i<1000;i++){
  if(prime(i)==true){
    p.push(i);
  }
}
//chk anagram
function anagramf(){
//storing anagram and non anagram numbers in 2 D array
  result[0]=new Array();
  result[1]=new Array();

  for(j=0;j<p.length-1;j++){
    //extracting numbers from p array
  var m=p[j]+"";
  m=m.split("").sort().join("");
  for(k=j+1;k<p.length;k++){
    var n=p[k]+"";
    n=n.split("").sort().join("");
    //chkng for anagram condition
    if(p[k]!=null && m==n){
      result[1].push(p[k]);
      p[k]=null;
      flag=false;
    }
  }
  if(flag==false){
    result[1].push(p[j]);
    p[j]=null;
    flag=true;
  }
  }
  //storing anagram and non anagram numbers in 2 D array
for(n=0;n<p.length;n++){
  if(p[n]!=null){
    result[0].push(p[n]);
   }
}
//printing result array
console.log("Non anagram: : "+result[0]);
console.log("Anagram: : "+result[1]);
}
  //calling anagram function
anagramf();
