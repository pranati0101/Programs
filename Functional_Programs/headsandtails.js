var tails = 0;
var heads = 0;
//function to calculate percent of heads and tails
function test() {
  var flip = document.getElementById("userInput").value;
  if (flip <= 0) {
    window.alert("Enter positive integer.");
    return;
  }
  for (i = 0; i < flip; i++) {
    var r = Math.random();
    if (r < 0.5)
      tails++;
    else
      heads++;
  }
  var percent = (heads / (tails + heads)) * 100;

  document.write("Percentage of head vs tail is " + Math.round(percent) + "%.");
}
