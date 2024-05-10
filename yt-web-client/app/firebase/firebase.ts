// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHn_13y6AEmDRg2xxBR6_iVnNOO6xGxyI",
    authDomain: "yt-clone-4afdb.firebaseapp.com",
    projectId: "yt-clone-4afdb",
    appId: "1:1002594796896:web:11e46b47f7b6c6606d0a05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const functions = getFunctions();

/**
 * Sign in using Google Popup 
 * @returns  promise that resolve with user credentials
 */
export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
}
/**
 * Signs the user out
 * @returns  promise that resolve when user is signed out 
 */
export function signOut() {
    return auth.signOut();
}

/**
 *Trigger callback when user auth state changes 
 * @returns A function to unsubscribe callback 
 */
export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}