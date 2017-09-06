//file system module
var fs=require('fs');
var fname='stock.txt';
var inputFile='inputFile.txt';

// list node structure
function node(obj, next) {
  this.obj = obj;
  this.next = null;
};
//linked list structure
function list() {
  this.head = null;
  this.end = null;
  this.number = 0;
  //for adding node to the list
  this.add = function(obj) {
    var node1 = new node(obj, null);
    //no nodes are present before
    if (this.head == null) {
      this.head = node1;
      this.end = node1;
    }
    //if nodes are present, add at last
    else {
      this.end.next = node1;
      this.end = node1;
    }
    //increment the nummber of nodes
    this.number++;
  }
  //for removing element from end
this.remove = function() {
  //if no nodes are present
  if(this.number==0){
    return null;
  }
  if(this.number==1){
    var obj=this.head.obj;
    this.head=null;
    this.end=null;
    this.length--;
    return obj;
  }
  //removingnodes from front
  var obj=this.head.obj;
  this.head=this.head.next;
  this.length--;
  return obj;
  }
//print list
  this.print = function() {
    var string = '';
    var current = this.head;
    while (current) {
      string += JSON.stringify(current.obj)+ ' ';
      console.log(string.trim());
      current = current.next;
    }
  }
}
//transaction object
function transaction(status){
  this.date=new Date();
  this.status=status;
}
//stock object
function Stock(name,shareNumber,sharePrice){
this.name=name;
this.shareNumber=shareNumber;
this.sharePrice=sharePrice;
this.transact=new Array();
this.transact.push(new transaction("created"));
this.value=(shareNumber*sharePrice);
}
//stockAccount object
function StockAccount(inputFile){
  // string=prompt("Enter name.");
  this.name=fs.readFileSync(inputFile);
  this.account=0;
  this.list1=new list();
  //return value of ccount in double
  this.valueOf=function(){
    return (this.account);
  }
  //buys shares of company
  this.buy=function( symbol,amount,snumber){

    var temp=this.list1.head;
    while(temp!=null){
      if(temp.obj.name==symbol){
        temp.value+=amount;
        temp.shareNumber+=snumber;
        temp.sharePrice=Math.round(this.list[ind].value/this.list[ind].shareNumber);
        temp.transact.push(new transaction("buy"));
        this.account+=amount;
        return;
      }
      temp=temp.next;
    }
    var stock=new Stock(symbol,snumber,Math.round(amount/snumber));
    this.list1.add(stock);
    this.account+=amount;
  }
  //sells shares
  this.sell=function( symbol,amount,snumber){
    var temp=this.list1.head;
    while(temp!=null){
      if(temp.obj.name==symbol){
        if((temp.obj.value-amount)>=0){
          temp.obj.value-=amount;
          temp.obj.shareNumber-=snumber;
          temp.obj.sharePrice=Math.round(temp.obj.value/temp.obj.shareNumber);
          temp.obj.transact.push(new transaction("sell"));
          this.account-=amount;
          return;
        }
      console.log("Not possible");
      return;
      }
      temp=temp.next;
    }
    console.log("stock not available");
  }
  //saves account details in a file
  this.save=function(){
    data="Account name: "+this.name+" Account: "+this.account+" ";
    var current = this.list1.head;
    while (current) {
      data += JSON.stringify(current.obj)+ ' ';
      current = current.next;
    }
    fs.writeFile(fname,data,function(err){
      if (err) throw err;
    });
  }
  //print detailed report of stock account
  this.printReport=function(){
      console.log(" ");
      console.log("Stock Account Name: " + this.name);
      console.log("Total Value of Stock Account : Rs." + this.account);
      console.log(" ");
      console.log("-------List of shares are as follows :----------");
      console.log("");
      temp = this.list1.head;
      while (temp) {
        console.log("Company symbol: " + temp.obj.name);
        console.log("Number of shares: " + temp.obj.shareNumber);
        console.log("Share Price: " + temp.obj.sharePrice);
        console.log("Transaction Details: ");
        for (i in temp.obj.transact) {
          console.log("Date : " + temp.obj.transact[i].date + " Status : " + temp.obj.transact[i].status);
        }

        temp = temp.next;
        console.log(" ");
      }
      // this.list1.print();
  }
}
//driver function
function test(){
var symbol=process.argv[2];
var amount=process.argv[3];
var number=process.argv[4];
var symbol2=process.argv[5];
var amount2=process.argv[6];
var number2=process.argv[7];
var s1=new StockAccount(inputFile);
s1.buy(symbol,amount,number);
s1.sell(symbol2,amount2,number2);
s1.save();
s1.printReport();
}
//calling function
test();
