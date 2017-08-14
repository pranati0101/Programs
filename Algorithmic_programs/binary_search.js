var fs = require('fs');
var value=process.argv[2];
var fname = "text.txt";
var str = "";
//reading from file
fs.readFile(fname, function(err, data) {
  if (err) {
    console.log(err);
  }
  console.log("File data : " + data);
  str = str + data;
  str=str.split(",").sort();
  console.log("Value to be searched: "+value);
  if(binarySearch(str,value,0,str.length-1)>=0){
    console.log("Found");
  }
  else{
    console.log("Not found");
  }
});

//binary search
function binarySearch(arr,value,left,right){
  if(right>=left){
  var mid=Math.floor((left+right)/2);

    if(arr[mid]==value){
      return mid;
    }
    else if(value>arr[mid]){
      return binarySearch(arr,value,mid+1,right);
    }
    else if(value<arr[mid]){
      return binarySearch(arr,value,left,mid-1);
    }
  }
  else{
    return -1;
  }
}

//when value is taken from user
// // arr = str.split(",");
// // arr.sort();
// console.log("arr :"+arr);
//console.log("value: "+value);
// function find(){
//
//   var value=document.getElementById("userInput").value;
//
//   if(binarySearch(str,value,0,str.length-1)>=0){
//     console.log("Found");
//   }
//   else{
//     console.log("Not found");
//   }
//
// }
//
