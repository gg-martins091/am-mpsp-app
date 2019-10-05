import firebase from 'firebase';
import '@firebase/firestore'

const prodConfig = {
  apiKey: 'AIzaSyBggeM32YflyOcCN4FvwLttjOaoX7MjXos',
  authDomain: 'am-mpsp.firebaseapp.com',
  databaseURL: 'https://am-mpsp.firebaseio.com',
  projectId: 'am-mpsp',
  storageBucket: 'am-mpsp.appspot.com',
  messagingSenderId: '149432530358',
  appId: '1:149432530358:web:cc35df53f1e18ef3e67d17',
  measurementId: 'G-6VJGPSMRJ0',
};

const fb = firebase.initializeApp(prodConfig);

export default fb;
