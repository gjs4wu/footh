import React, { useState, useEffect } from "react"
import screenSize from "../../constants/layout"
import { getRecipes } from "../../db/recipes"
import { getImage } from "../../db/images"
import { StackActions } from '@react-navigation/native';
import AppLoading from "expo-app-loading"
import "../../constants/global"
import { getFavorites } from "../../db/favorites";

import {
  FlatList,
  StatusBar,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  LogBox,
} from "react-native"

export default function Home({ navigation, route }) {
  var date = route.params.date
  const [selectedId, setSelectedId] = useState(null)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [number, setNumber] = useState(global.numRecipes)
  const [data, setData] = useState([])

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id)
          navigation.navigate("DisplayRecipe", { recipe: item })
        }}
        image={item.imageUrl}
      />
    )
  }
  if (!dataLoaded || number != global.numRecipes) {
    return (
      <AppLoading
        startAsync={async () => {
          var recipeData = await recipes()
          setData(recipeData)
          var favs = await getFavorites()
          global.favorites = favs
          global.numRecipes = recipeData.length
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
    <View key={date} style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        numColumns={2}
      />
    </View>
  )
}

const Item = ({ item, onPress, image }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <Image style={[styles.thumbnail]} source={{ uri: image }}></Image>
    </TouchableOpacity>
  )
}

async function recipes() {
  var recs = await getRecipes()
  return recs
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
