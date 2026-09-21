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
  apiKey: "AIzaSyDNTLgdwScHs2-n6WVUHSzrhEppb-soEm8",
  authDomain: "why-services.firebaseapp.com",
  projectId: "why-services",
  storageBucket: "why-services.firebasestorage.app",
  messagingSenderId: "645805111869",
  appId: "1:645805111869:web:3c6a59976dc3e57ce08854",
  measurementId: "G-EDJSXKB9R0"
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
