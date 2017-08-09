function test() {
  var m = document.getElementById("m").value;
  var n = document.getElementById("n").value;
  var arr = new Array();
  for (i = 0; i < m; i++) {
    arr[i]=new Array(n);
    for(j=0;j<n;j++){
      arr[i][j]=parseInt(prompt("Enter integer value."));
    }
  }
  for (i = 0; i < m; i++) {
    for (j = 0; j < n; j++)
      document.write(arr[i][j] + "\n");
    document.write("<br>");
  }
}
