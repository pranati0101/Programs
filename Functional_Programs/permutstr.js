function test() {
  var arr1=new Array();
  var arr2=new Array();
  var str = document.getElementById("stringvalue").value;
  document.write("All possible permutations of "+str+" are :<br>");
  document.write("By recursive method: <br>");
  document.write(permutr(str)+"<br>");
  document.write("By iterative method: <br>");
  document.write(permuti(str));
  arr1.push(permutr(str));
  arr2.push(permuti(str));
  if(arr1===arr2)
    document.write("<br>"+"Array returned by recursive and iterative methods are same.");
  else {
    document.write("<br>"+"Array returned by recursive and iterative methods are not same.");
  }
}
function print(arr,len){           //printing array
  for(r=0;r<(arr.length/len);r=r+len){
  for(i=r;i<len;i++){
    document.write(arr[i]);
    }
  document.write("<br>");
  }
}

function permutr(string) {   //recursive method
  if (string.length < 2){
    return string; // This is our break condition
  }

  var permutations = []; // This array will hold our permutations

  for (var i = 0; i < string.length; i++) {
    var char = string[i];

    // avoiding duplicates:
    if (string.indexOf(char) != i) // if char was used already
      continue; // skip it this time

    var remainingString = string.slice(0, i) + string.slice(i + 1, string.length); //Note: you can concat Strings via '+' in JS

    for (var subPermutation of permutr(remainingString))
      permutations.push(char + subPermutation)

  }
  return permutations;
}

function permuti(str){   //iterative method
  var perm=new Array();
  var str2=str;
  var len=str.length;
  var m= (fact(len-2));
  console.log(m);

  for(var j=0;j<len;j++){

    str2=str.charAt(j)+str.slice(0,j)+str.slice(j+1,str.length); //extracting jth character to begining
    perm.push(str2);
    for(var f=0;f<m;f++){
    for(var k=1;k<len-1;k++){
      str2=swap(str2,k,k+1);
      //console.log("str2 "+str2);
      perm.push(str2);
    }
  }
  }
  return perm;
}

function swap(str, first, last){   //swapping values
    return str.substr(0, first)
           + str[last]
           + str.substring(first+1, last)
           + str[first]
           + str.substr(last+1);
}

function fact(num){
  var f=1;              //calculating fdactorial
  for(i=2;i<=num;i++)
    f=f*i;
  return f;
}
