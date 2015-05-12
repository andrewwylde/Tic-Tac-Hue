var TicTacJoe = TicTacJoe || {};

function addOwner (domEl,playerNum) {
  if (playerNum === 1){
    $(domEl).addClass('x');
  } else {
    $(domEl).addClass('o');
  }
}

function getAlertDiv (playerNum) {
  if (playerNum === 1) {
    return '<div class="alert alert-success">';
  } else {
    return '<div class="alert alert-danger">';
  }
}


$(document).ready(function() {

  var turnNumber = 1, playerNum = 1, domEl = $('#gameboard'), game = TicTacJoe.Game, xcoord, ycoord;

  game.init(domEl);


  $('#start').click(function () {
    turnNumber = 1;
    var playerNum = 1;
    game = TicTacJoe.Game;
    game.init(domEl);
    $(this).toggleClass('hidden');
    $(this).html('Play Again?');

    $('#spacer').html('Player Turn: ' + turnNumber + '<br>Player Number: ' + playerNum);
    $('#spacer').show();
  });



  $('#gameboard').on('click', '.square',function() {
      xcoord = $(this).data('x');
      ycoord = $(this).data('y');

      alertDiv = getAlertDiv(playerNum);
      $('#log').prepend(alertDiv + "Move: " + turnNumber + ": " + "Player Number " + playerNum + " selected square at position [" + xcoord + "," + ycoord + "]" + "</div>---");



    if (turnNumber < 9) {
      game.setBoard(ycoord,xcoord,playerNum);
      game.testWinner(playerNum);
    } else {

      $(this).addClass(playerNum);

      game.setBoard(ycoord,xcoord,playerNum);

      if (!game.testWinner(playerNum)) {
        alert('No Winner!');
      }
      $('button:hidden').toggleClass('hidden');
      $('#spacer').hide();

    }

    turnNumber++;
    addOwner($(this),playerNum);


    // if (playerNum === 1) {
    //   $(this).addClass('x');
    //
    // } else {
    //   $(this).addClass('o');
    //   $(this).html('<img src="resources/images/playO.png" alt="" class="marker">');
    // }


  //Test if turn# is even, if not, switch
  if (turnNumber%2 === 0){
    playerNum = 2;
  } else {
    playerNum = 1;
  }

  $('#spacer').html('Player Turn: ' + turnNumber + '<br>Player Number: ' + playerNum);
});

});


