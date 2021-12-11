import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAgDp3HpK1xTxL9qZj4-3DoaTYdyxAhiKc",
    authDomain: "loan-app-1b25d.firebaseapp.com",
    projectId: "loan-app-1b25d",
    storageBucket: "loan-app-1b25d.appspot.com",
    messagingSenderId: "927685022992",
    appId: "1:927685022992:web:cc47f4ae5c329b97350195"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore();