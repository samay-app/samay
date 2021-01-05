import firebase from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyDi8gy5XMUNVOvStG2kw8yZDR-ZW-5KE3o",
    authDomain: "rocketauth-d71f0.firebaseapp.com",
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
} else {
    firebase.app(); // if already initialized, use that one
}
const auth = firebase.auth();

export { auth, firebase };