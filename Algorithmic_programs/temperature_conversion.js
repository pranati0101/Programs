//converting from fahrenheit to celsius
function convertf() {
  var fahrenheit = document.getElementById("fahrenheit").value;
  if (fahrenheit != null) {
    var celsius1 = (fahrenheit * (5 / 9)) - (32 * (5 / 9));
    document.getElementById("celsius").value = celsius1;
  }
}
//converting from celsius to fahrenheit
function convertc() {
  var celsius = document.getElementById("celsius").value;
  console.log(celsius);
  if (celsius != null) {
    var fahrenheit1 = (celsius * 1.8) + 32;
    console.log(fahrenheit1);
    document.getElementById("fahrenheit").value = fahrenheit1;
  }
}
