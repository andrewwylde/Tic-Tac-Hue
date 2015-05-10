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
    $('#spacer').show();
  })



$('#gameboard').on('click', '.square',function() {
  if(turnNumber < 9){
    var xcoord = $(this).data('x');
    // console.log('XcoorD: ' + xcoord);
    var ycoord = $(this).data('y');
    // console.log('YcoorD: ' + ycoord);
    game.setBoard(ycoord,xcoord,playerNum);

    turnNumber ++;


//Test if turn# is even, if not, switch
    if (turnNumber%2 === 0){
      playerNum = 2
    } else {
      playerNum = 1
    }

} else if (turnNumber >= 5) {

  var xcoord = $(this).data('x');
  // console.log('XcoorD: ' + xcoord);
  var ycoord = $(this).data('y');
  // console.log('YcoorD: ' + ycoord);
  game.setBoard(ycoord,xcoord,playerNum);
  game.testWinner(playerNum);

} else if (turnNumber === 9) {

  var xcoord = $(this).data('x');
  // console.log('XcoorD: ' + xcoord);
  var ycoord = $(this).data('y');
  // console.log('YcoorD: ' + ycoord);
  game.setBoard(ycoord,xcoord,playerNum);
  game.testWinner(playerNum);

  console.log(game.gameBoard);
  alert('Game Over');
  $('button:hidden').toggleClass('hidden');
  $('#spacer').hide();
}

/*This is the area where I test for win conditions*/


// if(turnNumber >=4){
//   game.testWinner();
// }
// console.log('Turn Number: '+ turnNumber);

//Switch turn to Player 2 else switch to player 1
});

});
