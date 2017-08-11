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
}
//function to chk prime
function prime(num){
  if(num==2 || num==3){
        return true;
  }
  if(num%2==0 || num%3==0)
    return false;
  for(var i=2;i<Math.sqrt(num);i++){
    if(num%i===0){
        return false;
    }
  }
  return true;
}

var p=new Array();
//storing prime numbers
for(i=2;i<1000;i++){
  if(prime(i)==true){
    p.push(i);
  }
}

var flag=true;
var queue=new Queue();
//storing anagram
for(j=0;j<p.length-1;j++){
var m=p[j]+"";
m=m.split("").sort().join("");
for(k=j+1;k<p.length;k++){
  var n=p[k]+"";
  n=n.split("").sort().join("");
  if(m==n){
    queue.enq(p[k]);
    flag=false;
  }
}
if(flag==false){
  queue.enq(p[j]);
  flag=true;
}
}
var sum=0;
while(queue.isEmpty()==false){
  var t=queue.deq();
  sum=sum+t;
  console.log(t);
}
console.log("Sum is : "+sum);
