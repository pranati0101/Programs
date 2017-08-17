//reading file
var fs = require('fs');
//file name to be read
var data="";
var fname = "inventory.json";
// data=fs.readFile(fname, function(err,d){
//   if(err) throw err;
//   JSON.parse(d);
//   inventoryManager();
// });
//var to hold total price of inventory
var total=0;

//function to create inventory object
function inventoryFactory(name,weight,price){
//pushing new object in the list
      data.inventory.push({
      "name": name,
      "weight": weight,
      "price": price
    });
  // calculation total price of the inventory
    for(ind in data.inventory){
      console.log("Name: "+data.inventory[ind].name+"\n"+"Cost: "+(parseFloat(data.inventory[ind].weight)
                                                                      *parseFloat(data.inventory[ind].price)));
      total=total+(parseFloat(data.inventory[ind].weight)*parseFloat(data.inventory[ind].price));
    }
    console.log("Total : "+total);
}

//main function
function inventoryManager(){
  data=JSON.parse(fs.readFileSync(fname));
  console.log(data);
   var name=process.argv[2];
   var weight=process.argv[3];
   var cost=process.argv[4];
  inventoryFactory(name,weight,cost);
  console.log(JSON.stringify(data));
}
inventoryManager();
