// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";


export const environment = {
  production: false,
  googleMapsApiKey: 'AIzaSyCTSQDvR2V-Ul7ILdHOxEsxwdmbU3DFzdI', //se crea aqui para no crearse en todos lados
  firebaseConfig : {
    apiKey: "AIzaSyBjd8JrdvwjVrtPwfUwxgYjzvmvGrC798g",
    authDomain: "tellevoduoc-eb1fa.firebaseapp.com",
    databaseURL: "https://tellevoduoc-eb1fa-default-rtdb.firebaseio.com",
    projectId: "tellevoduoc-eb1fa",
    storageBucket: "tellevoduoc-eb1fa.appspot.com",
    messagingSenderId: "187195468470",
    appId: "1:187195468470:web:dd0331a7f4f4afb8d49417",
    measurementId: "G-JG6Q44NPVN"
  }
};