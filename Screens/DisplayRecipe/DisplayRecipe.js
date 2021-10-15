import React, { useState, useEffect } from "react";
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
} from "react-native";
import { nanoid } from "nanoid";
import layout from "../../constants/layout";

export default function DisplayRecipe({ navigation, route }) {
  var recipe = route.params.recipe;

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const ingredients = recipe.ingredients.map((i) => {
    return {
      ingredient: i,
      key: nanoid(8),
    };
  });

  const tags = recipe.tags ? recipe.tags.map((tag) => {
    return {
      tag,
      key: nanoid(8),
    }
  }) : [];

  const [imageRatio, setImageRatio] = useState(null);
  Image.getSize(recipe.imageUrl, (width, height) => {
    setImageRatio(height / width);
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageView}>
          <Image
            style={[
              styles.recipeImage,
              {
                height: layout.window.width * imageRatio,
                width: layout.window.width,
              },
            ]}
            source={{ uri: recipe.imageUrl }}
          ></Image>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{recipe.title}</Text>
        </View>
        {(tags.length != 0) &&
          <View style={{marginLeft: "5%"}}>
            <FlatList
              horizontal={true}
              data={tags}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <View style={styles.tagBox}>
                  <Text style={styles.tag}>{item.tag}</Text>
                </View>
              )}
            />
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
  );
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
});
