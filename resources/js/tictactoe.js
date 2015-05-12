var TicTacJoe = TicTacJoe || {};


TicTacJoe.Game = (function() {
  var _gameBoard = [[0,0,0],[0,0,0],[0,0,0]], $logDomElement, $boardDomElement, turnNumber;

  function _renderBoard () {
    var xcounter = 0;
    var ycounter = 0;

    $boardDomElement.html('');
    $logDomElement.html('');


    for (var i = 0; i < 9; i++) {
      $boardDomElement.append('<div class="square col-xs-4" data-x = "' + xcounter + '" data-y = "' + ycounter + '"></div>');
      xcounter++;
      if (xcounter === 3) {
        $boardDomElement.append('</div>');
        xcounter = 0;
        ycounter++;
      }
    }

  }

  function _init (boardDomElement, logDomElement) {
    $boardDomElement = boardDomElement;
    $logDomElement = logDomElement;
    _gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
    _renderBoard();
  }

  function _setBoard (ycoord, xcoord, player) {
      _gameBoard[ycoord][xcoord] = player;
  }

  function _checkBoard (ycoord, xcoord) {
    if (_gameBoard[ycoord][xcoord] === 0) {
      return true;
    } else {
      return false;
    }
  }

// [0,0, 0,1, 0,2]
// [1,0, 1,1, 1,2]
// [2,0, 2,1, 2,2]

function _check_diags (playerNum) {
  if (_gameBoard[0][0] ===playerNum && _gameBoard[1][1] === playerNum && _gameBoard[2][2]===playerNum) {
    return true;
  } else if (_gameBoard[0][2] ===playerNum && _gameBoard[1][1] === playerNum && _gameBoard[2][0]===playerNum) {
    return true;
  }
  else {
    return false;
  }
}

function _check_rows (playerNum) {

  if(_gameBoard[0][0] === playerNum && _gameBoard[0][1] ===playerNum && _gameBoard[0][2]===playerNum) {
    return true;
  } else if (_gameBoard[1][0] === playerNum && _gameBoard[1][1] ===playerNum && _gameBoard[1][2]===playerNum) {
    return true;
  } else if (_gameBoard[2][0] === playerNum && _gameBoard[2][1] ===playerNum && _gameBoard[2][2]===playerNum) {
    return true;
  } else {
    return false;
  }
}


function _check_columns (playerNum) {
  if(_gameBoard[0][0] === playerNum && _gameBoard[1][0] ===playerNum && _gameBoard[2][0]===playerNum) {
    return true;
  } else if (_gameBoard[0][1] === playerNum && _gameBoard[1][1] ===playerNum && _gameBoard[2][1]===playerNum) {
    return true;
  } else if (_gameBoard[0][2] === playerNum && _gameBoard[1][2] ===playerNum && _gameBoard[2][2]===playerNum) {
    return true;
  } else {
    return false;
  }
}

function _testWin (playerNum){
  if( _check_rows(playerNum) || _check_columns(playerNum) || _check_diags(playerNum)){
    _victory(playerNum);
    return true;
  } else {
    return false;
  }

}


function _victory (player) {
  alert('PLAYER ' + player.toString() + ' HAS WON THE GAME');

  $('button:hidden').toggleClass('hidden');
  $('#spacer').toggleClass('hidden');
}


return {
  init: _init,
  renderBoard: _renderBoard,
  gameBoard: _gameBoard,
  testWinner: _testWin,
  setBoard: _setBoard,
  checkBoard: _checkBoard,
};
}) ();


// Two-dimensional array
// given a  board, is this state valid?
// one-dimensional - 0x+3y
// two-dimensional - x and $apply
// var board = new Board();
// b.getSquareAt(x,y);







