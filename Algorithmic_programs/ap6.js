var fs = require('fs');
var value=process.argv[2];
var fname = "text.txt";
var str = "";
fs.readFile(fname, function(err, data) {
  if (err) {
    console.log(err);
  }
  console.log("data : " + data);
  str = str + data;
  str=str.split(",").sort();
  console.log("str: " + str);
  console.log("value: "+value);
  if(binarySearch(str,value,0,str.length-1)>=0){
    console.log("Found");
  }
  else{
    console.log("Not found");
  }
});

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
function binarySearch(arr,value,l,r){

  if(r>=l){
  var mid=Math.floor((l+r)/2);

    if(arr[mid]==value){
      return mid;
    }
    else if(value>arr[mid]){
      return binarySearch(arr,value,mid+1,r);
    }
    else if(value<arr[mid]){
      return binarySearch(arr,value,l,mid-1);
    }
  }
  else{
    return -1;
  }
}
