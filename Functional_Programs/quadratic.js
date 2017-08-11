function test()
{
    var a = document.getElementById("a").value;
    var b = document.getElementById("b").value;
    var c = document.getElementById("c").value;
    var delta=b*b-(4*a*c);
    if(delta<0){
      document.write("Imaginary roots.");
      return;
    }
    var root1=(-b+Math.sqrt(delta))/(2*a);
    var root2=(-b-Math.sqrt(delta))/(2*a);
    window.confirm("Roots are :"+root1+" and "+root2);
}
