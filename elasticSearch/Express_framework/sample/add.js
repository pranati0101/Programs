function addinbook(){
  var firstname = document.getElementById("firstname").value;
  var lastname = document.getElementById("lastname").value;
  var number = document.getElementById("number").value;
  var pin = document.getElementById("pincode").value;
  // console.log("in push book: "+JSON.stringify(book));
  $.ajax({
    url: '/saving',
    type: 'POST',
    dataType: "JSON",
    data: {
      "firstname": firstname,
      "lastname": lastname,
      "number": number,
      "pin": pin,
    }
    // sucess: function(data) {
    //   alert("sucess");
    // }
  }).done(function(res){
    var list = document.getElementById("selectlist");
    var opt = document.createElement("option");
    opt.text = firstname;
    list.add(opt);
  })
}
