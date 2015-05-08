var TicTacJoe = TicTacJoe || {};


TicTacJoe.Game = (function() {
  var _playerTurn = 0,
  _gameBoard = [[0,0,0],[0,0,0],[0,0,0]],
  $boardDomElement;

  function _renderBoard () {
    var xcounter = 0;
    var ycounter = 0;

    $boardDomElement.html('');

    for (var i = 0; i < 9; i++) {
      $boardDomElement.append('<div class="square" data-x = "' + xcounter + '" data-y = "' + ycounter + '"></div>');
      xcounter++;
      if (xcounter === 3) {
        xcounter = 0;
        ycounter++;
      }
      };

  }

  function _init (boardDomElement) {
    $boardDomElement = boardDomElement;
    _renderBoard();
  }

  function _testWin (){
    console.log('Tested Winner');
  }


  return {
    init: _init,
    renderBoard: _renderBoard,
    gameBoard: _gameBoard,
    testWinner: _testWin
  };
}) ();


// Two-dimensional array
// given a  board, is this state valid?
// one-dimensional - 0x+3y
// two-dimensional - x and $apply
// var board = new Board();
// b.getSquareAt(x,y);







