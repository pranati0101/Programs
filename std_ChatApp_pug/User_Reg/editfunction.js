  // $(document).ready(function(){
    $('#passbtn').click(function(){
      pass=document.getElementById('newpassword').value;
      var result = $.ajax({
        url: '/update',
        type: 'POST',
        dataType: "JSON",
        data: {
          "userid": form1.userid.value,
          "password":pass,
        }
      }).done(function(result) {
        window.location.href='/?#';
        console.log(result.data);
        if (result.data == false) {
          alert("Invalid userid or password!");
        } else if (result.data == true) {
          alert("User updated!");
        }
      });
    })
  // });
