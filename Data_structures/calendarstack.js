var month = +process.argv[2];
var year = +process.argv[3];
var days = ["S", "M", "T", "W", "Th", "F", "S"];
var mon="",d=0;


//week day node
function weekDay(date, day) {
  this.date = date;
  this.day = day;
}

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
    this.lebgth--;
    return obj;
  }
}

//Queue function and methods
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
    this.stack.print();
  }
}

//chk leap year
function leap(y) {
  if ((y % 400 == 0)) {
    return true;
  } else if ((y % 100 == 0)) {
    return false;
  } else if ((y % 4 == 0)) {
    return true;
  } else {
    return false;
  }
}

function createcal() {
  y0=year-(14-month)/12;
  x=y0+y0/4-y0/100+y0/400;
  m0=month+12*x*((14-month)/12)-1;
  var date=1;
  //calculating number of days and month
  calmonth();
//creating calendar
  cal = new Stack();
  for (j = 0; j < d; ) {
//creating week
    week = new Stack();
    for (i = 0; i <7; ) {
        //storing date and day
      if(date>d){
        weekDayNode = new weekDay('  ', days[++d0]);
        week.push(weekDayNode);
        i++;
      }
      else{
        //calculating day of week
        d0=Math.floor((j+x+31*m0/12)%7);
        //storing space before actual day
        while (i < d0) {
          weekDayNode = new weekDay("  ", days[d0]);
          week.push(weekDayNode);
          i++;
        }
        if(date<10){
          weekDayNode = new weekDay((date+++" "), days[d0]);
        }
        else{
          weekDayNode = new weekDay((date++), days[d0]);
        }
        week.push(weekDayNode);i++;
        j++;
      }
    }
    cal.push(week);
  }
//storing it in reverse order
var stack2=new Stack();
while(cal.isEmpty()==false){
  var week=cal.pop();
  var week2=new Stack();
  while(week.isEmpty()==false){
    var day=week.pop();
    week2.push(day);
//  console.log("print: day: "+JSON.stringify(day));
  }
  stack2.push(week2);
}
//for printing cal
console.log(mon+" "+year);
console.log("S  M  T  W  Th F  S");
while(stack2.isEmpty()==false){
  var week2=stack2.pop();
  string="";
  while(week2.isEmpty()==false){
    string+=((week2.pop().date)+" ");
  }
 console.log(string);
}
}
//FUNCTION to cal month and number of days
function calmonth() {
  switch (month) {
    case 1:
      mon = "January";
      d = 31;
      break;
    case 2:
      mon = "February";
      if (leap(y)) d = 29;
      else d = 28;
      break;
    case 3:
      mon = "March";
      d = 31;
      break;
    case 4:
      mon = "April";
      d = 30;
      break;
    case 5:
      mon = "May";
      d = 31;
      break;
    case 6:
      mon = "June";
      d = 30;
      break;
    case 7:
      mon = "July";
      d = 31;
      break;
    case 8:
      mon = "August";
      d = 31;
      break;
    case 9:
      mon = "September";
      d = 30;
      break;
    case 10:
      mon = "October";
      d = 31;
      break;
    case 11:
      mon = "November";
      d = 30;
      break;
    case 12:
      mon = "December";
      d = 31;
      break;
    default:
      console.log("Invalid month!")
      return;
      break;
  }
}
createcal();
