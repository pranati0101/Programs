var squares=[];
  var   EMPTY = "\xA0",
        score,
        turn="X",
        moves;
var board, running;
var wins = [7, 56, 448, 73, 146, 292, 273, 84];

    /*
     * Clears the score and move count, erases the board, and makes it
     * X's turn.
     */

        function startNewGame() {
          var i;
        // turn = "X";
        score = {"X": 0, "O": 0};
        moves = 0;
        for (i = 0; i < squares.length; i += 1) {
            squares[i].firstChild.nodeValue = EMPTY;
        }
        }



    /*
     * Returns whether the given score is a winning score.
     */
    function win(score) {
        var i;
        for (i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    }

    /*
     * Sets the clicked-on square to the player's mark,
     * then checks for a win or draw game.  Also changes the
     * turn.
     */
set=function() {
        if (this.firstChild.nodeValue !== EMPTY) {
            return;
        }
        this.firstChild.nodeValue = turn;
        moves += 1;
        score[turn] += this.indicator;
      if (win(score["X"])) {
            alert("You won!");
            startNewGame();
        }
        else if(win(score["O"])){
          alert("You lost!");
          startNewGame();
        }
         else if(moves === 9) {
            window.alert("Its a draw!");
            start();
        }
        else{  //computer turn
          compturn();
        }
}

function compturn(){
    for(i=0;i<9;i++){
      console.log(squares[i].firstChild.nodeValue);
      if(squares[i].firstChild.nodeValue==EMPTY){
        squares[i].firstChild.nodeValue="O";
        moves += 1;
        score["O"] += squares[i].indicator;
        break;
      }
    }
    if (win(score["X"])) {
          alert("You won!");
          startNewGame();
      }
      else if(win(score["O"])){
        alert("You lost!");
        startNewGame();
      }
       else if(moves === 9) {
          window.alert("Its a draw!");
          startnewGame();
      }

}

function play() {
  console.log("in play");

  if(running==true){  //if already running
    startNewGame();
  }
  else{   //else craete board
    board = document.createElement("TABLE");
   var indicator = 1,
       i, j,
       parent,
       row, cell;
      board.border = 2;
   for (i = 0; i < 3; i += 1) {
       row = document.createElement("tr");
       board.appendChild(row);
       for (j = 0; j < 3; j += 1) {
           cell = document.createElement("td");
           cell.width = cell.height = 60;
           cell.align = cell.valign = 'center';
           cell.indicator = indicator;
           cell.onclick = set;
           cell.appendChild(document.createTextNode(""));
           row.appendChild(cell);
           squares.push(cell);
           indicator += indicator;
       }
   }
   // Attach  to body.
document.getElementById("tictactoe").appendChild(board);
 running=true;
 startNewGame();
  }

}
