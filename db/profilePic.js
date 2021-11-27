import * as fb from "firebase"
const firebase = fb.default

export async function updateProfilePic(imageUrl) {
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).update({ profilePic: imageUrl })
}

export async function getProfilePic() {
    const user = await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get()
    const data = user.data()
    return data.profilePic
}