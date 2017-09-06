(function() {

  function init() {
    $('#SAVE').click(save);
    // $('#OPEN').click(openFile);
    // $('#EDIT').click(edit);
    // $('#REMOVE').click(remove);
  }
//FUNCTION TO ADD PERSON INTHE FILE
function save(evt) {

  console.log("in save function");
  console.log(book.hm);
  $.ajax({
    url: '/save',
    type: 'POST',
    dataType: "JSON",
    // data: {
    //   Data:book.hm,
    //   filename:fname
    // },
    data:book.hm,
    sucess: function(data) {
      alert("sucess");
    }
  });
}
$(document).ready(init);
})();
