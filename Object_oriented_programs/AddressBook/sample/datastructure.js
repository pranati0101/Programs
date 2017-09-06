//person object to be stored in address book
function person(firstname, lastname, number, address, city, state, pin) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.number = number;
  this.address = address;
  this.city = city;
  this.state = state;
  this.pin = pin;
}
//function for comparing
function compare(a, b) {
  return (b - a);
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
  console.log("in insert linked list");
  //no nodes are present before
  if (this.head == null) {
      console.log("first insert");
    this.head = node1;
    this.end = node1;
    this.length++;
    return;
  }
  //if nodes are present, add at last
  else {
    var temp=new node(null,null);
    var prev=new node(null,null);
    temp=this.head;
    prev=this.head;
    if(compare(temp.obj.firstname,node1.obj.firstname)>0){
      node1.next=temp;
      this.head=node1;
      this.length++;
      return;
    }
    //iterating till temp reaches last node
    while(temp.next!=null){
      temp=temp.next;
      //add after temp
      if(compare(temp.obj.firstname,node1.obj.firstname)>0){
        node1.next=temp.next;
        temp.next=node1;
        this.length++;
        return;
      }
      //same last names
      else if(compare(temp.obj.firstname,node1.obj.firstname)==0){
        //compare by first name
        //add after temp
        if(compare(temp.obj.lastname,node1.obj.lastname)>0){
          node1.next=temp.next;
          temp.next=node1;
          this.length++;
          return;
        }
        //add before temp
        else if(compare(temp.obj.lastname,node1.obj.lastname)<0){
          node1.next=prev.next;
          prev.next=node1;
          this.length++;
          return;
        }
        //same first name
        //compare by pin code
        else{
          //add after temp
          if(compare(temp.obj.pin,node1.obj.pin)>0){
            node1.next=temp.next;
            temp.next=node1;
            this.length++;
            return;
          }
          //other cases add before temp
          else{
              node1.next=temp.next;
              temp.next=node1;
              this.length++;
              return;
        }
      }
    }
    //incrementing prev pointer
          prev=prev.next;
  }
  //no position found add at last
  this.end.next = node1;
  this.end = node1;
  //increment the nummber of nodes
  this.length++;
}
};

//for removing the item
linkedList.prototype.remove = function(item) {
  var ptr;
  ptr = this.head;
  //value at beginning of list
  if ((ptr.obj.firstname == item.firstname) && (ptr.obj.lastname == item.lastname)) {
    this.head = ptr.next;
    this.length--;
    return;
  }
  while (ptr.next != null) {
    // present at the last
    if (ptr.next.next == null) {

        if ((ptr.next.obj.firstname == item.firstname) && (ptr.next.obj.lastname == item.lastname)) {
      this.end = ptr;
      ptr.next = null;
      this.length--;
      return;
    }
    }
      if ((ptr.obj.firstname == item.firstname) && (ptr.obj.lastname == item.lastname)) {
        ptr.next = ptr.next.next;
        this.length--;
        return;
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
  while (ptr.obj!=null) {
    //traverse untill item is found or you reach at the last of the list
    ptr = ptr.next;
    if (ptr.obj.firstname == item) {
      return ptr.obj;
    }
  }
  console.log("not found");
};

//function to print linked list
linkedList.prototype.print = function() {
  var string = '';
  var current = this.head;
  while (current) {
    string += JSON.stringify(current.obj) + ' ';
    current = current.next;
  }
  return (string.trim());
};

//implementing hash map
function hashMap() {
  this.length = 0;
  this.hm = new Array();
  //creating linked list at first slot
  for (i = 0; i < 26; i++) {
    this.hm[i] = (new linkedList());
  }
}

//for adding elements in hash Map
hashMap.prototype.insert = function(obj) {
  //increase the length
  this.length++;
  //calculating slot
  var slot = (obj.firstname.charCodeAt(0))-65;
  //inserting element in linked list present at that slot
  this.hm[slot].add(obj);
};

//for removing element in hashMap
hashMap.prototype.remove = function(obj) {
  var slot = (obj.firstname.charCodeAt(0)) - 65;
  console.log(slot);
    console.log("hash remove "+this.hm[slot]);
  this.hm[slot].remove(obj);
}
//for searching value
hashMap.prototype.search = function(name) {
  var slot = (name.charCodeAt(0))-65;
  var obj = this.hm[slot].search(name);
  console.log("object "+obj);
  return obj;
}
//for printing hash Map
hashMap.prototype.printHash = function() {
  for (i in this.hm) {
    if (this.hm[i].head != null) {
      console.log(i + ": " + this.hm[i].print());
    }
  }
};
