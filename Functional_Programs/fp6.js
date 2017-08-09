function test() {
  var n = document.getElementById("userInput").value;
  if (n == 2 || n == 3) {
    document.write(n + "\n");
  } else {
    for (var i = 2; i <= n; i++) {
      if (n % i == 0) {
        if (prime(i) == true) {
          document.write(i + "  ");
        }
      }
    }
  }
}

function prime(num) {
  if (num == 2 || num == 3)
    return true; //function to check prime
  if (num % 2 == 0 || num % 3 == 0)
    return false;
  for (var i = 2; i < Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}
