//array to store coupon numbers
var array = [];
//var to store number of random numbers
var randNumber = 0;
var num = 0;
//driver  fun ction
function test() {
  var number = document.getElementById("userInput").value;
  while (array.length != number) {
    num = Math.floor(Math.random() * 100);
    randNumber++;
    if (check(array, num) == true)
      array.push(num);
  }
  alert("Total random numbers needed is " + randNumber + ".");
  console.log(array);
}
//function to chk if num is present already in the array
function check(array, num) {
  for (i = 0; i < array.length; i++)
    if (array[i] == num){
          return false;
    }
  return true;
}
