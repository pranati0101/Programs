//person object to be stored in address book
function person(firstname,lastname,number,address,city,state,pin){
  this.firstname=firstname;
  this.lastname=lastname;
  this.number=number;
  this.address=address;
  this.city=city;
  this.state=state;
  this.pin=pin;
}
//function for comparing
function compare(a, b) {
  return b - a
}
//data structure used is hashMap using linked list
// list node structure
function node(obj, next) {
  this.obj = obj;
  this.next = null;
};

//linked list structure
function linkedList() {
  this.head = null;
  this.end = null;
  this.length = 0;
}

//for adding node to the list
linkedList.prototype.add = function(obj) {
  var node1 = new node(obj, null);
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
  this.length++;
};

//for removing the item
linkedList.prototype.remove = function(item) {
  var ptr;
  ptr = this.head;
  //value at beginning of list
  if (ptr.obj.number == item.number) {
    this.head = ptr.next;
    this.length--;
    return;
  }
  while (ptr.next != null) {
    if (ptr.next.obj.number == item.number) {
      // present at the last
      if (ptr.next.next == null) {
        this.end = ptr;
        ptr.next = null;
        this.length--;
        return;
      }
      // other cases
      else {
        ptr.next = ptr.next.next;
        this.length--;
        return;
      }
    }
    //traverse untill item is found or you reach at the last of the list
    ptr = ptr.next;
  }
};
// /for searching the item
linkedList.prototype.search = function(item) {
  var ptr;
  ptr = this.head;
  //value at beginning of list
  if (ptr.obj.firstname == item) {
    return ptr.obj;
  }
  while (ptr.next != null) {
    if (ptr.obj.firstname == item) {
      return ptr.obj;
    }
    //traverse untill item is found or you reach at the last of the list
    ptr = ptr.next;
  }
  console.log("not found");
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

//implementing hash map
function hashMap() {
  this.length = 0;
  this.hm = new Array();
  //creating linked list at first slot
  for(i=0;i<26;i++){
    this.hm[i]=(new linkedList());
  }
}

//for adding elements in hash Map
hashMap.prototype.insert = function(obj) {
  //increase the length
  this.length++;
  //calculating slot
  var slot =(obj.firstname.charCodeAt(0))-65;
  //inserting element in linked list present at that slot
  this.hm[slot].add(obj);
};

//for removing element in hashMap
hashMap.prototype.remove= function(obj){
  var slot =(obj.firstname.charAt(0))-65;
  this.hm[slot].remove(obj);
}
//for searching value
hashMap.prototype.search= function(name){
  var slot =(name.charAt(0))-65;
  var obj=this.hm[slot].search(name);
  return obj;
}
//for printing hash Map
hashMap.prototype.printHash = function() {
  for (i in this.hm) {
    if(this.hm[i].head!=null){
      console.log(i+": "+this.hm[i].print());
    }
  }
};
//var book used to assign instantiation of hash map
var book;
//Address Book object
function addressBook(){
book=new hashMap();
  //function to create new address book
  this.new1=function(){
    this.book=new hashMap();
  }
}
//function to add person
add=function(){
  console.log("in add");
  //getting values from text box
  var firstname=document.getElementById("firstname").value;
  console.log(firstname);
  var lastname=document.getElementById("lastname").value;
  var number=document.getElementById("number").value;
  var address=document.getElementById("address").value;
  var city=document.getElementById("city").value;
  var state=document.getElementById("state").value;
  var pin=document.getElementById("pincode").value;
  //creating new person and adding to book
  var person1=new person(firstname,lastname,number,address,city,state,pin);
  if(book==null){
    console.log("book cr");
    book=new hashMap();
  }
  book.insert(person1);
  console.log("f");
  //adding to select list in gui
  var list=document.getElementById("selectlist");
  var opt=document.createElement("option");
  opt.text=firstname;
  list.add(opt);
  console.log("c");
}
//function to edit Contents
function update(){
  var val=document.getElementById("selectlist").value;
  if(val !=null){
    var temp=book.search(val);
    
  }

}
