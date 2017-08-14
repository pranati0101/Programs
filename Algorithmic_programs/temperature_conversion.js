//converting from fahrenheit to celsius
function convertf() {
  var fahrenheit = document.getElementById("f").value;
  if (fahrenheit != null) {
    var celsius1 = (fahrenheit * (5 / 9)) - (32 * (5 / 9));
    document.getElementById("c").value = celsius1;
  }
}
//converting from celsius to fahrenheit
function convertc() {
  var celsius = document.getElementById("c").value;
  console.log(celsius);
  if (celsius != null) {
    var fahrenheit1 = (celsius * 1.8) + 32;
    console.log(fahrenheit1);
    document.getElementById("f").value = fahrenheit1;
  }
}
