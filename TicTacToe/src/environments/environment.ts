// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import firebase from 'firebase';

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAuOvV3NfAKvDXIcnZvX2idfNR7is0J_0M",
    authDomain: "tictactoe-epicoro.firebaseapp.com",
    projectId: "tictactoe-epicoro",
    storageBucket: "tictactoe-epicoro.appspot.com",
    messagingSenderId: "579763773611",
    appId: "1:579763773611:web:765dc2bbd855f1d57957ee",
    measurementId: "G-K37RWGJK0J"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
