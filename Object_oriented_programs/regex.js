function func(){
  var msg = "Hello <<name>>, we have your full name as <<fulname>> in our system. <<name>>, your contact number is 91-XXXXXXXXXX.Please,let us know in case of any clarification. Thank you BridgeLabz 01/01/2016";
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
var firstname=new RegExp("<<name>>");
var fullname=new RegExp("<<fulname>>");
var number1=new RegExp("XXXXXXXXXX");
var date=new RegExp("01/01/2016");
while(firstname.test(msg)){
  msg=msg.replace("<<name>>",name);
}
while(fullname.test(msg)){
  msg=msg.replace("<<fulname>>",(name+" "+lastname));
}
while(number1.test(msg)){
  msg=msg.replace("XXXXXXXXXX",number);
}
while(date.test(msg)){
  msg=msg.replace("01/01/2016",today);
}

  // console.log(msg); //display msg
  alert(msg);

}
