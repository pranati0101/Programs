//file system module
var fs=require('fs');
var fname='stock.txt';

// list node structure
function node(obj, next) {
  this.obj = obj;
  this.next = null;
}

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
    //if nodes are present, add at front
    else {
      node1.next=this.head;
      this.head = node1;
    }
    //increment the nummber of nodes
    this.number++;
  }
  //removing element from top
  this.remove = function() {
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
    var obj=this.head.obj;
    this.head=this.head.next;
    this.length--;
    return obj;
  }
  //print list
    this.print = function() {
      var current = this.head;
      while (current) {
        var string = '';
        string += JSON.stringify(current.obj)+ ' ';
        console.log(string.trim());
        current = current.next;
      }
    }
}

//stack function and methods
function Stack() {
  this.length = 0;
  this.stack = new list();
  //function to add element
  this.push = function(obj) {
    this.stack.add(obj);
    this.length++;
  }
  //function to remove leement
  this.pop=function(){
    var data=this.stack.remove();
    this.length--;
    return data;
  }
  //function to chk queue is empty
  this.isEmpty = function() {
    if (this.length == 0) {
      return true;
    } else return false;
  }
  //function to print
  this.print=function(){
    var current = this.stack.head;
    while (this.isEmpty()==false) {
      var string =" ";
      string += JSON.stringify(this.pop())+ ' ';
      console.log(string.trim());
    }
  }
}
//transaction object
function transaction(symbol,status){
  this.symbol=symbol;
  this.date=new Date();
  this.status=status;
}
//stock object
function Stock(name,shareNumber,sharePrice){
this.name=name;
this.shareNumber=shareNumber;
this.sharePrice=sharePrice;
this.value=(shareNumber*sharePrice);
}
//stockAccount object
function StockAccount(string){
  // string=prompt("Enter name.");
  this.name=string;
  this.account=0;
  this.list1=new list();
  this.transact=new Stack();
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
        this.transact.push(new transaction(symbol,"buy"));
        this.account+=amount;
        return;
      }
      temp=temp.next;
    }
    var stock=new Stock(symbol,snumber,Math.round(amount/snumber));
    this.list1.add(stock);
    this.account+=amount;
    this.transact.push(new transaction(symbol,"buy"));
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
          this.transact.push(new transaction(symbol,"sell"));
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
    console.log("Stock Account Name: "+this.name);
    console.log("Stock Account : "+this.account);
    console.log("List of shares: ");
    this.list1.print();
    console.log("Transactions: ");
    this.transact.print();
  }
}
//driver function
function test(){
var s1=new StockAccount('ABC');
var symbol=process.argv[2];
var amount=process.argv[3];
var number=process.argv[4];
var symbol2=process.argv[5];
var amount2=process.argv[6];
var number2=process.argv[7];
s1.buy(symbol,amount,number);
s1.sell(symbol2,amount2,number2);
// s1.buy('X',80,4);s1.buy('Y',40,5);
// s1.sell('X',40,1);
s1.save();
s1.printReport();


}
//calling function
test();
