 function test() {
   var n = document.getElementById("userInput").value;
   var arr = [];
   var rno = 0;
   var num = 0;
   while (arr.length != n) {
     num = Math.round(Math.random() * 10);
     rno++;
     if (check(arr, num) == true)
       arr.push(num);
   }
   document.write("Total random numbers needed is " + rno + ".");
 }

 function check(arr, num) {
   for (i = 0; i < arr.length; i++)
     if (arr[i] == num)
       return false;
   return true;
 }
