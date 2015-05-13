var usersRef = new Firebase ('https://astoellistictactoe.firebaseio.com/users/');
var dbRef = new Firebase ('https://tic-tac-hue.firebaseio.com/');
var gameRef = new Firebase ('https://tic-tac-hue.firebaseio.com/game/');

var gameAuth;

var otherPlayer = function(player) {
    return player === 'X' ? 'O' : 'X';
  };

$(document).ready(function() {

//Get a "unique" id for the user
if (!(gameAuth = gameRef.getAuth())) {
  gameRef.authAnonymously(function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      gameAuth = authData;
    }
  });
}

$('#start').on('click', function(e){
  gameRef.set({playerNum: otherPlayer(playerNum),
    waitingPlayer: gameAuth.uid});
});


gameRef.on('value', function(snapshot) {
    var message = snapshot.val();
    var disable = false;
    if (message) {
      if (gameAuth.uid === message.waitingPlayer) {
        playerNum = otherPlayer(message.playerNum);
        disable = true;
      } else {
        playerNum = message.playerNum;
      }
    }
});


});



