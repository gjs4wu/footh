import { firebase } from '@firebase/app';
import '@firebase/firestore'

export default async function getRecipes() {
    const recipesSnapshot = await firebase.firestore().collection('recipes').get()
    return recipesSnapshot.docs.map(doc => doc.data());
}
