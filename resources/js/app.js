var TicTacJoe = TicTacJoe || {};

$(document).ready(function() {

turnNumber = 8;
playerNum = 1;

domEl = $('#gameboard');
game = TicTacJoe.Game;
game.init(domEl);

$('#start').click(function () {
  game = TicTacJoe.Game;
  game.init(domEl);
  $(this).toggleClass('hidden');
  $('#spacer').show();
});

$('.square').click(function() {

if(turnNumber < 9){

  var xcoord = $(this).data('x');
  var ycoord = $(this).data('y');
  var square = game.gameBoard[xcoord][ycoord];

  turnNumber ++;

} else {
alert('Game Over');
$('button:hidden').toggleClass('hidden');
}

/*This is the area where I test for win conditions*/


// if(turnNumber >=4){
//   game.testWinner();
// }
// console.log('Turn Number: '+ turnNumber);

//Switch turn to Player 2 else switch to player 1
});

});
