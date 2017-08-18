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
//var book used to assign instantiation of hash map
var book;
//Address Book object
function addressBook() {
  book = new hashMap();
  //function to create new address book
  this.new1 = function() {
    this.book = new hashMap();
  }
}
//function to save file
function saveas(){
  var fname=document.getElementById("filename").value;
  var data=JSON.stringify(book.hm);
  fs.writeFile(fname,data,function(err){
    if(err) console.log(err);
  })
}
//function to add person
function addinbook() {
  console.log("add function");
  //getting values from text box
  var firstname = document.getElementById("firstname").value;
  var lastname = document.getElementById("lastname").value;
  var number = document.getElementById("number").value;
  var address = document.getElementById("address").value;
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  var pin = document.getElementById("pincode").value;
  //creating new person and adding to book
  var person1 = new person(firstname, lastname, number, address, city, state, pin);
  if (book == null) {
    book = new hashMap();
  }
  book.insert(person1);
  console.log("after insert");
  //adding to select list in gui
  var list = document.getElementById("selectlist");
  var opt = document.createElement("option");
  opt.text = firstname;
  list.add(opt);
  // $('#selectlist').append('<option>'+firstname+" "+lastname'</option>');
  // $('#selectlist').selectlist('refresh');
}
//function to delete person
function deletefrombook(){
  console.log("entered");
  var val = document.getElementById("selectlist").value;
  var ind=document.getElementById("selectlist").selectedIndex;
  if (val != null) {
    var list=document.getElementById("selectlist");
    list.remove(ind);
    var obj = book.search(val);
    book.remove(obj);
  }
else{
  alert("No value selected");
}
}
//function for creating dialog box at run time
// Creation of the alert message box.
function createDialog(oldnum,oldadd,oldcity,oldstate,oldpin) {
  console.log("in cd");
  var Modal = document.createElement('div');
  Modal.id = 'mymodal';
  Modal.role = 'dialog';
  Modal.className = 'modal fade show';
  document.body.appendChild(Modal);

  var dialog = document.createElement('div');
  dialog.className = 'modal-dialog';
  Modal.appendChild(dialog);

  var content = document.createElement('div');
  content.className = 'modal-content';
  dialog.appendChild(content);

  var header = document.createElement('div');
  header.className = 'modal-header';
  content.appendChild(header);

  var body1 = document.createElement('div');
  body1.className = 'modal-body';
  content.appendChild(body1);

  var node = document.createElement('div');
  node.className='form-group';
  node.innerHTML = '<label for="number">Enter Number</label>'
                    +'<input type="text" class="form-control" id="number" placeholder='+oldnum+'>'
                    +'<label for="address">Enter Address:</label>'
                    +'<input type="text" class="form-control" id="address"placeholder='+oldadd+'>'
                    +'<label for="city">Enter City:</label>'
                    +'<input type="text" class="form-control" id="city" placeholder='+oldcity+'>'
                    +'<label for="state">Enter State:</label>'
                    +'<input type="text" class="form-control" id="state"placeholder='+oldstate+'>'
                    +'<label for="pincode">Enter Pin Code:</label>'
                    +'<input type="text" class="form-control" id="pincode"placeholder='+oldpin+'>';
  body1.appendChild(node);

  var footer = document.createElement('div');
  footer.className = 'modal-footer';
  content.appendChild(footer);

  var node2= document.createElement('div');
  node2.innerHTML=' <button type="button" class="btn btn-info btn-md onclick="edit()">Done</button>'+
                   '<button type="button" class="btn btn-info btn-md" data-dismiss="modal">Cancel</button>';

  footer.appendChild(node2);

  // Show modal dialog box
  $('#mymodal').modal('toggle');
  $('#mymodal').modal('show');

}
//var to store updated values
var updatedobj=new person(null,null,null,null,null,null,null);
//flag to indicate whether object value is updated or not
var flag=false;
//function to edit Contents
function update() {
  var val = document.getElementById("selectlist").value;
  if (val == null) {
    alert("No value is selected. Please select a value.");
    return;
  }
  // var obj = book.search(val);
  console.log("entered");
  var temp=book.search(val);
  createDialog(temp.number,temp.address,temp.city,temp.state,temp.pin);
  updatedobj.firstname=temp.firstname;
  updatedobj.lastname=temp.lastname;
  //if edition is done
  if(flag==true){
    book.remove(temp);
    book.insert(updatedobj);
    console.log("update ended");
    flag=false;
  }
}
//function edit
function edit(){
  console.log("in edit()");
  var number = document.getElementById("number").value;
  var address = document.getElementById("address").value;
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  var pin = document.getElementById("pincode").value;
  updatedobj=new person(null,null,number,address,city,state,pin);
  flag=true;
  return;
}
//function to sort by name
function sortByName(){
  //remove all elements from selectlist
var list=document.getElementById("selectlist");
for(i=0;i<=list.length;i++){
  list.remove(i);
  }
  book.printHash();
  var sortedList=new Array();
  var p=0;
  //storing all objects of book in array
  for(ind=0;ind<26;ind++){

    // var item=new node(null,null);
    if((book.hm[ind].head)!=null){
      item=book.hm[ind].head;
      while(item!=null){
        if(item.obj!=null){
          sortedList.push(item.obj);
        }
        item=item.next;
      }
    }
  }

  //sortin array
    for(i in sortedList){
      for(j in sortedList){
        //comparing by last name
        if(compare(sortedList[i].lastname,sortedList[j].lastname)>0){
          temp=sortedList[i];
          sortedList[i]=sortedList[j];
          sortedList[j]=temp;
        }
        //if same t
        else if(compare(sortedList[i].lastname,sortedList[j].lastname)==0){
          //compare by first name
          if(compare(sortedList[i].firstname,sortedList[j].firstname)>0){
            temp=sortedList[i];
            sortedList[i]=sortedList[j];
            sortedList[j]=temp;
          }
          //if first name is also same
          else if(compare(sortedList[i].firstname,sortedList[j].firstname)==0){
            //compare by pin code
            if(compare(sortedList[i].pin,sortedList[j].pin)>=0){
              temp=sortedList[i];
              sortedList[i]=sortedList[j];
              sortedList[j]=temp;
            }
          }
          //else do nothing
          else{
            sortedList[i]=sortedList[i];
            sortedList[j]=sortedList[j];

          }
        }
          //else do nothing
        else{
          sortedList[i]=sortedList[i];
          sortedList[j]=sortedList[j];
          }
      }
    }
    //adding in select list
    var p=0;
    for(i in sortedList){
      var opt = document.createElement("option");
      opt.text =(sortedList[i].lastname+" "+sortedList[i].firstname);
      console.log(opt.text);
      list.add(opt);
    }

}
//function to sort by Zip
function sortByPin(){
  //remove all elements from selectlist
var list=document.getElementById("selectlist");
for(i=0;i<=list.length;i++){
  list.remove(i);
  }
  book.printHash();
  var sortedList=new Array();
  //storing all objects of book in array
  for(ind=0;ind<26;ind++){

    // var item=new node(null,null);
    if((book.hm[ind].head)!=null){
      item=book.hm[ind].head;
      while(item!=null){
        if(item.obj!=null){
          sortedList.push(item.obj);
        }
        item=item.next;
      }
    }
  }

  //sortin array
    for(i in sortedList){
      for(j in sortedList){
        //comparing by pin
        if(compare(sortedList[i].pin,sortedList[j].pin)>0){
          temp=sortedList[i];
          sortedList[i]=sortedList[j];
          sortedList[j]=temp;
        }
        //if pin is same
        else if(compare(sortedList[i].pin,sortedList[j].pin)==0){
          //compare by last name
          if(compare(sortedList[i].lastname,sortedList[j].lastname)>0){
            temp=sortedList[i];
            sortedList[i]=sortedList[j];
            sortedList[j]=temp;
          }
          //if same
          else if(compare(sortedList[i].lastname,sortedList[j].lastname)==0){
            //compare by first name
            if(compare(sortedList[i].firstname,sortedList[j].firstname)>0){
              temp=sortedList[i];
              sortedList[i]=sortedList[j];
              sortedList[j]=temp;
            }
          }
          //else do nothing
        else{
          sortedList[i]=sortedList[i];
          sortedList[j]=sortedList[j];
          }
        }
        //else do nothing
      else{
        sortedList[i]=sortedList[i];
        sortedList[j]=sortedList[j];
        }
      }
    }
    //adding in select list
    for(i in sortedList){
      var opt = document.createElement("option");
      opt.text =(sortedList[i].pin+"_"+sortedList[i].lastname+"_"+sortedList[i].firstname);
      list.add(opt);
    }
}
