//CAll set twice
// 1. When a player makes a move
// 2. When the game is reset

//Keep the state consistent

//When you reset, just set it to something

//Depending on how data is stored,
//board state is the game.gameBoard


var disable = false;

var TicTacJoe = TicTacJoe || {};

var gameRef = new Firebase ('https://tic-tac-hue.firebaseio.com/game/');
var lastPlayed = new Firebase('https://tic-tac-hue.firebaseio.com/game/lastPlayed/');
var gameAuth;



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


function addToLog (contents) {
  $('#log').prepend(contents);
  $('.alert').fadeIn('slow');
}

function makeLogEntry (player, turnNumber, xcoord, ycoord) {
  var alertContents;

  if (player) {
    alertContents = getAlertDiv(player, turnNumber, xcoord, ycoord);
  } else {
    alertContents = '<div class="alert alert-warning log-alert">Neither Player Was Victorious</div>';
  }

  addToLog(alertContents);
}

//Declar a bunch of variables, starting with turn 1, player 1, and the domEl to be passed within a few functions here.

var turnNumber = 1, player, domEl = $('#gameboard'), logEl = $('#log'), xcoord, ycoord, gameWon = false;


  //Get a "unique" id for the user
  if (!(gameAuth = gameRef.getAuth())) {
    gameRef.authAnonymously(function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        gameAuth = authData;
      }
    });
  }



//Initiate Doc Readiness
$(document).ready(function() {

  $('#start').click(function () {

    turnNumber = 1;
    player = 'X';
    game = TicTacJoe.Game;
    game.init(domEl, logEl);
    gameWon = false;
    var startElement = $(this);


    //FIREBASE SET
    gameRef.set({player: 'X'});
    lastPlayed.set({
      player: '',
      xcoord: '',
      ycoord: ''

    });


    //Hide this button and change its wording
    $(this).toggleClass('hidden');
    $(this).html('Play Again?');
    //Show the score board
    $('#score-board').removeClass('hidden');
  });

  $('#gameboard').on('click', '.square',function() {

    var squareElement = $(this);

    if(!gameWon){
        //Set X and Y Coordinates for the square that was clicked
        xcoord = squareElement.data('x');
        ycoord = squareElement.data('y');

        //Verify that nothing exists on the game board at this time
        if (game.checkBoard(ycoord,xcoord) && !disable) {

          //Make a div that contains all the necessary information for the Log
          makeLogEntry(player, turnNumber, xcoord, ycoord);
          //SEt the board to this person's stuff

          game.setBoard(ycoord,xcoord,player, $(this));

          if (game.testWinner(player)) {
            game.addVictory(player);
          }

          turnNumber++;


          //FIREBASE SET
          gameRef.set({
            player: otherPlayer(player),
            waitingPlayer: gameAuth.uid,
          });

          lastPlayed.set({
            player: player,
            xcoord: xcoord,
            ycoord: ycoord
          });


          if (turnNumber > 9 && !gameWon){
            game.addVictory();
            makeLogEntry(false,turnNumber,xcoord,ycoord);
          }

          //Reset the hidden button to be visible!
          $('button:hidden').toggleClass('hidden');


        } else {
        }

      }




      //FIREBASE GET
      gameRef.on('value', function (snapshot) {
        var message = snapshot.val();
        disable = false;

        if (message) {

          if (gameAuth.uid === message.waitingPlayer) {
            player = otherPlayer(message.player);
            disable = true;
          } else {
            player = message.player;
          }
        }
      });



    });
lastPlayed.on('value', function(snapshot) {
  var content = snapshot.val();
  if (content) {
    xcoord = content.xcoord;
    ycoord = content.ycoord;
    playedPlayer = content.player;

    if(game && game.checkBoard(ycoord,xcoord)){
      game.setBoard(ycoord,xcoord,playedPlayer);
    }
  }
});

});


