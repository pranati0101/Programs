//var book used to assign instantiation of hash map
var book;
//function to add person
function addinbook() {
  console.log("add function");
  //if added for the first time and no file is opened
  if (book == null) {
    book = new hashMap();
  }
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
function deletefrombook() {
  console.log("entered");
  var val = document.getElementById("selectlist").value;
  console.log(val);
  var ind = document.getElementById("selectlist").selectedIndex;
  if (val != null) {
    var list = document.getElementById("selectlist");
    list.remove(ind);
    var obj = book.search(val);
    book.remove(obj);
    console.log(JSON.stringify(book));
  } else {
    alert("No value selected");
  }
}
//function for creating dialog box at run time
// Creation of the alert message box.
function createDialog(oldfname, oldlname, oldnum, oldadd, oldcity, oldstate, oldpin) {
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
  node.className = 'form-group';
  node.innerHTML = ' <label for="mfirstname">First Name</label>' +
    '<input type="text" class="form-control" id="mfirstname" disabled=true placeholder=' + oldfname + '>' +
    '<label for="mlastname">Last Name</label>' +
    '<input type="text" class="form-control" id="mlastname" disabled=true placeholder=' + oldlname + '>' +
    ' <label for="mnumber">Enter nummber</label>' +
    '<input type="text" class="form-control" id="mnumber" placeholder=' + oldnum + '>' +
    '<label for="maddress">Enter Address:</label>' +
    '<input type="text" class="form-control" id="maddress"placeholder=' + oldadd + '>' +
    '<label for="mcity">Enter City:</label>' +
    '<input type="text" class="form-control" id="mcity" placeholder=' + oldcity + '>' +
    '<label for="mstate">Enter State:</label>' +
    '<input type="text" class="form-control" id="mstate"placeholder=' + oldstate + '>' +
    '<label for="mpincode">Enter Pin Code:</label>' +
    '<input type="text" class="form-control" id="mpincode"placeholder=' + oldpin + '>';
  body1.appendChild(node);

  var footer = document.createElement('div');
  footer.className = 'modal-footer';
  content.appendChild(footer);

  var node2 = document.createElement('div');
  node2.innerHTML = ' <button type="button" id="editbtn" class="btn btn-info btn-md">Done</button>' +
    '<button type="button" class="btn btn-info btn-md"' +
    'data-dismiss="modal">Cancel</button>';
  footer.appendChild(node2);
  // Show modal dialog box
  $('#mymodal').modal('toggle');
  $('#mymodal').modal('show');

  $("#editbtn").click(function() {
    var fname = document.getElementById("mfirstname").placeholder;
    var lname = document.getElementById("mlastname").placeholder;
    var number = document.getElementById("mnumber").value;
    var address = document.getElementById("maddress").value;
    var city = document.getElementById("mcity").value;
    var state = document.getElementById("mstate").value;
    var pin = document.getElementById("mpincode").value;
    console.log("fname: " + pin);
    updatedobj = new person(fname, lname, number, address, city, state, pin);
    //if edition is done
    book.insert(updatedobj);
    book.remove(temp);
    console.log("update ended");
  });

}
//var to store updated values
var updatedobj;
var temp;
//function to edit Contents
function update() {
  var val = document.getElementById("selectlist").value;
  if (val == null) {
    alert("No value is selected. Please select a value.");
    return;
  }
  // var obj = book.search(val);
  console.log("entered");
  temp = book.search(val);
  console.log(temp);
  createDialog(temp.firstname, temp.lastname, temp.number, temp.address, temp.city, temp.state, temp.pin);
}
//firstname, lastname, number, address, city, state, pin

//function to sort by name
function sortByName() {
  //remove all elements from selectlist
  var list = document.getElementById("selectlist");

  book.printHash();
  var sortedList = new Array();
  var p = 0;
  //storing all objects of book in array
  for (ind = 0; ind < 26; ind++) {

    // var item=new node(null,null);
    if ((book.hm[ind].head) != null) {
      item = book.hm[ind].head;
      while (item != null) {
        if (item.obj != null) {
          sortedList.push(item.obj);
        }
        item = item.next;
      }
    }
  }

  //sortin array
  for (i in sortedList) {
    for (j in sortedList) {
      //comparing by last name
      if (compare(sortedList[i].lastname, sortedList[j].lastname) > 0) {
        temp = sortedList[i];
        sortedList[i] = sortedList[j];
        sortedList[j] = temp;
      }
      //if same t
      else if (compare(sortedList[i].lastname, sortedList[j].lastname) == 0) {
        //compare by first name
        if (compare(sortedList[i].firstname, sortedList[j].firstname) > 0) {
          temp = sortedList[i];
          sortedList[i] = sortedList[j];
          sortedList[j] = temp;
        }
        //if first name is also same
        else if (compare(sortedList[i].firstname, sortedList[j].firstname) == 0) {
          //compare by pin code
          if (compare(sortedList[i].pin, sortedList[j].pin) >= 0) {
            temp = sortedList[i];
            sortedList[i] = sortedList[j];
            sortedList[j] = temp;
          }
        }
        //else do nothing
        else {
          sortedList[i] = sortedList[i];
          sortedList[j] = sortedList[j];

        }
      }
      //else do nothing
      else {
        sortedList[i] = sortedList[i];
        sortedList[j] = sortedList[j];
      }
    }
  }
  //   var input = document.createElement('TEXTAREA');
  //   input.setAttribute('name', 'post');
  //   input.setAttribute('maxlength', 5000);
  //   input.setAttribute('cols',80);
  //   input.setAttribute('rows', 40);
  // document.getElementById("body").append(input);
  space = document.getElementById("sortarea");
  for (i in sortedList) {
    space.append("    " + sortedList[i].lastname + " " + sortedList[i].firstname + " " + sortedList[i].number);
    // $("#space").append(<br>);
  }

}
//function to sort by Zip
function sortByPin() {
  //remove all elements from selectlist
  var list = document.getElementById("selectlist");

  book.printHash();
  var sortedList = new Array();
  //storing all objects of book in array
  for (ind = 0; ind < 26; ind++) {

    // var item=new node(null,null);
    if ((book.hm[ind].head) != null) {
      item = book.hm[ind].head;
      while (item != null) {
        if (item.obj != null) {
          sortedList.push(item.obj);
        }
        item = item.next;
      }
    }
  }

  //sortin array
  for (i in sortedList) {
    for (j in sortedList) {
      //comparing by pin
      if (compare(sortedList[i].pin, sortedList[j].pin) > 0) {
        temp = sortedList[i];
        sortedList[i] = sortedList[j];
        sortedList[j] = temp;
      }
      //if pin is same
      else if (compare(sortedList[i].pin, sortedList[j].pin) == 0) {
        //compare by last name
        if (compare(sortedList[i].lastname, sortedList[j].lastname) > 0) {
          temp = sortedList[i];
          sortedList[i] = sortedList[j];
          sortedList[j] = temp;
        }
        //if same
        else if (compare(sortedList[i].lastname, sortedList[j].lastname) == 0) {
          //compare by first name
          if (compare(sortedList[i].firstname, sortedList[j].firstname) > 0) {
            temp = sortedList[i];
            sortedList[i] = sortedList[j];
            sortedList[j] = temp;
          }
        }
        //else do nothing
        else {
          sortedList[i] = sortedList[i];
          sortedList[j] = sortedList[j];
        }
      }
      //else do nothing
      else {
        sortedList[i] = sortedList[i];
        sortedList[j] = sortedList[j];
      }
    }
  }
  //displaying result
  space = document.getElementById("sortarea");

  for (i in sortedList) {
    space.append(sortedList[i].pin + " " + sortedList[i].lastname + " " + sortedList[i].firstname + " " + sortedList[i].number);
    $("#space").append("<br>");
  }
}
