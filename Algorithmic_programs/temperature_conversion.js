//converting from fahrenheit to celsius
function convertf() {
  var f = document.getElementById("f").value;
  if (f != null) {
    var c1 = (f * (5 / 9)) - (32 * (5 / 9));
    document.getElementById("c").value = c1;
  }
}
//converting from celsius to fahrenheit
function convertc() {
  var c = document.getElementById("c").value;
  console.log(c);
  if (c != null) {
    var f1 = (c * 1.8) + 32;
    console.log(f1);
    document.getElementById("f").value = f1;
  }
}
