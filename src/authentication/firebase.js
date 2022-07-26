// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const _app = initializeApp(firebaseConfig);

const auth = getAuth(_app);

const registerUserWithEmailPassword = async (email, password) => {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    return {
      status: true,
      user: newUser,
    };
  } catch (error) {
    console.error("Regis Error with code : ", error.code);
    console.error("Regis Error message : ", error.message);
    return {
      status: false,
      error: error,
    };
  }
};

const loginUserWithEmailPassword = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return {
      status: true,
      user: user,
    };
  } catch (error) {
    console.error("Login Error with code : ", error.code);
    console.error("Login Error message : ", error.message);
    return {
      status: false,
      error: error,
    };
  }
};

const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Reset Password Error with code : ", error.code);
    console.error("Reset Password Error message : ", error.message);
  }
};
const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error with code : ", error.code);
    console.error("Logout Error message : ", error.message);
  }
};

const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Google Error with code : ", error.code);
    console.error("Google Error message : ", error.message);
    return {
      status: false,
      error: error,
    };
  }
};

const loginWithGithub = async () => {
  try {
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Github Error with code : ", error.code);
    console.error("Github Error message : ", error.message);
    return {
      status: false,
      error: error,
    };
  }
};

export {
  auth,
  registerUserWithEmailPassword,
  resetPassword,
  logoutUser,
  loginUserWithEmailPassword,
  loginWithGoogle,
  loginWithGithub,
};
