(function() {
  function init() {
    $('#login').click(login);
    $('#new').click(newUser);
    $('#delete').click(remove);
    $('#update').click(update);

  }
  var user;
  //chk if user exists, if not create new user with password and insert into database
  function newUser(event) {
    var testform = document.getElementById('form1');
    var userid = form1.userid.value;
    //validating username with regexp JS
    var regex = new RegExp("^[a-zA-Z0-9@_]+$");
    if (!(regex.test(userid))) {
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
        if (result.data == "false") {
          alert("User already registered!");

        } else if (result.data == "true") {
          alert("New User registered!");
        }
      });
    }
    console.log("Registration finished");
  }

  //call login api to chk data with registered users database
  function login(event) {
    var testform = document.getElementById('form1');
    console.log(user);
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
          "password": form1.password.value,
        }
      })
  .fail(function() {
    alert( "error" );
  }).done(function(result) {
        alert(result.status);
        console.log("inform");
        console.log(result);
        if (result.session != null) {
          localStorage.setItem('session',result.session);
          localStorage.setItem('status',result.status);
          localStorage.setItem('user',user);
          console.log("b4 chat");
          window.location.href='chat.html';
        } else if(result.status=="invalid") {
          alert("Invalid userid or password!");
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
        if (result.data == "true") {
          alert("User deleted!");

        } else if (result.data == "false") {
          alert("Invalid userid or password!");
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
        url: '/update',
        type: 'POST',
        dataType: "JSON",
        data: {
          "userid": form1.userid.value,
          "password": form1.password.value,
        }
      }).done(function(result) {
        console.log(result.data);
        if (result.data == "true") {
          alert("User updated!");

        } else if (result.data == "false") {
          alert("Invalid userid or password!");
        }
      });
    }
  }

  $(document).ready(init);
})();
