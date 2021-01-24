import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD5KqdURtfBQRrKdtUziFJZVRbeBKLqBCw",
  authDomain: "rocketmeet-15a48.firebaseapp.com",
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(); // if already initialized, use that one
}
const auth = firebase.auth();

export { auth, firebase };
