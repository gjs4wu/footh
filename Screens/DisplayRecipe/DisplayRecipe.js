import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  LogBox,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableHighlight,
  Alert,
} from "react-native"
import AppLoading from "expo-app-loading"
import { nanoid } from "nanoid"
import Ionicons from "react-native-vector-icons/Ionicons"
import layout from "../../constants/layout"
import { addFavorite, getFavorites, removeFavorite } from "../../db/favorites"
import { getFavoriteRecipes } from "../../db/recipes"
import "../../constants/global"

export default function DisplayRecipe({ navigation, route }) {
  var recipe = route.params.recipe
  const [recipeId, setRecipeId] = useState(recipe.id)
  const [favorites, setFavorites] = useState([])
  const [favorite, setFavorite] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  const ingredients = recipe.ingredients.map((i) => {
    return {
      ingredient: i,
      key: nanoid(8),
    }
  })

  const tags = recipe.tags ? recipe.tags.map((tag) => {
    return {
      tag,
      key: nanoid(8),
    }
  }) : []

  const [imageRatio, setImageRatio] = useState(null)
  Image.getSize(recipe.imageUrl, (width, height) => {
    setImageRatio(height / width)
  })

  if (!dataLoaded || recipe.id != recipeId) {
    return (
      <AppLoading
        startAsync={async () => {
          setFavorite(global.favorites.includes(recipe.id))
          setRecipeId(recipe.id)
        }}
        onFinish={() => {
          setDataLoaded(true)
        }}
        onError={() => { }}
      />
    )
  }

  return (
    <View style={styles.container} key={recipe.id}>
      <ScrollView>
        <View style={styles.imageView}>
          <Image
            style={[
              {
                height: layout.window.width * imageRatio,
                width: layout.window.width,
              },
              styles.recipeImage,
            ]}
            source={{ uri: recipe.imageUrl }}
          ></Image>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{recipe.title}</Text>
        </View>
        <View style={{ flexDirection: "row", marginLeft: "5%" }}>
          <TouchableOpacity onPress={() => {
            if (!favorite) {
              addFavorite(recipe.id)
              global.favorites.push(recipe.id)
            } else {
              removeFavorite(recipe.id)
              var favs = global.favorites
              const index = favs.indexOf(recipe.id)
              if (index > -1) {
                favs.splice(index, 1)
                global.favorites = favs
              }
            }
            global.state++
            setFavorite(favorite ? false : true)
          }}>
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              color={"#ff8c2b"}
              size={40}
            ></Ionicons>
          </TouchableOpacity>
          {(tags.length != 0) &&
            <View style={{ marginLeft: "5%" }}>
              <FlatList
                horizontal={true}
                data={tags}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                  <View style={styles.tagBox}>
                    <Text style={styles.tag}>{item.tag[0].toUpperCase() + item.tag.substring(1)}</Text>
                  </View>
                )}
              />
            </View>}
        </View>

        {recipe.servings && <View style={{ flexDirection: "row" }}>
          <Text style={styles.fieldsText}>
            Servings:
          </Text>
          <Text style={styles.fieldsNumber}>{recipe.servings ? recipe.servings : null}</Text>
        </View>}
        {recipe.cookTime && <View style={{ flexDirection: "row" }}>
          <Text style={styles.fieldsText}>
            Prep Time: </Text>
          <Text style={styles.fieldsNumber}>{recipe.prepTime} minutes</Text>
        </View>}
        {recipe.prepTime && <View style={{ flexDirection: "row" }}>
          <Text style={styles.fieldsText}>
            Cook Time:
          </Text>
          <Text style={styles.fieldsNumber}>{recipe.cookTime} minutes</Text>
        </View>}
        <View style={styles.ingredientsView}>
          <Text style={styles.ingredientsTitle}>Ingredients: </Text>
          <FlatList
            scrollEnabled={false}
            data={ingredients}
            renderItem={({ item }) => (
              <View style={styles.ingredientBox}>
                <Text style={styles.ingredient}>{item.ingredient}</Text>
              </View>
            )}
            keyExtractor={(item) => item.key}
            numColumns={2}
          />
        </View>
        <View style={styles.directionsView}>
          <Text style={styles.directionsTitle}>Directions: </Text>
          <Text style={styles.directionsText}>{recipe.directions}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  titleView: {
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
  titleText: {
    fontSize: 40,
    maxWidth: "90%",
    fontFamily: ".Montserrat-Bold",
    textAlign: "center",
  },
  fieldsText: {
    marginTop: "3%",
    marginLeft: "5%",
    fontSize: 20,
    fontFamily: ".Montserrat-Bold",
  },
  fieldsNumber: {
    marginLeft: "2%",
    marginTop: "3%",
    fontSize: 20,
    fontFamily: ".Montserrat-Regular",
  },
  imageView: {
    alignItems: "center",
  },
  recipeImage: {
    resizeMode: "contain",
  },
  ingredientsView: {
    width: "100%",
    marginStart: "5%",
    marginTop: "5%",
    marginBottom: "5%",
  },
  ingredientsTitle: {
    fontFamily: ".Montserrat-Bold",
    fontSize: 24,
    marginBottom: 10,
  },
  ingredientBox: {
    alignItems: "center",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    marginEnd: "5%",
    width: "42.5%",
  },
  ingredient: {
    textAlign: "center",
    fontSize: 18,
  },
  directionsView: {
    marginTop: "5%",
    width: "90%",
    alignSelf: "center",
    marginBottom: "20%",
  },
  directionsTitle: {
    fontFamily: ".Montserrat-Bold",
    fontSize: 24,
    marginBottom: 10,
  },
  directionsText: {
    fontSize: 18,
  },
  tagBox: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    borderRadius: 3,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    shadowOpacity: 1,
    height: 40,
    marginRight: 10,
    padding: 5,
  },
  tag: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  }
})
