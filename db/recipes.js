import * as fb from "firebase"
const firebase = fb.default
import "react-native-get-random-values"
import { nanoid } from "nanoid"
import { getImage } from "./../db/images"
import { getFavorites } from "./favorites"

export async function getRecipes() {
  const recipesSnapshot = await firebase
    .firestore()
    .collection("recipes")
    .get()
  const recipes = recipesSnapshot.docs.map((doc) => {
    var data = doc.data()
    data.id = doc.id
    return data
  })

  //shuffle recipes so they display in random order
  const sorted = recipes
    .map((recipe) => ({ recipe, sort: Math.random() }))
    .sort((x, y) => x.sort - y.sort)
    .map(({ recipe }) => recipe)

  var recipesDone = await getImageUrls(sorted)
  return recipesDone
}

export async function getRecipe(recipeId) {
  const recipesSnapshot = await firebase
    .firestore()
    .collection("recipes")
    .doc(recipeId)
    .get()
  var data = recipesSnapshot.data()
  var recipesDone = await getImageUrls([data])
  return recipesDone[0]
}

export async function searchRecipesByTitle(search) {
  if (search == null || search === "" || search.trim() === "") {
    return []
  }
  const snapshot = await firebase
    .firestore()
    .collection("recipes").get()
  const recipes = snapshot.docs.map(doc => {
    var data = doc.data()
    data.id = doc.id
    return data
  }).filter(r => r.title.toLowerCase().includes(search.trim().toLowerCase())
  )
  return recipes
}

export async function searchRecipesByIngredients(search) {
  if (search == null || search === "" || search.trim() === "") {
    return []
  }
  const snapshot = await firebase
    .firestore()
    .collection("recipes").get()
  const recipes = snapshot.docs.map(doc => {
    var data = doc.data()
    data.id = doc.id
    return data
  }).filter(r => {
    var contains = false
    r.ingredients.forEach(i => {
      if (i.toLowerCase().includes(search.trim().toLowerCase())) {
        contains = true
      }
    })
    return contains
  }
  )
  return recipes
}

export async function searchRecipesByTags(search) {
  if (search == null || search === "" || search.trim() === "") {
    return []
  }
  const snapshot = await firebase
    .firestore()
    .collection("recipes").get()
  const recipes = snapshot.docs.map(doc => {
    var data = doc.data()
    data.id = doc.id
    return data
  }).filter(r => {
    var contains = false
    r.tags.forEach(t => {
      if (t.toLowerCase() == search.trim().toLowerCase()) {
        contains = true
      }
    })
    return contains
  }
  )
  return recipes
}

export async function getFavoriteRecipes() {
  var favorites = global.favorites
  var recipes = await Promise.all(favorites.map(async (f) => {
    var rec = (await firebase.firestore().collection("recipes").doc(f).get()).data()
    rec.id = f
    return rec
  }))
  var recipesDone = await getImageUrls(recipes)
  return recipesDone
}

export async function getUserRecipes() {
  const userId = firebase.auth().currentUser.uid
  const recipesSnapshot = await firebase.firestore().collection("recipes").where("author", "==", userId).get()
  const recipes = recipesSnapshot.docs.map((doc) => {
    var data = doc.data()
    data.id = doc.id
    return data
  })
  var recipesDone = await getImageUrls(recipes)
  return recipesDone
}

export function uploadRecipe(
  title,
  imagePath,
  servings,
  prep,
  cook,
  ingredientList,
  directions,
  tagList
) {
  const firestore = firebase.firestore()
  const currentUser = firebase.auth().currentUser
  const uid = nanoid(20)
  tagList = tagList.filter((e) => e.selected).map((e) => e.tag)
  ingredientList = ingredientList.map((e) => e.ingredient)

  firestore
    .collection("recipes")
    .doc(uid)
    .set({
      title,
      imagePath,
      servings,
      prepTime: prep,
      cookTime: cook,
      ingredients: ingredientList,
      directions,
      upvotes: 0,
      tags: tagList,
      author: currentUser.uid,
    })
    .catch((error) => console.log(error))
}

async function getImageUrls(recipes) {
  var recipesDone = await Promise.all(
    recipes.map(async function (recipe) {
      var url = await getImage(recipe.imagePath)
      recipe.imageUrl = url
      return recipe
    })
  )
  return recipesDone
}