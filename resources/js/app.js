var TicTacJoe = TicTacJoe || {};

$(document).ready(function() {

  var turnNumber = 1,
  playerNum = 1,
  domEl = $('#gameboard'),
  game = TicTacJoe.Game,
  xcoord,
  ycoord,
  gameWon = false;

  game.init(domEl);


  $('#start').click(function () {
    turnNumber = 1;
    var playerNum = 1;
    game = TicTacJoe.Game;
    game.init(domEl);
    $(this).toggleClass('hidden');
    $(this).html('Play Again?');
    // debugger;
    $('#spacer').html('Player Turn: ' + turnNumber + '<br>Player Number: ' + playerNum);
    $('#spacer').show();
  });



  $('#gameboard').on('click', '.square',function() {
      xcoord = $(this).data('x');
      ycoord = $(this).data('y');

      $('#log').prepend("Move: " + turnNumber + ": You selected square at position [" + xcoord + "," + ycoord + "]" + "<br>");
      console.log(game.gameBoard[ycoord][xcoord]);


    if (turnNumber < 9) {
      game.setBoard(ycoord,xcoord,playerNum);
      game.testWinner(playerNum);
    } else {

      $(this).addClass(playerNum);

      game.setBoard(ycoord,xcoord,playerNum);
      if (!game.testWinner(playerNum)) {
        alert ('No Winner!');
      }
      $('button:hidden').toggleClass('hidden');
      $('#spacer').hide();

    }

    $('.alert-success').html('You placed a square at a place: [' + xcoord  + ',' + ycoord +']' + '<br>[' + game.gameBoard[0] + ']' + '<br>[' + game.gameBoard[1] + ']' + '<br>[' + game.gameBoard[2] + ']');
    $('.alert-success').alert();

    turnNumber++;

    if (playerNum === 1) {
      $(this).addClass('x');
      $(this).html('<img src="resources/images/playX.png" alt="" class="marker" > ');
    } else {
      $(this).addClass('o');
      $(this).html('<img src="resources/images/playO.png" alt="" class="marker">');
    }


  //Test if turn# is even, if not, switch
  if (turnNumber%2 === 0){
    playerNum = 2;
  } else {
    playerNum = 1;
  }

  $('#spacer').html('Player Turn: ' + turnNumber + '<br>Player Number: ' + playerNum);
});

});


