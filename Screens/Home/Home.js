import React, { useState } from "react";
import screenSize from "../../constants/layout";
import { getRecipes } from "../../db/recipes";
import { getImage } from "../../db/images";
import AppLoading from "expo-app-loading";

import {
  FlatList,
  StatusBar,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

export default function Home({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [data, setData] = useState([]);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          navigation.navigate("DisplayRecipe", {
            recipe: item,
          });
        }}
        image={item.imageUrl}
      />
    );
  };

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={async () => {
          var recipeData = await recipes();
          setData(recipeData);
        }}
        onFinish={() => {
          setDataLoaded(true); 
        }}
        onError={() => {}}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        numColumns={2}
      />
    </View>
  );
}

const Item = ({ item, onPress, image }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <Image style={[styles.thumbnail]} source={{ uri: image }}></Image>
    </TouchableOpacity>
  );
};

async function recipes() {
  var recs = await getRecipes();
  var recipesDone = await Promise.all(
    recs.map(async function (recipe) {
      var url = await getImage(recipe.imagePath);
      recipe.imageUrl = url;
      return recipe;
    })
  );
  return recipesDone;
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
});
