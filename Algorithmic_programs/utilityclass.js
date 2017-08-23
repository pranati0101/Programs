//input from cmd line
arr=new Array();
arr.push(process.argv[2]);
arr.push(process.argv[3]);
arr.push(process.argv[4]);
arr.push(process.argv[5]);

var time=new Array();
//arr=[09,43,78,1,98,37,56];
console.log("Insertion sort: ");
insertionsort(arr);
console.log("Bubble sort: ");
bubblesort(arr);
console.log("Binary Search: ");
binarySearch(arr,"aman");
bubblesort(time);
//bubblesort function
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
  time.push(td);
  console.log("Elapsed time for bubble sort "+td+" nanoseconds");
}
//insertion sort
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
    time.push(td);
  console.log("Elapsed time for insertion sort "+td+" nanoseconds");
}
//binary search function
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
      time.push(td);
    console.log("Elapsed time for binary search "+td+" nanoseconds");

}

//function for binary search by iterative method
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
