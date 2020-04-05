import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const firebaseConfig = {
  apiKey: 'AIzaSyBHtsDtEX_6i5b2xPylOrdI7gCpfPK9DcU',
  authDomain: 'rpsls-b4af9.firebaseapp.com',
  databaseURL: 'https://rpsls-b4af9.firebaseio.com',
  projectId: 'rpsls-b4af9',
  storageBucket: 'rpsls-b4af9.appspot.com',
  messagingSenderId: '1091155818399',
  appId: '1:1091155818399:web:6ddfb7b1f66166e618afaa',
  measurementId: 'G-4WX2PYZJ7E'
}

firebase.initializeApp(firebaseConfig)
