(function() {

  var user;
  function init() {
    user=localStorage.getItem('user');
    status=localStorage.getItem('status');
    session=localStorage.getItem('session');
    console.log(user);
    console.log(session);
    $('#sendmessage').click(sendMessage);
    $('#logout').click(logout);
    socket = io.connect('http://localhost:8080');
    socket.on('loggedin', function(data) {
        if (status == "newlogin"){
          socket.emit('welcum', user);
          socket.emit('prev_msgs', user);
        }
        else if(status=="invalid") {
          alert("Invalid userid or password!");
        }
        else {
          alert(status);
          socket.emit('prev_msgs', user);
        }

       //socket events
        socket.on('welcum_notice', function(data) {
          document.getElementById('message-container').innerHTML += "<li class='other'>" +
            "<div class='msg'><p><b>" + data + "</b> just joined the conversation</p></div></li>";
            updateScroll();
        });


        socket.on('logout_notice', function(data) {
          document.getElementById('message-container').innerHTML += "<li class='other'>" +
            "<div class='msg'><p><b>" + data + "</b> just left the conversation</p></div></li>";
            updateScroll();
        });

        socket.on('display_prev', function(data) {
        console.log("in prev-msg");
        var menu=document.getElementById('menu');
        document.getElementById('name').innerHTML+=user;
          for (i in data) {
            var date = new Date(data[i].time).getDate();
            var month = new Date(data[i].time).getMonth();
            var year = new Date(data[i].time).getFullYear();
            var hour = new Date(data[i].time).getHours();
            var minutes = new Date(data[i].time).getMinutes();
            var seconds = new Date(data[i].time).getSeconds();
            if(data[i].user!=user){
              document.getElementById('message-container').innerHTML +="<li class='other'>"+
              "<div class='avatar'><img src='other.png' draggable='false'/></div>"
              +"<div class='msg'><p><b>"+data[i].user+"</b><br>"+data[i].message+"</p> <time>"+
              date+ "/" + month + "/" + year + "---" + hour + ":" + minutes + ":" + seconds +
              "</time></div></li>";
            }
            else{
              document.getElementById('message-container').innerHTML +="<li class='self'>"+
              "<div class='avatar'><img src='self.png' draggable='false'/></div>"
              +"<div class='msg'><p><b>You</b><br>"+data[i].message+"</p><time>"+
              date+ "/" + month + "/" + year + "---" + hour + ":" + minutes + ":" + seconds +
              "</time></div></li>";
            }
          }
          updateScroll();
        });

        socket.on('newmsg', function(data) {
          if(data.user!=user){
              document.getElementById('message-container').innerHTML +="<li class='other'>"+
              "<div class='avatar'><img src='other.png' draggable='false'/></div>"
              +"<div class='msg'><p><b>"+data.user+"</b><br>"+data.message+"</p></div></li>";
            }
            else{
              document.getElementById('message-container').innerHTML +="<li class='self'>"+
                  "<div class='avatar'><img src='self.png' draggable='false'/></div>"
                  +"<div class='msg'><p><b>You</b><br>"+data.message+"</p></div></li>";
            }
            updateScroll();
        });
      });
    }

    function updateScroll(){

      var element=document.getElementById("message-container");
        element.scrollTop=element.scrollHeight;
        console.log(element.scrollTop);
        console.log(element.scrollHeight);

    }

  function logout(event) {
    var rs = $.ajax({
      url: '/logout?user=' + user,
      type: 'GET'
    }).done(function(result) {
      localStorage.setItem('user',null);
      localStorage.setItem('session',null);
      localStorage.setItem('result',null);
      socket.emit('logout',user);
      console.log("loggedout");
      window.location.href='/?#';
    });
  }

  function sendMessage(event) {
    console.log("in send message");
    var msg = document.getElementById('message').value;
    document.getElementById('message').value="";
    document.getElementById('sendmessage').disabled=false;
    socket.emit('msg', {
      message: msg,
      user: user,
      time: ""
    });
  }

  $(document).ready(function(){
    if((localStorage.getItem('user')=='null' || localStorage.getItem('user')=='undefined' ||
    localStorage.getItem('user')=='' || localStorage.getItem('user')==undefined  )){
      alert("Not Logged in !")
        window.location.href='/?#';
    }
    else{
      init();
    }
  });
})();
