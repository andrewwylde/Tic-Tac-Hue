var TicTacJoe = TicTacJoe || {};

$(document).ready(function() {

  var turnNumber = 1;
  var playerNum = 1;
  var domEl = $('#gameboard');
  var game = TicTacJoe.Game;

  game.init(domEl);


  $('#start').click(function () {
    game = TicTacJoe.Game;
    game.init(domEl);
    $(this).toggleClass('hidden');
    $(this).html('Play Again?')
    // debugger;
    $('#spacer').html('Player Turn: ' + turnNumber + '<br>Player Number: ' + playerNum);
    $('#spacer').show();
  })



$('#gameboard').on('click', '.square',function() {
  if(turnNumber < 5){
    var xcoord = $(this).data('x');
    // console.log('XcoorD: ' + xcoord);
    var ycoord = $(this).data('y');
    // console.log('YcoorD: ' + ycoord);
    game.setBoard(ycoord,xcoord,playerNum);

} else if (turnNumber < 9) {
  var xcoord = $(this).data('x');
  // console.log('XcoorD: ' + xcoord);
  var ycoord = $(this).data('y');
  // console.log('YcoorD: ' + ycoord);
  game.setBoard(ycoord,xcoord,playerNum);
  // game.testWinner(playerNum);

} else {

  var xcoord = $(this).data('x');
  // console.log('XcoorD: ' + xcoord);
  var ycoord = $(this).data('y');
  // console.log('YcoorD: ' + ycoord);
  game.setBoard(ycoord,xcoord,playerNum);
  // game.testWinner(playerNum);

  console.log(game.gameBoard);
  alert('Game Over');
  $('button:hidden').toggleClass('hidden');
  $('#spacer').hide();
}


turnNumber++;

//Test if turn# is even, if not, switch
    if (turnNumber%2 === 0){
      playerNum = 2
    } else {
      playerNum = 1
    }

    $('#spacer').html('Player Turn: ' + turnNumber + '<br>Player Number: ' + playerNum);
});

});
