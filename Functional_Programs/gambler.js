//function for calculating wins and loss in gambling
function gamble() {
  var stake = document.getElementById("stake").value;
  var goal = document.getElementById("goal").value;
  var trials = document.getElementById("trials").value;
  var trial2=trials;
  var wins = 0;
  var cash = stake;
  var bets = 0;
  while (trials > 0) {
    cash = stake;
    while (cash <= goal && cash > 0) {
      bets = Math.random();
      if (bets < 0.5) {
        cash++;
      }
      else {
        cash--;
      }
      if (cash >= goal) {
        wins++;
        break;
      }
    }
    trials--;
  }
  alert("Number of wins is " + wins + ".\nPercentage of win is " + Math.floor((wins / trial2) * 100)
   + "%\nPercentage of loss is "+(100-( Math.floor((wins / trial2) * 100)))+"%");
}
