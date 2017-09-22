function detectEnter(e){
  if(e.keyCode==13){
    var button=document.getElementById("sendmessage");
    button.click();
  }
}

function updateScroll() {
  // var element = document.getElementById("message-container");
  document.body.scrollTop = document.body.scrollHeight;
  console.log(document.body.scrollTop);
  console.log(document.body.scrollHeight);
}
