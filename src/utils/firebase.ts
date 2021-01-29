import firebase from "firebase/app";
import "firebase/auth";

// Production - RocketMeet

const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(); // if already initialized, use that one
}
const auth = firebase.auth();

export { auth, firebase };
