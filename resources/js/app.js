//CAll set twice
// 1. When a player makes a move
// 2. When the game is reset

//Keep the state consistent

//When you reset, just set it to something

//Depending on how data is stored,
//board state is the game.gameBoard


var disabled = false;

var TicTacJoe = TicTacJoe || {};

var usersRef = new Firebase ('https://tic-tac-hue.firebaseio.com/users/');
var dbRef = new Firebase ('https://tic-tac-hue.firebaseio.com/');
var gameRef = new Firebase ('https://tic-tac-hue.firebaseio.com/game/');

var gameAuth;


var  setUser = function(player){
  usersRef.set({player: otherPlayer(player),
    waitingPlayer: gameAuth.uid});
};


var otherPlayer = function(player) {
  return player === 'X' ? 'O' : 'X';
};


function getAlertDiv (player, turnNumber, xcoord, ycoord) {
  var ending = "<strong>Move " + turnNumber + "</strong>: " + "Player " + player + " selected square at position [" + xcoord + "," + ycoord + "]" + "</div>";
  var prefix;

  if (player === 'X') {
    //Green for Player 1
    prefix = '<div class="alert alert-success log-alert">';
  } else if (player === 'O'){
    //Red for Player 2
    prefix = '<div class="alert alert-danger log-alert">';
  }
  return prefix + ending;
}

function gameToDB (game){
  gamesRef.push(game);
}


function makeLogEntry (player, turnNumber, xcoord, ycoord) {
  var alertContents;
  if (player) {
    alertContents = getAlertDiv(player, turnNumber, xcoord, ycoord);
  } else {
    alertContents = '<div class="alert alert-warning log-alert">Neither Player Was Victorious</div>';
  }

  $('#log').prepend(alertContents);
          //Dope animation
          $('.alert').fadeIn('slow');
        }


//Declar a bunch of variables, starting with turn 1, player 1, and the domEl to be passed within a few functions here.

var turnNumber = 1, player, domEl = $('#gameboard'), logEl = $('#log'), xcoord, ycoord, gameWon = false;

//Initiate Doc Readiness

$(document).ready(function() {

  $('#start').click(function () {
    turnNumber = 1;
    player = 'X';
    game = TicTacJoe.Game;
    game.init(domEl, logEl);
    gameWon = false;
    setUser(player);

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
        if (game.checkBoard(ycoord,xcoord) && !disabled) {

          //Make a div that contains all the necessary information for the Log
          makeLogEntry(player, turnNumber, xcoord, ycoord);

          //SEt the board to this person's stuff
          game.setBoard(ycoord,xcoord,player, $(this));
          gameWon = game.testWinner(player);

          if (gameWon) {
            game.addVictory(player);
          }

          turnNumber++;
          player = otherPlayer(player);

          if (turnNumber > 9 && !gameWon){
            game.addVictory();
            makeLogEntry(false,turnNumber,xcoord,ycoord);
          }

          //Reset the hidden button to be visible!
          $('button:hidden').toggleClass('hidden');


          } else {

            alert('Someone already played there...');
          }

        }




      });
});


