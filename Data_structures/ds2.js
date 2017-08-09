var fs = require('fs');
var value = process.argv[2];
var fname = "text1.txt";
var str = "";
var l1 = new list();
function compare(a, b){return b-a}

fs.readFile(fname, function(err, data) {  //reading from file
  if (err) {
    console.log(err);
  }
  // console.log("data :"+data);
  str+=data;
  str=str.trim().split(",");
  str=str.sort(compare);
  //console.log(typeof str);
  //console.log("after sort: "+str.split(",").sort());
  // console.log("str : "+str);
  for(var i=0;i<str.length;i++){
    // console.log("Adding "+str[i]+"to the list");
    l1.add(str[i]);
    // console.log("List :");
    //  l1.print();
  }
  // console.log("final list");
  l1.print();
  l1.remove(value);
  l1.print();
  // console.log("head data "+l1.head.data);
  //   console.log("end data "+l1.end.data);
  var ptr=l1.head;str=[];
  for(i=0;i<l1.number;i++){
    str.push(ptr.data);
    ptr=ptr.next;
  }
  str=str.join(",");
  console.log("writing to file");
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
  var ptr=this.head;
  if (this.head == null) {
    // console.log("adding for first time");        //no nodes are present before
    this.head = node1;
    this.end = node1;
    this.number++;             //increment the nummber of nodes
    return;
  }
   else {
     if(compare(this.head.data,node1.data)){
      //inserting at beginning
       node1.next=this.head;
       this.head=node1;
       this.number++;             //increment the nummber of nodes
       return;
     }
    while(ptr.next!=null){         //searching apt position
      if(compare(ptr.next.data,node1.data)){
        // console.log("in else loop"+ptr.data+" "+data);
        node1.next=ptr.next;
        ptr.next=node1;
        this.number++;           //increment the nummber of nodes
        return;
      }
      ptr=ptr.next;
    }
    // console.log("out of loop"+ptr.data+" "+data);
    this.end.next = node1; // inserting at last at last
    this.end = node1;
    this.number++;           //increment the nummber of nodes
    return;
  }

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
