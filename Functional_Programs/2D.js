//STORE 2D ARRAY
function twodarray() {
  var rows = document.getElementById("m").value;
  var cols = document.getElementById("n").value;
  var array = new Array();
  for (i = 0; i < rows; i++) {
    array[i]=new Array(cols);
    for(j=0;j<cols;j++){
      array[i][j]=parseInt(prompt("Enter integer value."));
    }
  }
  //printing 2d array
  for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++)
      document.write(array[i][j] + "\n");
    document.write("<br>");
  }
}
