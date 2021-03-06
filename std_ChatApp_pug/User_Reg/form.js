(function() {
    function init() {
    $('#login').click(login);
    $('#new').click(newUser);
    $('#delete').click(remove);
    $('#update').click(update);

  }

  //chk if user exists, if not create new user with password and insert into database
  function newUser(event) {
    var testform = document.getElementById('form1');
    var userid = form1.userid.value;
    //validating username with regexp JS
    var regex = new RegExp("^[a-zA-Z0-9@_]+$");
    if (!(regex.test(userid) || !(form1.password.value))) {
      alert("Invalid Username !");
    } else {
      var res = $.ajax({
        url: '/newUser',
        type: 'POST',
        dataType: "JSON",
        data: {
          "userid": form1.userid.value,
          "password": form1.password.value
        }
      }).done(function(result) {
        console.log(result);
        if (result.data == false) {
          alert("User already registered!");

        } else if (result.data == true) {
          alert("New User registered!");
        }
      });
    }
    console.log("Registration finished");
  }

  //call login api to chk data with registered users database
  function login(event) {
    var testform = document.getElementById('form1');
    user = form1.userid.value;

      //validating username with regexp JS
      var regex = new RegExp("^[a-zA-Z0-9@_]+$");
      if (!(regex.test(user))) {
        alert("Invalid Username !");
      } else {
        var result = $.ajax({
          url: '/chklogin',
          type: 'POST',
          dataType: "JSON",
          data: {
            "userid": form1.userid.value,
            "password": form1.password.value
          }
        }).done(function(result) {

        console.log(result);

        if(result.status=="invalid") {
              alert("Invalid userid or password!");
              window.location.href='/?#';
            }
        else {
              localStorage.setItem('status',result.status);
              localStorage.setItem('user',user);
              console.log("finished logged in!");
              window.location.href='/chat';
            }
        });
      }
    }

  function remove(event) {
    var testform = document.getElementById('form1');
    var userid = form1.userid.value;
    //validating username with regexp JS
    var regex = new RegExp("^[a-zA-Z0-9@_]+$");
    if (!(regex.test(userid))) {
      alert("Invalid Username !");
    } else {
      var result = $.ajax({
        url: '/delete',
        type: 'POST',
        dataType: "JSON",
        data: {
          "userid": form1.userid.value,
          "password": form1.password.value,
        }
      }).done(function(result) {
        console.log(result.data);
        if (result.data == false) {
          alert("Invalid userid or password!");

        } else if (result.data ==true) {
            alert("User deleted!");
        }
      });
    }
  }

  //call login api to chk data with registered users database
  function update(event) {
    var testform = document.getElementById('form1');
    var userid = form1.userid.value;
    //validating username with regexp JS
    var regex = new RegExp("^[a-zA-Z0-9@_]+$");
    if (!(regex.test(userid))) {
      alert("Invalid Username !");
    } else {
      var result = $.ajax({
        url: '/search',
        type: 'POST',
        dataType: "JSON",
        data: {
          "userid": form1.userid.value,
          "password": form1.password.value,
        }
      }).done(function(result){
        if(result.data){
          // pass=prompt('Enter new password.');
          var elem=document.getElementById('updatedialog');
          elem.click();
        }
        else{
          alert("User not found!");
        }
      });
    }
  }



  $(document).ready(init);
})();
