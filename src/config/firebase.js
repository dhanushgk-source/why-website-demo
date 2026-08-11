import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCR9e6Xl79gK7Tk0ETn15kPkWCXmA-rzyY",
  authDomain: "why-lms.firebaseapp.com",
  projectId: "why-lms",
  storageBucket: "why-lms.firebasestorage.app",
  messagingSenderId: "798472072086",
  appId: "1:798472072086:web:0819d15bec53b3061f0bb7",
  measurementId: "G-WXRHPKN3K8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Ensure Google provider prompts account selection
googleProvider.setCustomParameters({
  prompt: "select_account",
});

/**
 * Sign in / Sign up with Google Popup
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const idToken = await user.getIdToken();
    return {
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      idToken,
    };
  } catch (error) {
    console.error("Firebase Google Auth Error:", error);
    throw error;
  }
}

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
};

export default app;
