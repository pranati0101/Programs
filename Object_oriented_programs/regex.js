function func(){
  var msg = "Hello <<name>>, we have your full name as <<fulname>> in our system.Your contact number is 91-XXXXXXXXXX.Please,let us know in case of any clarification. Thank you BridgeLabz 01/01/2016";
  var name = prompt("Enter your first name");
  var lastname = prompt("Enter ypur last name");
  var number = prompt("Enter your number")+" ";
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  today = mm + '/' + dd + '/' + yyyy; //getting date

  msg=msg.replace("<<name>>",name);
  msg=msg.replace("<<fulname>>",name+" "+lastname);
  msg=msg.replace("XXXXXXXXXX",number);
  msg=msg.replace("01/01/2016",today);
  alert(msg);  //display msg

}
