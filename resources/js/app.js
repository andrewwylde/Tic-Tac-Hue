var TicTacJoe = TicTacJoe || {};

var otherPlayer = function(player) {
  return player === 'X' ? 'O' : 'X';
};

//Function for creating a log entry.
function getAlertDiv (player, turnNumber, xcoord, ycoord) {

  var prefix;
  //Here's just the contents of the div that we want to return
  var ending = "<strong>Move " + turnNumber + "</strong>: " + "Player " + player + " selected square at position [" + xcoord + "," + ycoord + "]" + "</div>";

  if (player === 'X') {
    //Green for Player 1
    prefix = '<div class="alert alert-success log-alert">';
  } else if (player === 'O'){
    //Red for Player 2
    prefix = '<div class="alert alert-danger log-alert">';
  }
  return prefix + ending;
}

//Self-explanatory, really
function makeLogEntry (player, turnNumber, xcoord, ycoord) {
  var alertContents;
  if (player) {
    alertContents = getAlertDiv(player, turnNumber, xcoord, ycoord);
  } else {
    alertContents = '<div class="alert alert-warning log-alert">Neither Player Was Victorious</div>';
  }

  //Make it so
  $('#log').prepend(alertContents);
        //Dope animation
        $('.alert').fadeIn('slow');
}


//Declar a bunch of variables, starting with turn 1, player 1, and the domEl to be passed within a few functions here.

var turnNumber = 1, player, domEl = $('#gameboard'), logEl = $('#log'), xcoord, ycoord, gameWon = false;

//Initiate Doc Readiness

$(document).ready(function() {



  $('#start').click(function () {
    //Set some initial states and create a new game.
    turnNumber = 1;
    player = 'X';
    game = TicTacJoe.Game;
    game.init(domEl, logEl);
    gameWon = false;

    //Hide this button and change its wording
    $(this).toggleClass('hidden');
    $(this).html('Restart?');
    //Show the score board
    $('#score-board').removeClass('hidden');
    $('#toggle-chat').removeClass('hidden');

  });

  $('#toggle-chat').click(function(){
    $('#log').toggleClass('hidden');
    $('#chat').toggleClass('hidden');
    $('#toggle-chat').html() === "Chat" ? $('#toggle-chat').html('Log'):$('#toggle-chat').html('Chat');
  });

  $('#gameboard').on('click', '.square',function() {

    if(!gameWon){
        //Set X and Y Coordinates for the square that was clicked
        xcoord = $(this).data('x');
        ycoord = $(this).data('y');

        //Verify that nothing exists on the game board at this time
        if (game.checkBoard(ycoord,xcoord)) {

          //Pretty self-explanatory
          makeLogEntry(player, turnNumber, xcoord, ycoord);

          //Set the board to this person's stuff
          game.setBoard(ycoord,xcoord,player, $(this));
          gameWon = game.testWinner(player);
          if (game.testWinner(player)) {
            game.addVictory(player);
            $('#start').removeClass('hidden');
          }
          //Increment turn number here so that the below gameWon will trigger at the end.
          turnNumber++;
          //Switch Players
          player = otherPlayer(player);
          //This is the 'Draw Condition' check
          if (turnNumber > 9 && !(gameWon)){
            //When I pass addVictory without a player, the function takes the appropriate course
            game.addVictory();
            makeLogEntry(false,turnNumber,xcoord,ycoord);
          }

          //Reset the hidden button to be visible!
          // $('button:hidden').toggleClass('hidden');


        } else {
          //Trigger a warning that the space has already been clicked
          $('.modal-content p').html("Game Over: Resulted in Draw");
          $('.bs-example-modal-sm').modal('show');
          $('button:hidden').toggleClass('hidden');
        }
      }
    });
});


