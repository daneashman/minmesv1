// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });