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

  function _setBoard (ycoord, xcoord, player, domEl) {
    _gameBoard[ycoord][xcoord] = player;
    _addOwner(domEl,playerNum);
  }

  function _addOwner (domEl,playerNum) {
    // body...//If it's player one, add x, else give it o
    if (playerNum === 1){
      $(domEl).addClass('x');
    } else {
      $(domEl).addClass('o');
    }
  }

  function _checkBoard (ycoord, xcoord) {
    if (_gameBoard[ycoord][xcoord] === 0) {
      return true;
    } else {
      return false;
    }
  }

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

  function _addPoint (player) {
    var playerDiv = ("#p"+player+"-score");
    var oldScore = parseInt($(playerDiv).html());
    $(playerDiv).html(oldScore+=1);
  }

  function _testWin (playerNum){
    if( _check_rows(playerNum) || _check_columns(playerNum) || _check_diags(playerNum)) {
      return true;
    } else {
      return false;
    }

  }

  function _victory (player) {

    _addPoint(player);
    $('.modal-content p').html("Player " + player + " has emerged victorious, gaining them 1 victory point");
    $('.bs-example-modal-sm').modal('show');
    $('button:hidden').toggleClass('hidden');
  }

  return {
    init: _init,
    renderBoard: _renderBoard,
    gameBoard: _gameBoard,
    testWinner: _testWin,
    setBoard: _setBoard,
    checkBoard: _checkBoard,
    addVictory: _victory
  };
}) ();


// Two-dimensional array
// given a  board, is this state valid?
// one-dimensional - 0x+3y
// two-dimensional - x and $apply
// var board = new Board();
// b.getSquareAt(x,y);







