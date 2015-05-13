var TicTacJoe = TicTacJoe || {};

//Function to grant ownership to a square
function addOwner (domEl,playerNum) {

  //If it's player one, add x, else give it o
  if (playerNum === 1){
    $(domEl).addClass('x');
  } else {
    $(domEl).addClass('o');
  }
}


//Function to create an alert div. Constructs appropriate div with prefix and suffix
function getAlertDiv (playerNum, turnNumber, xcoord, ycoord) {
  var ending = "<strong>Move " + turnNumber + "</strong>: " + "Player " + playerNum + " selected square at position [" + xcoord + "," + ycoord + "]" + "</div>";
  var prefix;
  if (playerNum === 1) {
    //Green for Player 1
    prefix = '<div class="alert alert-success log-alert">';
    return prefix + ending;
  } else if (playerNum === 2){
    //Red for Player 2
    prefix = '<div class="alert alert-danger log-alert">';
    return  prefix + ending;
  } else if (playerNum === 0){
    //No win gets a yellow alert
    return '<div class="alert alert-warning log-alert">Neither Player Was Victorious</div>';
  }
}

function gameToDB (game){
  gamesRef.push(game);
}


function makeLogEntry (playerNum, turnNumber, xcoord, ycoord) {
  var alertContents = getAlertDiv(playerNum, turnNumber, xcoord, ycoord);
          $('#log').prepend(alertContents);
          //Dope animation
          $('.alert').fadeIn('slow');
}


//Declar a bunch of variables, starting with turn 1, player 1, and the domEl to be passed within a few functions here.

var turnNumber = 1, playerNum = 1, domEl = $('#gameboard'), logEl = $('#log'), xcoord, ycoord, gameWon = false;

//Initiate Doc Readiness

$(document).ready(function() {

  $('#start').click(function () {
    turnNumber = 1;
    playerNum = 1;
    game = TicTacJoe.Game;
    game.init(domEl, logEl);
    gameWon = false;

    //Hide this button and change its wording
    $(this).toggleClass('hidden');
    $(this).html('Play Again?');
    //Show the score board
    $('#score-board').removeClass('hidden');
  });

  $('#gameboard').on('click', '.square',function() {

    if(!gameWon){
        //Set X and Y Coordinates for the square that was clicked
        xcoord = $(this).data('x');
        ycoord = $(this).data('y');

        //Verify that nothing exists on the game board at this time
        if (game.checkBoard(ycoord,xcoord)) {

          //Make a div that contains all the necessary information for the Log
          makeLogEntry(playerNum, turnNumber, xcoord, ycoord);

          //Check if this is the last possible turn
          //  if not, then go ahead and test winner (I know you could wait until the
          //  5th turn, but
          if (turnNumber < 9) {
            game.setBoard(ycoord,xcoord,playerNum);

            addOwner($(this),playerNum);
            gameWon = game.testWinner(playerNum);
            if (gameWon) {
            game.addVictory(playerNum);
          }
            turnNumber++;

            if (turnNumber%2 === 0){
              playerNum = 2;
            } else {
              playerNum = 1;
            }
          }
          else {

            // Otherwise, go ahead and add this piece to the board
            game.setBoard(ycoord,xcoord,playerNum);

            addOwner($(this),playerNum);

            // Then check whether that resulted in a victory.
            if (!game.testWinner(playerNum)) {
              gameWon = true;
              $('button:hidden').toggleClass('hidden');

              //Alert Sadness that there's no winner
              makeLogEntry(0, turnNumber, xcoord, ycoord);
            } else {
            game.addVictory(playerNum);
          }

            //Reset the hidden button to be visible!
            $('button:hidden').toggleClass('hidden');

          }



      } else {

        alert('Someone already played there...');
      }


    }




});
});


