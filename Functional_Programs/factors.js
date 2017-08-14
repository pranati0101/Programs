//print prime factors
function test() {
  var number = document.getElementById("userInput").value;
  if (number == 2 || number == 3) {
    document.write(number + "\n");
  } else {
    for (var i = 2; i <= number; i++) {
      if (number % i == 0) {
        if (prime(i) == true) {
          document.write(i + "  ");
        }
      }
    }
  }
}
//function to check prime
function prime(num) {
  if (num == 2 || num == 3)
    return true;
  if (num % 2 == 0 || num % 3 == 0)
    return false;
  for (var i = 2; i < Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}
