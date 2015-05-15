// $(document).ready(function() {

// //Get a "unique" id for the user
// if (!(gameAuth = gameRef.getAuth())) {
//   gameRef.authAnonymously(function(error, authData) {
//     if (error) {
//       console.log("Login Failed!", error);
//     } else {
//       gameAuth = authData;
//     }
//   });
// }

// gameRef.on('value', function(snapshot) {
//     var message = snapshot.val();
//     var disable = false;
//     if (message) {
//       if (gameAuth.uid === message.waitingPlayer) {
//         player = otherPlayer(message.player);
//         disable = true;
//       } else {
//         player = message.player;
//       }
//     }
// });


// });



