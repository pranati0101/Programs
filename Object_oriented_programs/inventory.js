var fs = require('fs');
//file name to be read
var fname = "inventory.json";
//reading file
data = fs.readFile(fname, function(err,d){
  if(err) throw err;
  //store data
  data = JSON.parse(d);
  data.inventory.push({
    "name": "maize",
    "weight": "40",
    "price": "60"
  });
  console.log(data);
})
