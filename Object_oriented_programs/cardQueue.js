// array to store ranks and suits
var ranks=['A','K','Q','J',10,9,8,7,6,5,4,3,2];
var suits=['diamond','clubs','spades','heart'];
//list for storing sorted ranks
var sortedList=new list();
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

  this.print = function() {
    var string = '';
    var current = this.head;
    while (current) {
      string += current.obj.rank + ' ';
      current = current.next;
    }
    console.log(string.trim());
  }
}
//Queue function and methods
function Queue() {
  this.length = 0;
  this.front=null;
  this.rear=null;
  this.q = new list();
  //function to add element
  this.enq = function(obj) {
    this.q.add(obj);
    this.length++;
    this.front=this.q.head;
    this.rear=this.q.end;
  }
  //function to Dequeue
  this.deq=function(){
    var obj=this.q.remove();
    this.length--;
    this.front=this.q.head;
    this.rear=this.q.end;
    return obj;
  }
  //function to chk queue is empty
  this.isEmpty = function() {
    if (this.length == 0) {
      return true;
    } else return false;
  }
}

////card object
function Card(suit,rank){
  this.suit=suit;
  this.rank=rank;
}
//player object
function Player(){
    this.queue=new Queue();
    this.sort=function(){

    for(i=this.queue.length;i>0;i--){
      var current=this.queue.front;
      while(current.next!=null){
      if(compare(current.obj,current.next.obj)==2){
        //swap values
        var temp=new node(null,null);
        temp.obj=current.obj;
        current.obj=current.next.obj;
        current.next.obj=temp.obj;
      }
      current=current.next;
    }
    }
  }
}
//sorting functions
//function to compare rank of a and b
function compare(a,b){
  var rank1=a.rank;
  var rank2=b.rank;
  //getting position of rank in ranks array
  r1=ranks.indexOf(rank1);
  r2=ranks.indexOf(rank2);
  if(r1<=r2) return 1;
  else return 2;
}
//function to chk distinct cards
function distinct(card,game){
  var temp=game.q.head;
  while(temp!=null){
    var temp2=temp.obj.queue.front;
    while(temp2!=null){
      if((temp2.obj.rank==card.rank) && (temp2.obj.suit==card.suit)){
        return false;
      }
      temp2=temp2.next;
    }
    temp=temp.next;
  }
  return true;
}
//function to print
function print(game){
  var i=1;
  var temp=new node(null,null);
  temp=game.q.head;
  while(temp!=null){
    console.log("Player "+i++);
    var temp2=temp.obj.queue.front;
    while(temp2!=null){
      console.log(temp2.obj);
      temp2=temp2.next;
    }
    temp=temp.next;
  }
}
//function to shuffle cards and print
function shuffle(){
  var game=new Queue();
   for(var i=0;i<4;i++){
     player=new Player();
     game.enq(player);
     for(var j=0;j<9;j++){
       flag=false;
       while(flag==false){
         var rank=Math.floor((Math.random()*100)%13);
         var suit=Math.floor((Math.random()*10)%4);
         card=new Card(suits[suit],ranks[rank]);
         if(distinct(card,game)==true){
           game.rear.obj.queue.enq(card);
           flag=true;
         }
       }
     }
   }
   console.log("before sorting");
   print(game);
   var temp=game.front;
   while(temp!=null){
    temp.obj.queue.q=temp.obj.sort();
     temp=temp.next;
   }
   console.log("After sorting");
   print(game);
 }
//calling function
shuffle();
