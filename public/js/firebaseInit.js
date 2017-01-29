// Initialize Firebase
var config = {
apiKey: "AIzaSyAxf5rQecxRBbXSWpucsy2alD8v2UuftFo",
authDomain: "hexhogg.firebaseapp.com",
databaseURL: "https://hexhogg.firebaseio.com",
storageBucket: "hexhogg.appspot.com"
};
firebase.initializeApp(config);

firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(error);
});


//Log user in
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    if(isAnonymous)
        console.log("Logged in, anonymously");
    else
        console.log("Logged in, " + user.uid);
  } else {
      console.log("User is not logged in");
  }
});