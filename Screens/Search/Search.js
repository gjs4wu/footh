import React from "react"
import { useState, useEffect } from "react"
import Ionicons from "react-native-vector-icons/Ionicons"
import {
  LogBox,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native"
import { searchRecipesByTitle, searchRecipesByIngredients, searchRecipesByTags } from "../../db/recipes"
import { getImage } from "../../db/images"
import layout from "../../constants/layout"

export default function Search({ navigation }) {
  const [searchValue, onChangeSearch] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [searchTitle, setSearchTitle] = useState(true)
  const [searchIngredients, setSearchIngredients] = useState(false)
  const [searchTags, setSearchTags] = useState(false)

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.searchResult}
        onPress={() => {
          navigation.navigate("DisplayRecipe", {
            recipe: item,
          })
        }}
      >
        <Text style={styles.resultText}>{item.title}</Text>
        <Image style={styles.resultImage} source={{ uri: item.imageUrl }} />
      </TouchableOpacity>
    )
  }

  const recipes = async (search) => {
    var titleRecipes, ingredientRecipes, tagRecipes
    if (searchTitle) {
      titleRecipes = await searchRecipesByTitle(search)
    } else if (!searchTitle && !searchIngredients && !searchTags) {
      setSearchTitle(true)
      titleRecipes = await searchRecipesByTitle(search)
    } else {
      titleRecipes = []
    }
    ingredientRecipes = searchIngredients ? await searchRecipesByIngredients(search) : []
    tagRecipes = searchTags ? await searchRecipesByTags(search) : []

    var recs = []

    titleRecipes.forEach(r => {
      var found = false
      recs.forEach(s => {
        if (r.id === s.id) {
          found = true
        }
      })
      if (!found) {
        recs.push(r)
      }
    })
    ingredientRecipes.forEach(r => {
      var found = false
      recs.forEach(s => {
        if (r.id === s.id) {
          found = true
        }
      })
      if (!found) {
        recs.push(r)
      }
    })
    tagRecipes.forEach(r => {
      var found = false
      recs.forEach(s => {
        if (r.id === s.id) {
          found = true
        }
      })
      if (!found) {
        recs.push(r)
      }
    })

    var recipesDone = await Promise.all(
      recs.map(async function (recipe) {
        var url = await getImage(recipe.imagePath)
        recipe.imageUrl = url
        return recipe
      })
    )
    return recipesDone
  }

  return (
    <View>
      <View style={styles.searchGroup}>
        <TextInput
          style={styles.searchBar}
          placeholderStyle={styles.searchBar}
          onChangeText={onChangeSearch}
          value={searchValue}
          placeholder={"Search"}
        />
        <TouchableOpacity
          onPress={() => {
            recipes(searchValue)
              .then(results => {
                setSearchResults(results)
                setLoaded(true)
              })
          }}
        >
          <Ionicons
            name={"search-circle"}
            color={"black"}
            size={60}
          ></Ionicons>
        </TouchableOpacity>
      </View>

      <Text style={{ marginLeft: "10%", fontFamily: ".Montserrat-Regular" }}>
        Include results from:
      </Text>
      <View style={styles.buttonGroup}>
        <TouchableHighlight
          style={
            searchTitle ? styles.searchPressed : styles.searchUnpressed
          }
          onPress={() => {
            setSearchTitle(searchTitle ? false : true)
          }}
          underlayColor={"#ff8c2b"}
        >
          <Text style={searchTitle ? styles.searchTextPressed : styles.searchTextUnpressed}>Title</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={
            searchIngredients ? styles.searchPressed : styles.searchUnpressed
          }
          onPress={() => {
            setSearchIngredients(searchIngredients ? false : true)
          }}
          underlayColor={"#ff8c2b"}
        >
          <Text style={searchIngredients ? styles.searchTextPressed : styles.searchTextUnpressed}>Ingredients</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={
            searchTags ? styles.searchPressed : styles.searchUnpressed
          }
          onPress={() => {
            setSearchTags(searchTags ? false : true)
          }}
          underlayColor={"#ff8c2b"}
        >
          <Text style={searchTags ? styles.searchTextPressed : styles.searchTextUnpressed}>Tags</Text>
        </TouchableHighlight>
      </View>

      {loaded && <View style={styles.searchResultsGroup}>
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}>
        </FlatList>
      </View>}

    </View>
  )
}

const styles = StyleSheet.create({
  searchGroup: {
    alignSelf: "center",
    marginTop: 40,
    flexDirection: "row",
    marginBottom: 10,
  },
  searchBar: {
    fontFamily: ".Basic",
    fontSize: 32,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "rgba(79, 98, 192, 0.15)",
    shadowRadius: 20,
    shadowOpacity: 1,
    marginLeft: "5%",
    marginRight: "2%",
    width: "70%",
    minHeight: "8%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignSelf: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: "10%",
    marginBottom: "5%",
    maxWidth: "80%",
  },
  searchResultsGroup: {
    alignSelf: "center",
    alignItems: "center",
    maxWidth: "90%",
    maxHeight: "75%",
  },
  searchResult: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    height: 160,
    maxWidth: "99%",
    marginBottom: "5%",
    flexDirection: "row",
  },
  resultText: {
    fontSize: 24,
    fontFamily: ".Montserrat-Regular",
    textAlign: "left",
    marginLeft: "5%",
    lineHeight: 25,
    width: "50%",
    flexWrap: "wrap",
  },
  resultImage: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "flex-end",
    alignSelf: "center",
    resizeMode: "stretch",
    height: 130,
    width: 130,
    marginLeft: "5%",
    marginRight: "5%",
  },
  searchPressed: {
    flex: 1,
    backgroundColor: "#ff8c2b",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    shadowOpacity: 1,
    height: 40,
    marginRight: 10,
    padding: 5,
  },
  searchUnpressed: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    shadowOpacity: 1,
    height: 40,
    marginRight: 10,
    padding: 5,
  },
  searchTextPressed: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: ".Montserrat-Bold",
  },
  searchTextUnpressed: {
    color: "#ff8c2b",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: ".Montserrat-Regular",
  }
})
