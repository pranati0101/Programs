var fs = require('fs');
var value = process.argv[2];
var fname = "text.txt";
var str = "";
var l1 = new list();

fs.readFile(fname, function(err, data) {  //reading from file
  if (err) {
    console.log(err);
  }
  // console.log("data :"+data);
  str+=data;
  str=str.trim().split(",");
  // console.log(str);
  for(var i=0;i<str.length;i++){
    l1.add(str[i]);
  }
  l1.print();
  l1.remove(value);
  l1.print();

  var ptr=l1.head;str=[];
  for(i=0;i<l1.number;i++){
    str.push(ptr.data);
    ptr=ptr.next;
  }
  str=str.join(",")
  fs.writeFile(fname,str,function(err){   //writing into file
    if (err) {
      console.log(err);
    }
  });

});

// l1.print();
function node(data, next) {
  this.data = data; // list node structure
  this.next = null;
};

function list() { //linked list structure

  this.head = null;
  this.end = null;
  this.number = 0;

}
//for adding node to the list
list.prototype.add = function(data) {
  var node1 = new node(data, null);
  if (this.head == null) { //no nodes are present before
    this.head = node1;
    this.end = node1;
  } else {
    this.end.next = node1; //if nodes are present, add at last
    this.end = node1;
  }
  this.number++; //increment the nummber of nodes
};
//for removing the item
list.prototype.remove = function(item) {
  var ptr;
  ptr = this.head;

  if (ptr.data == item) { //value at beginning of list
    this.head = ptr.next;
    this.number--;
    return;
    }
  while (ptr.next != null) {
    if (ptr.next.data == item) {
      if (ptr.next.next == null) { // present at the last
        this.end = ptr;
        ptr.next = null;
        this.number--;
        return;
      }
      else {
          ptr.next = ptr.next.next; // other cases
          this.number--;
          return;
        }
  }
    ptr = ptr.next; //traverse untill item is found or you reach at the last of the list
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



// for(var i=1;i<=5;i++){
//     l1.add(i);
//   }
//   l1.print();
//   l1.remove(3);
//   l1.print();
//   l1.remove(9);
//   l1.print();
//   l1.remove(1);
//   l1.print();
//   l1.remove(5);
//   l1.print();
