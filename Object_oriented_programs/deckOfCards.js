//card object
function Card(suit,rank){
  this.suit=suit;
  this.rank=rank;
}
//2D array to store cards
 var list=[];
var ranks=['A','K','Q','J',2,3,4,5,6,7,8,9,10];
var suits=['diamond','clubs','spades','heart'];

//function to shuffle cards and print
function shuffle(){
   for(var i=0;i<4;i++){
     list[i]=new Array();
     for(var j=0;j<9;j++){
       flag=false;
       while(flag==false){
         var rank=Math.floor((Math.random()*10)%13);
         var suit=Math.floor((Math.random()*10)%4);
         card=new Card(suits[suit],ranks[rank]);
         if(distinct(card)==true){
           list[i].push(card);
           flag=true;
       }
       }
     }
   }
   print();
 }
 //function to chk distinct cards
 function distinct(card){
   var t=0;
   for(i in list){
     for(j in list[i]){
       if((list[i][j].rank==card.rank) && (list[i][j].suit==card.suit))
        return false;
     }
   }
   return true;
 }
 //function to print
 function print(){
   for(i in list){
     console.log((parseInt(i)+1)+" Player cards: ");
     console.log(list[i]);
   }
 }

//calling function
shuffle();
