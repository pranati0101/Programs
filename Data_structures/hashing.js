function compare(a, b) {
  return b - a
}


function hashMap() {
  this.length = 0;
  this.hm = new Array();
  //creating linked list at each index or slot
  for (i = 0; i < 11; i++) {
    this.hm[i] = new linkedList();
  }
}

//for adding elements in hash Map
hashMap.prototype.insert = function(data) {
  //increase the length
  this.length++;
  //calculating slot
  var slot = Math.floor(data % 11);
  //inserting element in linked list present at that slot
  this.hm[slot].add(data);
};

//for removing element in hashMap
hashMap.prototype.remove= function(data){
  var slot=Math.floor(data%11);
  this.hm[slot].remove(data);
}

//for printing hash Map
hashMap.prototype.printHash = function() {
  for (var i = 0; i < 11; i++) {
    if(this.hm[i].head!=null){
      console.log(i+": "+this.hm[i].print());

    }

  }
};

// list node structure
function node(data, next) {
  this.data = data;
  this.next = null;
};

//linked list structure
function linkedList() {

  this.head = null;
  this.end = null;
  this.number = 0;

}

//for adding node to the list
linkedList.prototype.add = function(data) {
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
linkedList.prototype.remove = function(item) {
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

//function to print linked list
linkedList.prototype.print = function() {
  var string = '';
  var current = this.head;
  while (current) {
    string += current.data + ' ';
    current = current.next;
  }
  return(string.trim());

};

// var h1 = new hashMap();
// h1.insert(1);h1.insert(82);h1.insert(36);h1.insert(43);h1.insert(95);h1.insert(66);h1.insert(7);
// h1.insert(88);h1.insert(99);h1.insert(10);h1.insert(77);
// h1.printHash();
var fs = require('fs');
var value = process.argv[2];
var fname = "text1.txt";
var str = "";
var h1 = new hashMap();
//reading from file
fs.readFile(fname, function(err, data) {
  if (err) {
    console.log(err);
  }
//storing data from file to str
  str += data;
  str = str.trim().split(",");
  //inserting in hash map
  for (var i = 0; i < str.length; i++) {
    h1.insert(str[i]);
  }
//operations
  h1.printHash();
  h1.remove(value);
  h1.printHash();

  str="";
  //taking values from hash map
  for (i = 0; i <11; i++) {
    if(h1.hm[i].head!=null){
        str+=(h1.hm[i].print().split(" ").join(","))+",";
    }
  }
 //console.log(str);
  console.log("writing to file");
  //writing into file
  fs.writeFile(fname, str, function(err) {
    if (err) {
      console.log(err);
    }
  });

});
