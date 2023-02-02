// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
    signInOptions: [
      {
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: '', // 'audio'
          size: 'invisible', // 'invisible' or 'compact'
          badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
        }
      }
    ]
    // Other config options...
  });