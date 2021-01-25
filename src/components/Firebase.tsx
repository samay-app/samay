import firebase from "firebase/app";
import "firebase/auth";

// Production - RocketMeet
const config = {
  apiKey: "AIzaSyCmjdHH4Q3B6j1xzKuD5jPdIC2TyMOUln8",
  authDomain: "rocket-meet.firebaseapp.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(); // if already initialized, use that one
}
const auth = firebase.auth();

export { auth, firebase };