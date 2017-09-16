(function() {

  function init() {
    showlist();
    $('#SAVE').click(saveFile);
    $('#OPEN').click(openFile);
    $('#EDIT').click(edit);
    $('#SEARCH').click(search);
    $('#REMOVE').click(remove);
  }
//FUNCTION TO ADD PERSON INTHE FILE
function showlist(){
    var book=$.ajax({
      url: '/opening',
      type: 'GET',
      sucess: function(data) {
        alert("sucess");
      }
    }).done(function(data){
      var list = document.getElementById("selectlist");
      for(i in data){
        var opt = document.createElement("option");
        opt.text = data[i].firstname;
        list.add(opt);
      }

    })
}
  function saveFile(evt) {
    var testform = document.getElementById('form1');
    // console.log("in push book: "+JSON.stringify(book));
    $.ajax({
      url: '/saving',
      type: 'POST',
      dataType: "JSON",
      data: {
        "firstname": form1.fname.value,
        "lastname": form1.lname.value,
        "number": form1.number.value,
        "pin": form1.pin.value,
      },
      sucess: function(data) {
        alert("sucess");
      }
    }).then(function(){
      var list = document.getElementById("selectlist");
      var opt = document.createElement("option");
      opt.text = firstname;
      list.add(opt);
    })
  }
  //function to add table
  function addTable(row,data) {
    document.getElementById("space").innerHTML=" ";
    var myTableDiv = document.getElementById("space");

    var table = document.createElement('TABLE');
    table.border = '1';

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    for (var i = 0; i < row; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        for (var j = 0; j < 4; j++) {
            var td = document.createElement('TD');
            td.width = '200';
            td.appendChild(document.createTextNode(" "));
            tr.appendChild(td);
        }
    }
    myTableDiv.appendChild(table);
    return table;
}
//FUNCTION TO DISPLAY PRESENT CONTACTS
  function openFile(evt) {
    var book=$.ajax({
      url: '/opening',
      type: 'GET',
      sucess: function(data) {
        alert("sucess");
      }
    }).done(function(data){

        table=addTable(data.length+1);
        table.rows[0].cells[0].innerHTML="<b>First Name</b>";
        table.rows[0].cells[1].innerHTML="<b>Last Name</b>";
        table.rows[0].cells[2].innerHTML="<b>Number</b>";
        table.rows[0].cells[3].innerHTML="<b>Pin Code</b>";

      for(i=1;i<=data.length;i++){
          table.rows[i].cells[0].innerHTML=(data[i-1].firstname);
          table.rows[i].cells[1].innerHTML=(data[i-1].lastname);
          table.rows[i].cells[2].innerHTML=(data[i-1].number);
          table.rows[i].cells[3].innerHTML=(data[i-1].pin);
      }
    })
  }

  //function for creating dialog box at run time
  // Creation of the alert message box.
  function createDialog(val) {
    var Modal = document.createElement('div');
    Modal.id = 'mymodal';
    Modal.role = 'dialog';
    Modal.className = 'modal';
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
    node.innerHTML = '<label for="mlastname">Last Name</label>' +
      '<input type="text" class="form-control" id="mlastname"' + '>' +
      ' <label for="mnumber">Enter nummber</label>' +
      '<input type="text" class="form-control" id="mnumber"'+
      '<label for="mpincode">Enter Pin Code:</label>' +
      '<input type="text" class="form-control" id="mpincode"'+ '>';
    body1.appendChild(node);

    var footer = document.createElement('div');
    footer.className = 'modal-footer';
    content.appendChild(footer);

    var node2 = document.createElement('div');
    node2.innerHTML = ' <button type="button" id="editbtn" data-dismiss="modal" '
      +'class="btn btn-info btn-md">Done</button>' +
      '<button type="button" class="btn btn-info btn-md"' +
      'data-dismiss="modal">Cancel</button>';
    footer.appendChild(node2);
    // Show modal dialog box
    $('#mymodal').modal('toggle');
    $('#mymodal').modal('show');
    $("#editbtn").click(function() {
      var fname = val;
      var lname = document.getElementById("mlastname").value;
      var number = document.getElementById("mnumber").value;
      var pin = document.getElementById("mpincode").value;
      $.ajax({
        url: '/edit',
        type: 'POST',
        dataType: "JSON",
        data: {
          "firstname":fname,
          "lastname":lname,
          "number": number,
          "pin": pin,
        },
        sucess: function(data) {
          alert("sucess");
        }
      });
      console.log("update ended");
    });

  }
  //function to edit Contents
  function edit(evt) {
    var val = document.getElementById("selectlist").value;
    if (val == null) {
      alert("No value is selected. Please select a value.");
      return;
    }
    else{
      createDialog(val)
      .then(function(){
      })
    }
  }


  // //FUNCTION TO EDIT CONTACTS INTHE FILE
  //   function edit(evt) {
  //     // var testform = document.getElementById('form1');
  //     var fname = document.getElementById("selectlist").value;
  //     // var fname=prompt("Enter First name");
  //     var lname=prompt("Enter Last name");
  //     var number=prompt("Enter number");
  //     var pin=prompt("Enter pincode");
  //     $.ajax({
  //       url: '/edit',
  //       type: 'POST',
  //       dataType: "JSON",
  //       data: {
  //         "firstname":fname,
  //         "lastname":lname,
  //         "number": number,
  //         "pin": pin,
  //       },
  //       sucess: function(data) {
  //         alert("sucess");
  //       }
  //     });
  //   }

    //FUNCTION TO DELETE CONTACTS INTHE FILE
      function remove(evt) {
        console.log("remove function");
        var name = document.getElementById("selectlist").value;
        if(name){
          console.log("sending request");
          $.ajax({
            url: '/delete',
            type: 'POST',
            data:{
              "firstname":name
            }
          });
        }
        else {
          alert("Select a value!");
        }
      }

      //FUNCTION TO DELETE CONTACTS INTHE FILE
        function search(evt) {
            var text=document.getElementById("stext").value;
            console.log("sending search request");
            $.ajax({
              url: '/search?text='+text,
              type: 'GET'
            }).fail(function(){
              alert("search request failed!");
            })
            .done(function(result){
              document.getElementById("space").innerHTML=JSON.stringify(result);
              // document.getElementById("space").innerHTML=result.firstname+"<t>"+

            });
        }

  $(document).ready(init);
})();
