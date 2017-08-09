function find(){
  var n=document.getElementById("userInput").value;
  var ans="";
  n=Math.pow(2,n)-1;
  mid=Math.floor(n/2);
  var k=0;
  while(ans!="E"){
    ans=prompt("Guessed number is "+mid+".Enter H for higher, L for Lower and E for Equal");
    if(ans=="H"){
      mid=Math.floor((mid+n)/2);
    }
    if(ans=="L"){
      n=mid;
      mid=Math.round(mid/2);
    }
    k++;
  }
  console.log("Number of turns "+k);
}
