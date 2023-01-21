import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBLTVfdMPuVMT4lNSbZ6ar7EwS4oqIN2qY",
    authDomain: "help-desk-hello.firebaseapp.com",
    projectId: "help-desk-hello",
    storageBucket: "help-desk-hello.appspot.com",
    messagingSenderId: "399877223313",
    appId: "1:399877223313:web:9f1fe1777612e656766030",
    measurementId: "G-LGJJ4BTM6L"
};

if (!firebase.apps.length) {

    firebase.initializeApp(firebaseConfig);
}
export default firebase;

