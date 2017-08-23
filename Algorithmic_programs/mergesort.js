//input from cmd line
arr=new Array();
arr.push(process.argv[2]);
arr.push(process.argv[3]);
arr.push(process.argv[4]);
arr.push(process.argv[5]);
// arr = ["ram","shyam","aman","lakshman"];
console.log("Sorted list is " + mergesort(arr));

//merge sort function
function mergesort(arr) {
  var left = [],
    right = [],
    leftindex=0,
    rightindex=arr.length;
  if (arr.length < 2) {
    //if only 2 or less than 2 elements are present, return array
    return arr;
  }
  else {
    //cal middle index
    m = Math.floor(arr.length / 2);
    i = 0, j = 0;
    //copying first half into left
    while (i < m) {
      left[i] = arr[i];
      i++;
    }
//copying second half into right
    while (i < rightindex) {
      right[j] = arr[i];
      j++;
      i++;
    }
    // left = arr.slice(l, m);
    // right = arr.slice(m, r);
    left = mergesort(left);
    right = mergesort(right);
    return merge(left, right);
    //return merge(mergesort(left), mergesort(right));
  }
}
//for merging arrays
function merge(left, right) {
  var result = new Array();
  var i = 0,
    j = 0;
  while (i < left.length || j < right.length) {
    if (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    } else if (i < left.length) {
      result.push(left[i]);
      i++;
    } else if (j < right.length) {
      result.push(right[j]);
      j++;
    }
  }
  return result;
}
