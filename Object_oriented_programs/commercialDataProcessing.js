//file system module
var fs=require('fs');
var fname='stock.txt';
//transaction object
function transaction(status){
  this.date=new Date();
  this.status=status;
}
//stock object
function Stock(name,sn,sp){
this.name=name;
this.sn=sn;
this.sp=sp;
this.transact=new Array();
this.transact.push(new transaction("created"));
this.value=(sn*sp);
}
//stockAccount object
function StockAccount(string){
  // string=prompt("Enter name.");
  this.name=string;
  this.account=0;
  this.list=[];
  //return value of ccount in double
  this.valueOf=function(){
    return (this.account);
  }
  //buys shares of company
  this.buy=function( symbol,amount,snumber){
    for(ind in this.list){
      if(this.list[ind].name==symbol){
        this.list[ind].value+=amount;
        this.list[ind].sn+=snumber;
        this.list[ind].sp=Math.round(this.list[ind].value/this.list[ind].sn);
        this.list[ind].transact.push(new transaction("buy"));
        this.account+=amount;
        return;
      }
    }
    var stock=new Stock(symbol,snumber,Math.round(amount/snumber));
    this.list.push(stock);
    this.account+=amount;
  }
  //sells shares
  this.sell=function( symbol,amount,snumber){
    for(ind in this.list){
      if(this.list[ind].name==symbol){
        //if that much amount is not presen
        if(this.list[ind].value-amount<0){
          console.log("Not possible.");
          this.account-=amount;
          return;
        }
        this.list[ind].value-=amount;
        this.list[ind].sn-=snumber;
        this.list[ind].transact.push(new transaction("sell"));
        this.list[ind].sp=Math.round(this.list[ind].value/this.list[ind].sn);
        this.account-=amount;
        return;
      }
    }
    console.log("stock not available");
  }
  //saves account details in a file
  this.save=function(){
    data="Account name: "+this.name+" Account: "+this.account+" ";
    fs.writeFile(fname,data,function(err){
      if (err) throw err;
    });
    for(i in this.list){
      data+=(this.list[i].name)+" Number of shares: "+this.list[i].sn+" Share Price: "+
                         this.list[i].sp+" Value: "+this.list[i].value+" ";
                         for(j in this.list[i].transact){
                           data+=this.list[i].transact[j].status+" : "+this.list[i].transact[j].date;
                         }
      fs.writeFile(fname,data,function(err){
        if (err) throw err;});
    }
  }
  //print detailed report of stock account
  this.printReport=function(){
    console.log("Stock Account Name: "+this.name);
    console.log("Stock Account : "+this.account);
    console.log("List of shares: ");
    for(i in this.list){
      console.log(this.list[i]);
    }
  }
}
//driver function
function test(){
var s1=new StockAccount('ABC');
s1.buy('X',80,4);s1.buy('Y',40,5);
s1.sell('X',40,1);
s1.save();
s1.printReport();
console.log(s1.valueOf());
}
//calling function
test();
