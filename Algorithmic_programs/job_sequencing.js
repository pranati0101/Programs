function task(id,deadline,minutes,status){
  this.id=id;
  this.deadline=deadline;
  this.minutes=minutes;
  this.status=status;
};
var taskList=[];

function calculate() {
  var taskList = [];
  var t = document.getElementById("t").value;  //taking input
  var t1 = t;
  var i=0;
  while ((t--) > 0) {
    taskList.push(new task(i+1,prompt("Enter deadline."),prompt("Enter time required."),false));
    i++;
  }
  // for(i=0;i<taskList.length;i++){
  //     console.log(taskList[i]);
  // }

  for (i = 0; i < t1; i++) {
    schedule(taskList,i);
  }
}

function schedule(taskList,i) {    //for scheduling task
  slot=sort(taskList,i);
  // console.log(slot);

}

function sort(tl,n)
{                             //for sorting task
  var slot=[];
  for(j=0;j<=n;j++){
    for(k=j;k<=n;k++){
      if(tl[j].deadline>tl[k].deadline){
        tempd=tl[j].deadline;
        tempm=tl[j].minutes;
        tempid=tl[j].id;
        tl[j].deadline=tl[k].deadline;  //sorting on basis of shortesty deadline first
        tl[j].minutes=tl[k].minutes;
        tl[j].id=tl[k].id;
        tl[k].deadline=tempd;
        tl[k].minutes=tempm;
        tl[k].id=tempid;
      }
      else if(tl[j].deadline==tl[k].deadline){  //ifdeadlines are same, compare on the basis of minutes
          if(tl[j].minutes>tl[k].minutes){
            tempd=tl[j].deadline;
            tempm=tl[j].minutes;
            tempid=tl[j].id;
            tl[j].deadline=tl[k].deadline;
            tl[j].minutes=tl[k].minutes;
            tl[j].id=tl[k].id;
            tl[k].deadline=tempd;
            tl[k].minutes=tempm;
            tl[k].id=tempid;
      }
    }
  }
}
for(i=0;i<tl.length;i++){
    console.log(tl[i]);
}
for(i=0;i<=n;i++){
  slot.push(tl[i].id);
}
return slot;
}
