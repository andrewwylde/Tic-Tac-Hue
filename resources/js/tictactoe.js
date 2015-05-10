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

  function _setBoard (xcoord, ycoord, player) {
    _gameBoard[ycoord][xcoord] = player;
  }

// [0,0, 0,1, 0,2]
// [1,0, 1,1, 1,2]
// [2,0, 2,1, 2,2]

  function _check_diags () {
    if (_gameBoard[0][0] ===   0 && _gameBoard[1][1] === 0 && _gameBoard[2][2]) {
      return true;
    } else {
      return false;
    }
  }

  function _check_rows (playerNum) {
    for (var i = 0; i < _gameBoard.length; i++) {
      if(_gameBoard[i][0] === _gameBoard[i][1] ===_gameBoard[i][2]) {
        return true;
      }
    }
  }


  function _check_columns (playerNum) {
    for (var i = 0; i<=2; i++){
      if(
        _gameBoard[0][i] === playerNum
        && _gameBoard[1][i] === playerNum
        && _gameBoard[2][i] === playerNum
        ){
        return true;
      }
    }

  }

  function _testWin (playerNum){
    return _check_columns(playerNum) || _check_diags(playerNum) || _check_rows(playerNum)
}


  return {
    init: _init,
    renderBoard: _renderBoard,
    gameBoard: _gameBoard,
    testWinner: _testWin,
    setBoard: _setBoard
  };
}) ();


// Two-dimensional array
// given a  board, is this state valid?
// one-dimensional - 0x+3y
// two-dimensional - x and $apply
// var board = new Board();
// b.getSquareAt(x,y);







