var fs = require('fs');
var value = process.argv[2];
var fname = "text.txt";
var str = "";
var l1 = new list();

//reading from file
fs.readFile(fname, function(err, data) {
  if (err) {
    console.log(err);
  }
  // console.log("data :"+data);
  str += data;
  str = str.trim().split(",");
  // console.log(str);
  for (var i = 0; i < str.length; i++) {
    l1.add(str[i]);
  }
  l1.print();
  l1.remove(value);
  l1.print();

  var ptr = l1.head;
  str = [];
  for (i = 0; i < l1.number; i++) {
    str.push(ptr.data);
    ptr = ptr.next;
  }
  str = str.join(",");
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
  //no nodes are present before
  if (this.head == null) {
    this.head = node1;
    this.end = node1;
  }
  //if nodes are present, add at last
  else {
    this.end.next = node1;
    this.end = node1;
  }
  //increment the nummber of nodes
  this.number++;
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
