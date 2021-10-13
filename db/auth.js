import firebase from "firebase";
require("firebase/auth");
require("firebase/firestore");
import { Alert } from "react-native";

export async function registration(email, password, displayName) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      displayName: displayName,
    });
    var success = true;
  } catch (err) {
    success = false;
    Alert.alert("There is something wrong", err.message);
  } finally {
    return success;
  }
}

export async function signIn(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    var success = true;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
    success = false;
  } finally {
    return success;
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}