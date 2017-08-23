//FUNCTION TO FIND NUMBER
function find() {
  var number = document.getElementById("userInput").value;
  var ans = "";
  //var to count number of turns
  var count = 0;
  number = Math.pow(2, number) - 1;
  left=0;
  mid = Math.floor(number / 2);
  right=number;
  alert("Lower limit is exclusive.");
  //binary search for number
  while (left<right) {
    count++;
    ans = prompt("Guessed number is between " + mid + "and " + right +
                    ".Enter Y for yes, N for no and E for Equal");
    if (ans == "Y") {
      left=mid;
      mid = Math.floor((left + right) / 2);
    }
    else if (ans == "N") {
      right = mid;
        mid = Math.floor((left + right) / 2);
    }
    //only two numbers are left
    if ((right-left)==2) {
      count++;
      ans = prompt("Guessed number is " + mid + ".Enter N for no and E for Equal");
      if (ans == 'N') {
        alert("Number is " + right);
        break;
      } else {
        alert("Number is " + mid);
        break;
      }
    }
  }
  alert("Number of turns " + count);
}
