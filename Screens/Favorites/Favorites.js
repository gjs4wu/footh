import * as fb from "firebase"
const firebase = fb.default
import React, { useState, useEffect } from "react"
import screenSize from "../../constants/layout"
import "./../../constants/global"
import { Image, StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from "react-native"
import { getFavoriteRecipes } from "../../db/recipes"
import AppLoading from "expo-app-loading"

export default function Favorites({ navigation, route }) {
  var date = route.params.date
  const [state, setState] = useState(global.state)
  const [selectedId, setSelectedId] = useState(null)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [favoriteRecipes, setFavoriteRecipes] = useState(global.favorites)

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id)
          navigation.navigate("DisplayRecipe", {
            recipe: item,
          })
        }}
        image={item.imageUrl}
      />
    )
  }

  if (!dataLoaded || global.state != state) {
    return (
      <AppLoading
        startAsync={async () => {
          var recipeData = await getFavoriteRecipes()
          setFavoriteRecipes(recipeData)
        }}
        onFinish={() => {
          setState(global.state)
          setDataLoaded(true)
        }}
        onError={(e) => { console.log(e) }}
      />
    )
  }

  return (
    <View style={styles.profileView} key={date}>
      <View style={styles.recipesGroup}>
        {
          (favoriteRecipes.length != 0) &&
          <FlatList
            style={favoriteRecipes.length == 1 ? { alignSelf: "flex-start", marginLeft: "4%" } : { alignSelf: "center" }}
            ListHeaderComponent={<View><Text style={styles.headerText}>Favorites</Text></View>}
            data={favoriteRecipes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            numColumns={2}
          />
        }
        {
          (favoriteRecipes.length == 0) &&
          <View><Text style={[styles.headerText, { marginLeft: "5%" }]}>Favorites</Text>
            <Text style={{ fontSize: 25, textAlign: "center", marginLeft: "10%", marginRight: "10%", marginTop: "25%", fontFamily: ".Basic" }}>Favorite a recipe to view it here!</Text>
          </View>
        }
      </View>
    </View>
  )
}

const Item = ({ item, onPress, image }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Image style={styles.thumbnail} source={{ uri: image }}></Image>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  profileView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#ff8c2b",
    height: "20%",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    marginTop: "3%",
    marginLeft: "2%",
    fontSize: 30,
    fontFamily: ".Montserrat-Bold",
    textAlign: "left",
  },
  imagePicker: {
    flex: 1,
    marginLeft: screenSize.window.height * 0.02,
    borderRadius: 10,
    resizeMode: "contain",
    height: screenSize.window.height * 0.16,
    width: screenSize.window.height * 0.16,
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 3,
  },
  profilePic: {
    resizeMode: "contain",
    height: "80%",
    width: "100%",
    flex: 1,
  },
  usernameText: {
    flex: 2,
    color: "rgb(30, 30, 30)",
    fontFamily: ".Basic",
    textAlign: "center",
    backgroundColor: "transparent",
  },
  myRecipesText: {
    marginTop: "5%",
    marginLeft: "5%",
    fontFamily: ".Basic",
    fontSize: 20,
  },
  recipesGroup: {
    flex: 1,
  },
  item: {
    padding: "3%",
  },
  thumbnail: {
    resizeMode: "cover",
    width: screenSize.window.width * 0.4,
    height: screenSize.window.width * 0.4,
    borderRadius: 10,
  },
})
