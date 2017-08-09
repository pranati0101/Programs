arr = ["ram","shyam","aman","lakshman"];
//console.log(mergesort(arr));
console.log("Sorted list is " + mergesort(arr));

function mergesort(arr) {
  var left = [],
    right = [],
    l = 0,
    r = arr.length;
  if (arr.length < 2) {
    return arr; //if only 2 or less than 2 elements are present, return array
  } else {
    m = Math.floor(arr.length / 2); //cal middle index
    i = 0, j = 0;
    while (i < m) {

      left[i] = arr[i];
      i++; //copying first half into left
    }

    while (i < r) {
      //copying second half into right
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
