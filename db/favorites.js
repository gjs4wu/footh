import * as fb from "firebase"
const firebase = fb.default

export async function getFavorites() {
    const user = await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get()
    const data = user.data()
    return data.favorites
}

export async function addFavorite(recipeId) {
    const userId = firebase.auth().currentUser.uid
    const user = await firebase.firestore().collection("users").doc(userId).get()
    const favorites = user.data().favorites
    if (!favorites.includes(recipeId)) {
        favorites.push(recipeId)
        firebase.firestore().collection("users").doc(userId).update({ favorites })
    }
}

export async function removeFavorite(recipeId) {
    const userId = firebase.auth().currentUser.uid
    const user = await firebase.firestore().collection("users").doc(userId).get()
    const favorites = user.data().favorites
    const index = favorites.indexOf(recipeId)
    if (index > -1) {
        favorites.splice(index, 1)
        firebase.firestore().collection("users").doc(userId).update({ favorites })
    }
}