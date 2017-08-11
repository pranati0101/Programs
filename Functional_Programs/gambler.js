function gamble() {
  var stake = document.getElementById("stake").value;
  var goal = document.getElementById("goal").value;
  var trials = document.getElementById("trials").value;
  var bets = trials;
  var wins = 0;
  var cash = stake;
  var t = 0;
  while (trials > 0) {
    cash = stake;
    while (cash <= goal && cash > 0) {
      t = Math.random();
      if (t > 0.49) {
        cash++;
      } else {
        cash--;
      }
      if (cash >= goal) {
        wins++;
        break;
      }
    }
    trials--;
  }
  document.write("Number of wins is " + wins + ".\n Percentage of win is" + Math.round((wins / bets) * 100) + "%");
  //document.write("Number of wins is "+wins+".\n Percentage of win is"+Math.round((wins/bets)*100)+"%."+"\n"+
  //"Percentage of loss is "+(100-(Math.round((wins/bets)*100)))+"%.");
}
