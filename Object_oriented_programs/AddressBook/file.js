//var to store filename
var fname;
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
function openFile(event){
  //creating new Hash map
  book=new hashMap();
  var list=document.getElementById("selectlist");
  //storing filenmae in fname variable
  fname=document.getElementById("files").value;

   var input = event.target;
   var reader = new FileReader();
   reader.onload = function(){
     var text = reader.result;
     text=JSON.parse(text);
     //getting filedata in ds book
     for(i in text){
      // book.hm.push(text[i]);
      var temp=text[i].head;
      while(temp !=null){
         book.insert(temp.obj);
         temp=temp.next;
      }
     console.log(book.length);
     }

     //displaying on select list
for(i in book.hm){
  if(book.hm[i].head!=null){
    var temp=book.hm[i].head;
    while(temp !=null){
       var opt = document.createElement("option");
       opt.text =(temp.obj.firstname);
       console.log(opt.text);
       list.add(opt);
       temp=temp.next;
    }
  }
}
console.log("finished");
   };

   reader.readAsText(input.files[0]);
 };

// function openFile(){
//   console.log("in open");
//   var filename=document.getElementById("openfile").value;
//   console.log(filename);
//       $.get(filename, function (data) {
//         alert(":n inner function");
//       console.log(data);
//       filedata=(data);
//       console.log("filedata in func: "+filedata);
//       });
//       console.log("file data: "+filedata);
// }

//function to save file by using <a> tag in html5
function saveas(){
  fname=document.getElementById("filename").value;
  var data=JSON.stringify(book.hm);
  var a = document.createElement("a");
  var div=document.getElementById("link");
  div.appendChild(a);
  a.setAttribute('href','data:text/plain;charset=utf-u,'+encodeURIComponent(data));
  a.setAttribute('download',fname);
  a.click();
}
