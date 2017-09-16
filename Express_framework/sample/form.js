(function() {

  function init() {
    $('#SAVE').click(saveFile);
    $('#OPEN').click(openFile);
    $('#EDIT').click(edit);
    $('#REMOVE').click(remove);
  }
//FUNCTION TO ADD PERSON INTHE FILE
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
    });
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
  //FUNCTION TO EDIT CONTACTS INTHE FILE
    function edit(evt) {
      var testform = document.getElementById('form1');
      var fname=prompt("Enter First name");
      var lname=prompt("Enter Last name");
      var number=prompt("Enter number");
      var pin=prompt("Enter pincode");
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
    }

    //FUNCTION TO DELETE CONTACTS INTHE FILE
      function remove(evt) {
        var name=prompt("Enter name");
        console.log("sending request");
        $.ajax({
          url: '/delete',
          type: 'POST',
          data:{
            "firstname":name
          }
        });
      }

  $(document).ready(init);
})();
