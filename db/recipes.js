import * as fb from "firebase";
const firebase = fb.default;

export async function getRecipes() {
  const recipesSnapshot = await firebase
    .firestore()
    .collection("recipes")
    .get();
  return recipesSnapshot.docs.map((doc) => {
    var data = doc.data();
    data.id = doc.id;
    return data;
  });
}

export async function uploadRecipe(data) {
  await firebase
    .firestore()
    .collection("recipes")
    .add(data);
}
