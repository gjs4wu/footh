import * as fb from "firebase";
const firebase = fb.default;
import "react-native-get-random-values";
import { nanoid } from "nanoid";

export async function getRecipes() {
  const recipesSnapshot = await firebase
    .firestore()
    .collection("recipes")
    .get();
  const recipes = recipesSnapshot.docs.map((doc) => {
    var data = doc.data();
    data.id = doc.id;
    return data;
  });

  //shuffle recipes so they display in random order
  return recipes
    .map((recipe) => ({ recipe, sort: Math.random() }))
    .sort((x, y) => x.sort - y.sort)
    .map(({ recipe }) => recipe);
}

export function uploadRecipe(
  title,
  imagePath,
  ingredientList,
  directions,
  tagList
) {
  const firestore = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  const uid = nanoid(12);
  tagList = tagList.filter((e) => e.selected).map((e) => e.tag);
  ingredientList = ingredientList.map((e) => e.ingredient);

  firestore
    .collection("recipes")
    .doc(uid)
    .set({
      title,
      imagePath,
      ingredientList,
      directions,
      upvotes: 0,
      author: currentUser.uid,
    })
    .catch((error) => console.log(error));
}
