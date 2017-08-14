//driver function to print all permutation of string
function test() {
  var arr1 = new Array();
  var arr2 = new Array();
  var str = document.getElementById("stringvalue").value;
  document.write("All possible permutations of " + str + " are :<br>");
  document.write("By recursive method: <br>");
  document.write(permutRecursive(str) + "<br>");
  document.write("By iterative method: <br>");
  document.write(permutIterative(str));
  //chkng if value returned by recursive and iterative method are equal
  if (permutRecursive(str) == permutIterative(str))
    document.write("<br>" + "Array returned by recursive and iterative methods are same.");
  else {
    document.write("<br>" + "Array returned by recursive and iterative methods are not same.");
  }
}

//recursive method
function permutRecursive(string) {
  if (string.length < 2) {
    // This is our base condition
    return string;
  }
  // This array will hold our permutations
  var permutations = [];

  for (var i = 0; i < string.length; i++) {

    var char = string[i];

    // avoiding duplicates:
    if (string.indexOf(char) != i) // if char was used already
      continue; // skip it this time

    var remainingString = string.slice(0, i) + string.slice(i + 1, string.length);

    for (var subPermutation of permutRecursive(remainingString))
      permutations.push(char + subPermutation)

  }
  return permutations;
}

//iterative method
function permutIterative(str) {
  // This array will hold our permutations
  var perm = new Array();
  var str2 = str;
  var len = str.length;
  //calculating total number of permutations with each character at first position
  var m = (fact(len - 2));


  for (var j = 0; j < len; j++) {
    //extracting jth character to begining
    str2 = str.charAt(j) + str.slice(0, j) + str.slice(j + 1);
    for (var f = 0; f < m; f++) {
      perm.push(str2);
      for (var k = 1; k < len - 1; k++) {
        str2 = swap(str2, k, k + 1);
        //console.log("str2 "+str2);
        perm.push(str2);
      }

    }
  }
  return perm;
}
// function for swapping values
function swap(str, first, last) {
  return str.substr(0, first) +
    str[last] +
    str.substring(first + 1, last) +
    str[first] +
    str.substr(last + 1);
}
//function for calculating fdactorial
function fact(num) {
  if (num <= 1) {
    return 1;
  }
  var factorial = 1;
  for (i = 1; i <= num; i++) {
    factorial = factorial * i;
  }
  return factorial;
}
