//FUNCTION TO FIND NUMBER
function find(){
  var number=document.getElementById("userInput").value;
  var n=number;
  var ans="";
  //var to count number of turns
  var k=0;
  number=Math.pow(2,number)-1;
  mid=Math.floor(number/2);
  alert("Lower limit is exclusive.");
  //binary search for number
  while(mid!=number){
    ans=prompt("Guessed number is between "+mid+"and "+number+".Enter Y for yes, N for no and E for Equal");
    if(ans=="Y"){
      mid=Math.round((mid+number)/2);
    }
    if(ans=="N"){
      number=mid;
      mid=Math.round(mid/2);
    }
    //only two numbers are left
    if(number-mid<2){
      if(mid==number){
        alert("Number is "+number);
        k++;
        break;
      }
      ans=prompt("Guessed number is "+mid+".Enter Y for yes, N for no and E for Equal");
      if(ans=='N'){
        alert("Number is "+number);
        k++;
        break;
      }
      else{
          alert("Number is "+mid);
          k++;
          break;
      }
    }
    k++;
  }
  console.log("Number of turns "+k);
}
