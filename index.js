// Import stylesheets
import './assets/dist/css/bootstrap.min.css';
import './assets/dist/js/bootstrap.bundle.min.js';
// import './style.css';

// Firebase App (the core Firebase SDK) is always required
import { initializeApp } from 'firebase/app';

// Add the Firebase products and methods that you want to use
import {
  getAuth,
  EmailAuthProvider,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  PhoneAuthProvider,
} from 'firebase/auth';

import {} from 'firebase/firestore';

import * as firebaseui from 'firebaseui';

const login_with_email_button = document.getElementById('email');
const login_with_phone_button = document.getElementById('phone');

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
  };

  const app = initializeApp(firebaseConfig);
  auth = getAuth();

  const ui = new firebaseui.auth.AuthUI(auth);

  // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      EmailAuthProvider.PROVIDER_ID,
      GoogleAuthProvider.PROVIDER_ID,
      {
        provider: PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: 'image', // 'audio'
          size: 'normal', // 'invisible' or 'compact'
          badge: 'bottomleft', //' bottomright' or 'inline' applies to invisible.
        },
        defaultCountry: 'GB', // Set default country to the United Kingdom (+44).
        // For prefilling the national number, set defaultNationNumber.
        // This will only be observed if only phone Auth provider is used since
        // for multiple providers, the NASCAR screen will always render first
        // with a 'sign in with phone number' button.
        defaultNationalNumber: '1234567890',
        // You can also pass the full phone number string instead of the
        // 'defaultCountry' and 'defaultNationalNumber'. However, in this case,
        // the first country ID that matches the country code will be used to
        // populate the country selector. So for countries that share the same
        // country code, the selected country may not be the expected one.
        // In that case, pass the 'defaultCountry' instead to ensure the exact
        // country is selected. The 'defaultCountry' and 'defaultNationaNumber'
        // will always have higher priority than 'loginHint' which will be ignored
        // in their favor. In this case, the default country will be 'GB' even
        // though 'loginHint' specified the country code as '+1'.
        loginHint: '+11234567890',
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      },
    },
  };

  ui.start('#firebaseui-auth-container', uiConfig);

  // Listen to email button clicks
  login_with_email_button.addEventListener('click', () => {
    if (auth.currentUser) {
      // User is signed in; allows user to sign out
      signOut(auth);
      document.getElementById('or-row').style.display = 'block';
      document.getElementById('phone').style.display = 'block';
    } else {
      // No user is signed in; allows user to sign in
      document.getElementById('or-row').style.display = 'none';
      document.getElementById('phone').style.display = 'none';
    }
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      login_with_email_button.textContent = 'Logout';
    } else {
      login_with_email_button.textContent = 'Sign in with Email';
    }
  });
}
main();
