//arr=new Array();
arr = ["ram", "shyam", "aman", "zayn"];
//arr=[09,43,78,1,98,37,56];
//insertionsort(arr);
//bubblesort(arr);
binarySearch(arr,"aman");

function bubblesort(data) {
  // var startTimeBubble= new Date();
  var startTimeBubble= process.hrtime();
  for (j = 0; j < arr.length; j++) {
    for (k = j + 1; k< arr.length; k++) {
      if (arr[j] < arr[k]) {
        temp = arr[j];
        arr[j] = arr[k];
        arr[k] = temp;
      }
    }
  }
  console.log(arr);
  var endTimeBubble= process.hrtime();
  var td=(endTimeBubble[1]-startTimeBubble[1]);
  console.log("Elapsed time for bubble sort "+td+" nanoseconds");
}

function insertionsort(arr) {
  var startTime= process.hrtime();
  for (i = 1; i < arr.length; i++) {
    temp = arr[i];
    j = i - 1;
    while (j >= 0 && arr[j] < temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
  console.log(arr);
  var endTime= process.hrtime();
  var td=(endTime[1]-startTime[1]);
  console.log("Elapsed time for insertion sort "+td+" nanoseconds");
}

function binarySearch(arr,value){
    insertionsort(arr);
    arr=arr.reverse();
    var startTime= process.hrtime();
    console.log(arr);
    var index=binarySearchUtil(arr,value,0,arr.length-1)+1;
    if(index==-1){
      console.log("No such data exists!");
    }
    else{
      console.log(value+" Data found at "+index+"th position.");
    }
    var endTime= process.hrtime();
    var td=(endTime[1]-startTime[1]);
    console.log("Elapsed time for binary search "+td+" nanoseconds");

}
//
// function binarySearchUtil(arr,value,l,r){
//   if(r>=l){
//   var mid=Math.round((l+r)/2);
//     if(arr[mid]==value){
//       console.log("found "+mid);
//       return mid;
//     }
//     else if(arr[mid]<value){
//       return binarySearchUtil(arr,value,mid+1,r);
//     }
//     else if(arr[mid]<value){
//       return binarySearchUtil(arr,value,l,mid-1);
//     }
//   }
//   else{
//     return -1;
//   }
// }

function binarySearchUtil(arr,value,l,r){

  var mid=Math.round((l+r)/2);
  while(r>=l && arr[mid]!=value){
     mid=Math.round((l+r)/2);
    if(value>arr[mid]){
      l=mid+1;
    }
    if(value<arr[mid]){
      r=mid-1;
    }
  }
  if(arr[mid]==value){
    return mid;
  }
  else{
    return -1;
  }

}
