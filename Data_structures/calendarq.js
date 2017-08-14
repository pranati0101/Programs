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
function Queue() {
  this.length = 0;
  this.q = new list();
  //function to add element
  this.enq = function(obj) {
    this.q.add(obj);
    this.length++;
  }
  //function to Dequeue
  this.deq=function(){
    var obj=this.q.remove();
    this.length--;
    return obj;
  }
  //function to chk queue is empty
  this.isEmpty = function() {
    if (this.length == 0) {
      return true;
    } else return false;
  }
  //function to print
  this.print=function(){
    this.q.print();
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
  cal = new Queue();
  for (j = 0; j < d; ) {
//creating week
    week = new Queue();
    for (i = 0; i <7; ) {
        //storing date and day
      if(date>d){
        weekDayNode = new weekDay("", days[++d0]);
        week.enq(weekDayNode);
        i++;
      }
      else{
        //calculating day of week
        d0=Math.floor((j+x+31*m0/12)%7);
        //storing space before actual day
        while (i < d0) {
          weekDayNode = new weekDay("  ", days[d0]);
          week.enq(weekDayNode);
          i++;
        }
        if(date<10){
          weekDayNode = new weekDay((date++)+" ", days[d0]);
        }
        else{
          weekDayNode = new weekDay((date++), days[d0]);
        }
        week.enq(weekDayNode);i++;
        j++;
      }
    }
    cal.enq(week);
  }
//printing cal
console.log(mon+" "+year);
console.log("S  M  T  W  Th F  S");
while(cal.isEmpty()==false){
  var week2=cal.deq();
  while(week2.isEmpty()==false){
    string="";
    while(week2.isEmpty()==false){
      string+=((week2.deq().date)+" ");
    }
   console.log(string);
  }
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
//--------------------------------------------------------------------------------------------------------------------
//
//printiing cal by accessing data
  // console.log(mon+" "+y);
  // console.log(" S  M  T  W  Th F  S");
  // var string="";
  // var week = cal.q.head;
  // for(i=0;i<cal.length;i++) {
  // var ptr=(week.obj.q.head);
  // var string=" ";
  // while (ptr) {
  //   string += (ptr.obj.date+" ");
  //   ptr = ptr.next;
  // }
  // console.log(string);
  // week = week.next;
  // }

/// this.remove=function(){
// //   var ptr;
// //   ptr = this.head;
// // if(this.number<2){
// //   //only one element present
// //   if(this.number==1){
// //     var data=this.head.obj;
// //   //  console.log("head:  "+this.head);
// //     this.head=null;
// //     this.end=null;
// //     return data;
// //   }
// //   var data=this.end.obj;
// //   this.end=this.head;
// //   this.head.next=null;
// //   return data;
// // }
// //   while(ptr.next.next!=null){
// //       ptr = ptr.next;
// //     //  console.log("ptr: "+ptr+" ptr.next: "+ptr.next+" ptr.next.next: "+ptr.next.next );
// //   }
// // // removing the last element
// //     var data=this.end.obj;
// //     this.end = ptr;
// //     ptr.next = null;
// //     this.number--;
// //     return data;
// // }
// }
