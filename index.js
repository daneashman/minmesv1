// Firebase App (the core Firebase SDK) is always required
import firebase from 'firebase/compat/app';

// Add the Firebase products and methods that you want to use
import 'firebase/compat/auth';

import {} from 'firebase/firestore';

import * as firebaseui from 'firebaseui';

let db, auth;

async function main() {
  // Add Firebase project configuration object here
  const firebaseConfig = {
    apiKey: 'AIzaSyBkggARskbAxpSIZI6PM4QfBa6VZfWAShQ',
    authDomain: 'minmesv1.firebaseapp.com',
    projectId: 'minmesv1',
    storageBucket: 'minmesv1.appspot.com',
    messagingSenderId: '831252147765',
    appId: '1:831252147765:web:c7c5e6b191ecb48107cb7c',
    measurementId: 'G-E2VTBHRKHB',
  };

  firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();

  const ui = new firebaseui.auth.AuthUI(auth);

  // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: '', // image or 'audio'
          size: 'invisible', // 'invisible' or 'compact'
          badge: 'bottomleft', //' bottomright' or 'inline' applies to invisible.
        },
        defaultCountry: 'CA',
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      },
    },
  };

  ui.start('#firebaseui-auth-container', uiConfig);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     login_with_email_button.textContent = 'Logout';
  //   } else {
  //     login_with_email_button.textContent = 'Sign in with Email';
  //   }
  // });
}
main();
