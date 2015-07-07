var TicTacJoe = TicTacJoe || {};
//Declar a bunch of variables, starting with turn 1, player X, and the domEl to be passed within a few functions here.



var turnNumber = 1,
  player, domEl = $('#gameboard'),
  logEl = $('#log'),
  xcoord, ycoord, gameWon = false;

//Initiate Doc Readiness

$(document).ready(function() {
  var currentUser = {};

  var isNewUser = true;
  var myRef = new Firebase("https://tic-tac-hue.firebaseio.com");
  var authClient = new FirebaseSimpleLogin(myRef, function(error, user) {
    if (error !== null) {
      console.log("Login error:", error);
    } else if (user !== null) {
      console.log("User authenticated with Firebase:", user);
    } else {
      console.log("User is logged out");
    }
  });
  // ================================
  // LOGIN
  // ================================
  $('#login').on('click', function(e) {
    e.preventDefault();
    authClient.login('anonymous', {
      username: $('input#username').val()
    });
  });

  $('#logout').on('click', function(e) {
    e.preventDefault();
    authClient.logout();
  });


  $('#start').click(function() {
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

  $('#toggle-chat').click(function() {
    $('#log').toggleClass('hidden');
    $('#chat').toggleClass('hidden');
    $('#toggle-chat').html() === "Chat" ? $('#toggle-chat').html('Log') : $('#toggle-chat').html('Chat');
  });

  $('#clearMessage').click(function() {
    messagesRef.set({});
    $('#messages').html('');
  });

  $('#gameboard').on('click', '.square', function() {

    if (!gameWon) {
      //Set X and Y Coordinates for the square that was clicked
      xcoord = $(this).data('x');
      ycoord = $(this).data('y');

      //Verify that nothing exists on the game board at this time
      if (game.checkBoard(ycoord, xcoord)) {

        //Pretty self-explanatory
        game.makeLogEntry(player, turnNumber, xcoord, ycoord);

        //Set the board to this person's stuff
        game.setBoard(ycoord, xcoord, player, $(this));
        gameWon = game.testWinner(player);
        if (game.testWinner(player)) {
          game.addVictory(player);
          $('#start').removeClass('hidden');
        }
        //Increment turn number here so that the below gameWon will trigger at the end.
        turnNumber++;
        //Switch Players
        player = game.switchPlayers(player);
        //This is the 'Draw Condition' check
        if (turnNumber > 9 && !(gameWon)) {
          //When I pass addVictory without a player, the function takes the appropriate course
          game.addVictory();
          game.makeLogEntry(false, turnNumber, xcoord, ycoord);
        }

        //Reset the hidden button to be visible!
        // $('button:hidden').toggleClass('hidden');


      } else {
        //Trigger a warning that the space has already been clicked
        $('.modal-content p').html("THOU SHALT NOT CLICK WHERE A HUE HATH BEEN PLACED!!");
        $('.modal-content h2').html('HOW DARE THEE?');
        $('.bs-example-modal-sm').modal('show');
        // $('button:hidden').toggleClass('hidden');
      }
    }
  });
});
