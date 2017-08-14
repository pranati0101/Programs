//calculate distance from origin
function test() {
  var x = document.getElementById("x").value;
  var y = document.getElementById("y").value;
  var distance=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    alert("Distance: "+distance);
}
