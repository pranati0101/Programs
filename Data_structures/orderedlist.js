//taking input from file
var fs = require('fs');
var value = process.argv[2];
var fname = "text1.txt";
var str = "";
var list1 = new list();
//function for comparing
function compare(a, b) {
  return b - a
}
//reading from file
fs.readFile(fname, function(err, data) {
  if (err) {
    console.log(err);
  }

  str += data;
  str = str.trim().split(",");
  str = str.sort(compare);

  for (var i = 0; i < str.length; i++) {
    list1.add(str[i]);
  }

  list1.print();
  list1.remove(value);
  list1.print();

//converting content of list to string
  var ptr = list1.head;
  str = [];
  for (i = 0; i < list1.number; i++) {
    str.push(ptr.data);
    ptr = ptr.next;
  }
  str = str.join(",");
  console.log("writing to file");
  //writing into file
  fs.writeFile(fname, str, function(err) {
    if (err) {
      console.log(err);
    }
  });

});

// list node structure
function node(data, next) {
  this.data = data;
  this.next = null;
};
//linked list structure
function list() {

  this.head = null;
  this.end = null;
  this.number = 0;

}
//for adding node to the list
list.prototype.add = function(data) {
  var node1 = new node(data, null);
  var ptr = this.head;
  if (this.head == null) {
    //no nodes are present before
    this.head = node1;
    this.end = node1;
    //increment the nummber of nodes
    this.number++;
    return;
  } else {
    if (compare(this.head.data, node1.data)) {
      //inserting at beginning
      node1.next = this.head;
      this.head = node1;
      this.number++;
      return;
    }
    //searching apt position
    while (ptr.next != null) {
      if (compare(ptr.next.data, node1.data)) {
        node1.next = ptr.next;
        ptr.next = node1;
        this.number++;
        return;
      }
      ptr = ptr.next;
    }
    // inserting at last at last
    this.end.next = node1;
    this.end = node1;
    this.number++;
    return;
  }

};
//for removing the item
list.prototype.remove = function(item) {
  var ptr;
  ptr = this.head;
  //value at beginning of list
  if (ptr.data == item) {
    this.head = ptr.next;
    this.number--;
    return;
  }
  while (ptr.next != null) {
    if (ptr.next.data == item) {
      // present at the last
      if (ptr.next.next == null) {
        this.end = ptr;
        ptr.next = null;
        this.number--;
        return;
      }
      // other cases
      else {
        ptr.next = ptr.next.next;
        this.number--;
        return;
      }
    }
    //traverse untill item is found or you reach at the last of the list
    ptr = ptr.next;
  }

  console.log("data not found");
  this.add(item);
  console.log("added to list");

};
//for printing the list
list.prototype.print = function() {
  var string = '';
  var current = this.head;
  while (current) {
    string += current.data + ' ';
    current = current.next;
  }
  console.log(string.trim());
};
