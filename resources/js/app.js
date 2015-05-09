var TicTacJoe = TicTacJoe || {};

$(document).ready(function() {

var turnNumber = 1;
var playerNum = 1;
var domEl = $('#gameboard');
var game;


$('#start').click(function () {
  game = TicTacJoe.Game;
  game.init(domEl);
  $(this).toggleClass('hidden');
  $(this).html('Play Again?')
  // debugger;
  $('#spacer').show();
})



$('#gameboard').on('click', '.square',function() {
  console.log('this totally ahpnendad');

  if(turnNumber < 9){

  var xcoord = $(this).data('x');
  var ycoord = $(this).data('y');
  var square = game.gameBoard[xcoord][ycoord];

  turnNumber ++;

} else {
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
