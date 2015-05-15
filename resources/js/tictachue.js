var TicTacJoe = TicTacJoe || {};

// Create an IIFE/Constructor function
TicTacJoe.Game = (function() {
  // Set the gameBoard to a temporary state and set some variables
  var _gameBoard = [[0,0,0],[0,0,0],[0,0,0]], $logDomElement, $boardDomElement, turnNumber;

  // Render the board by looping through and giving them
  // x and y coordinates
  function _renderBoard () {
    var xcounter = 0;
    var ycounter = 0;

    //Clear the HTML for the two elements:)
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
  // Initializer for the board, which takes in the board Dom Element and the log dom Element. Just sets the gameBoard array and renders the board
  function _init (boardDomElement, logDomElement) {
    $boardDomElement = boardDomElement;
    $logDomElement = logDomElement;
    _gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
    _renderBoard();
  }

  //Sets the game board with the player letter and calls addowner...
  function _setBoard (ycoord, xcoord, player, domEl) {
    _gameBoard[ycoord][xcoord] = player;
    _addOwner(domEl,player);
  }

  //This adds a class for the player on the dom element
  function _addOwner (domEl,player) {
  //If it's player one, add x, else give it o
    if (player === 'X'){
      $(domEl).addClass('x');
    } else {
      $(domEl).addClass('o');
    }
  }

  //Checks the board at coordinates x and y to see if taken
  function _checkBoard (ycoord, xcoord) {
    if (_gameBoard[ycoord][xcoord] === 0) {
      return true;
    } else {
      return false;
    }
  }


  //##This section covers the win conditions. It brute forces
  //  the answer.
  function _check_diags (player) {
    if (_gameBoard[0][0] ===player && _gameBoard[1][1] === player && _gameBoard[2][2]===player) {
      return true;
    } else if (_gameBoard[0][2] ===player && _gameBoard[1][1] === player && _gameBoard[2][0]===player) {
      return true;
    }
    else {
      return false;
    }
}

  function _check_rows (player) {

    if(_gameBoard[0][0] === player && _gameBoard[0][1] ===player && _gameBoard[0][2]===player) {
      return true;
    } else if (_gameBoard[1][0] === player && _gameBoard[1][1] ===player && _gameBoard[1][2]===player) {
      return true;
    } else if (_gameBoard[2][0] === player && _gameBoard[2][1] ===player && _gameBoard[2][2]===player) {
      return true;
    } else {
      return false;
    }
  }

  function _check_columns (player) {
    if(_gameBoard[0][0] === player && _gameBoard[1][0] ===player && _gameBoard[2][0]===player) {
      return true;
    } else if (_gameBoard[0][1] === player && _gameBoard[1][1] ===player && _gameBoard[2][1]===player) {
      return true;
    } else if (_gameBoard[0][2] === player && _gameBoard[1][2] ===player && _gameBoard[2][2]===player) {
      return true;
    } else {
      return false;
    }
  }

  //This  bad boy gives a point to the winning player
  function _addPoint (player) {
    var playerDiv = ("#p"+player+"-score");
    var oldScore = parseInt($(playerDiv).html());
    $(playerDiv).html(oldScore+=1);
  }

  //This test all of the above win conditions
  function _testWin (player){
    if( _check_rows(player) || _check_columns(player) || _check_diags(player)) {
      return true;
    } else {
      return false;
    }

  }
  // This is the victory function that will add a point and
  //   trigger the modal!
  function _victory (player) {
    if (player) {
      _addPoint(player);
      $('.modal-content p').html("Player " + player + " has emerged victorious, gaining them 1 victory point");
    } else {
      $('.modal-content p').html("Resulted in a Draw");
    }
    $('.modal-content h2').html('GAME IS OVER');
    $('.bs-example-modal-sm').modal('show');
    $('button:hidden').toggleClass('hidden');
  }


//Return all of our internal function
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

