import * as fb from "firebase"
const firebase = fb.default
import React, { useState, useEffect } from "react"
import screenSize from "../../constants/layout"
import layout from "./../../constants/layout"
import { Image, StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from "react-native"
import { getUserRecipes } from "../../db/recipes"
import AppLoading from "expo-app-loading"
import * as ImagePicker from "expo-image-picker"
import { uploadImage, getImage } from "../../db/images"
import { updateProfilePic, getProfilePic } from "../../db/profilePic"

export default function Profile({ navigation, route }) {
  var date = route.params.date
  const [selectedId, setSelectedId] = useState(null)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [number, setNumber] = useState(global.numRecipes)
  const [userRecipes, setUserRecipes] = useState([])
  const [image, setImage] = useState(null)

  const currentUser = firebase.auth().currentUser

  const displayName = currentUser.displayName
  const size = 100 - (4 * displayName.length)

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

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!")
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
      var imagePath = await uploadImage(result.uri)
      updateProfilePic(imagePath)
    }
  }

  if (!dataLoaded || number != global.numRecipes) {
    return (
      <AppLoading
        startAsync={async () => {
          var recipeData = await getUserRecipes()
          setUserRecipes(recipeData)

          var path = await getProfilePic()
          if (path != null) {
            var url = await getImage(path)
            setImage(url)
          }
        }}
        onFinish={() => {
          setNumber(global.numRecipes)
          setDataLoaded(true)
        }}
        onError={() => { }}
      />
    )
  }

  return (
    <View key={date} style={styles.profileView}>
      <View style={styles.header}>
        <View style={styles.imagePicker}>
          <TouchableOpacity onPress={pickImage}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: screenSize.window.height * 0.16,
                  height: screenSize.window.height * 0.16,
                  borderRadius: 10,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            )}
            {!image && (
              <Image
                style={{
                  height: screenSize.window.height * 0.16,
                  width: screenSize.window.height * 0.16,
                  borderRadius: 10,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
                source={require("./../../assets/images/user-profile-pic.jpg")}
              />
            )}
          </TouchableOpacity>
        </View>
        <Text style={[styles.usernameText, { fontSize: size }]}>{displayName}</Text>
      </View>
      {/* <Text style={styles.myRecipesText}>My Recipes</Text> */}
      <View style={styles.recipesGroup}>
        {
          (userRecipes.length != 0) &&
          <FlatList
            style={userRecipes.length == 1 ? { alignSelf: "flex-start", marginLeft: "4%" } : { alignSelf: "center" }}
            ListHeaderComponent={<Text style={styles.myRecipesText}>My Recipes</Text>}
            data={userRecipes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            numColumns={2}
          />
        }
        {
          (userRecipes.length == 0) &&
          <Text style={{ fontSize: 25, textAlign: "center", marginLeft: "10%", marginRight: "10%", marginTop: "5%", fontFamily: ".Basic" }}>Create a recipe to view it here!</Text>
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
    height: screenSize.window.height * 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: "4%",
    marginLeft: "4%",
    fontFamily: ".Basic",
    fontSize: 20,
  },
  recipesGroup: {
    flex: 1,
    // marginTop: "2%",
    alignItems: "center",
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
