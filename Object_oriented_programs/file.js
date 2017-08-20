//function to create new addressBook
function new1(){
  if(book!=null){
    if(confirm("Do you want to save the exising file?")==true)
      {
        saveas();
      }
  $("#selectlist option").remove();
}
book=new hashMap();
alert("New address book created.");
}
//function to open another file
// function openFile(event){
//    var input = event.target;
//    var reader = new FileReader();
//    reader.onload = function(){
//      var text = reader.result;
//      text=JSON.parse(text);
//      console.log(JSON.stringify(text));
//    };
//    reader.readAsText(input.files[0]);
//  };
var filedata;
function openFile(){
  console.log("in open");
  var filename=document.getElementById("openfile").value;
  console.log(filename);
      $.get(filename, function (data) {
        alert(":n inner function");
      console.log(data);
      filedata=(data);
      console.log("filedata in func: "+filedata);
      });
      console.log("file data: "+filedata);
}

//function to save file by using <a> tag in html5
function saveas(){
  var fname=document.getElementById("filename").value;
  var data=JSON.stringify(book.hm);
  var a = document.createElement("a");
  var div=document.getElementById("link");
  div.appendChild(a);
  a.setAttribute('href','data:text/plain;charset=utf-u,'+encodeURIComponent(data));
  a.setAttribute('download',fname);
  a.click();
}
