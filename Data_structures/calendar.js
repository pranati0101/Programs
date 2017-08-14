var month = +process.argv[2];
var year = +process.argv[3];
var days = {};
var cal = [];

calendar();

//function to chk leap year
function leap(y) {
  if ((y % 400 == 0)) {
    return true;
  } else if ((y % 100 == 0)) {
    return false;
  } else if ((ui % 4 == 0)) {
    return true;
  } else {
    return false;
  }
}
//driver function
function calendar() {
  //cal day of week
  y0=year-(14-month)/12;
  x=y0+y0/4-y0/100+y0/400;
  m0=month+12*x*((14-month)/12)-1;

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
  //assigning values to days
  for (var i = 0; i < d; i++) {
    days[i] = Math.floor((i+x+31*m0/12)%7);
  }
  //storing month & number of days in month
  var j = 0,k;
  var date=1;
  for (i=0;i<d;) {
    //week array
    cal[j] = (new Array(7));
    //assigning values in week array
     k = 0;
     //storing space before actual day
    while (k < days[i]) {
      cal[j][k] = "  ";
      k++;
    }
    while (k < 7) {
      if(date>d){
        cal[j][k]=" ";k++;
      }else{
        if(date<10){
          cal[j][k]=(date++)+" ";
        }else{
            cal[j][k]=date++;
        }
        k++;i++;
      }
    }
    j++;
  }
//printing calendar
  console.log(mon +" " + year);
  console.log("S  M  T  W Th  F  S");
  var str="";
  for(k=0;k<j;k++){
    str=cal[k].join(" ");
    console.log(str);
  }
}
