(function () {

function init()
{
  $('#SAVE').click(saveFile);
  $('#OPEN').click(openFile);
}
function saveFile(evt)
{
  var testform=document.getElementById('form1');
  $.ajax({
    url:'/saving',
    type:'POST',
    data: {
      firstName:form1.fname.value
    },
    sucess: function(data)
    {
      alert("sucess");
    }
  });
  }

function openFile(evt)
{
  $.ajax({
    url:'/opening',
    type:'GET',
    sucess: function(data)
    {
      alert("sucess");
    }
  });
  }
  
  $(document).ready(init);
})();
