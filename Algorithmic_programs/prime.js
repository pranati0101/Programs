//printing prime in the range 0-1000
for (i = 2; i <= 1000; i++) {
  if (prime(i) === true)
    console.log(i);
}

//function to check prime
function prime(num) {
  if (num == 2 || num == 3) {
    return true;
  }
  if (num % 2 == 0 || num % 3 == 0)
    return false;
  for (var i = 2; i < Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}
