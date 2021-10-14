import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableHighlight,
} from "react-native";
import "react-native-get-random-values";
import layout from "../../constants/layout";
import { nanoid } from "nanoid";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import SearchableDropdown from "react-native-searchable-dropdown";
import * as fb from "firebase";
const firebase = fb.default;

const titles = [
  "Easy Sugar Cookies",
  "Chocolate Chip Cookies",
  "Baked Feta Pasta",
  "Honey Glazed Salmon",
  "Shrimp Fried Rice",
  "Cauliflower Pasta",
  "Chicken Fajitas",
  "Penne Vodka",
  "Cilantro Lime Chicken",
  "Pumpkin Curry",
  "Shrimp Scampi",
  "Mushroom Pasta",
  "Butter Chicken",
  "Chicken Quesadillas",
  "Tomato Soup",
  "Fettuccine Alfredo",
  "Pork Dumplings",
  "Beef Stroganoff",
  "Caprese Chicken",
  "Chicken Meatballs",
  "Beef Tenderloin",
  "Cajun Butter Steak",
  "Chicken Chow Mein",
];

export default function NewRecipe() {
  const [tagKey, setTagKey] = useState(Math.random());
  const [image, setImage] = useState(null);
  const [title, onChangeTitle] = useState(null);
  const [ingredient, onAddIngredient] = useState(null);
  const [directions, onChangeDirections] = useState(null);
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const [randomNum, setRandom] = useState(
    Math.floor(Math.random() * titles.length)
  );
  const [tags, setTags] = useState([
    { tag: "Vegetarian", selected: false, id: "1" },
    { tag: "Vegan", selected: false, id: "2" },
    { tag: "Kosher", selected: false, id: "3" },
    { tag: "Halal", selected: false, id: "4" },
    { tag: "Italian", selected: false, id: "5" },
    { tag: "Korean", selected: false, id: "6" },
    { tag: "Chinese", selected: false, id: "7" },
    { tag: "Greek", selected: false, id: "8" },
    { tag: "French", selected: false, id: "9" },
    { tag: "Chinese", selected: false, id: "10" },
    { tag: "Japanese", selected: false, id: "11" },
    { tag: "Mexican", selected: false, id: "12" },
    { tag: "Breakfast", selected: false, id: "13" },
    { tag: "Lunch", selected: false, id: "14" },
    { tag: "Dinner", selected: false, id: "15" },
    { tag: "Dessert", selected: false, id: "16" },
  ]);

  var categoryinput = "sus";
  var foodarray = [];

  var dbh = firebase.firestore();

  function test0(userID, textinput, categoryinput, foodarray) {
    const uniqueSet = new Set(foodarray);
    const backtoarray = [...uniqueSet];

    dbh
      .collection("allrecipe")
      .doc("users")
      .collection("placeholder")
      .doc(categoryinput)
      .set({
        recipe0: textinput,
        upvotes: 0,
        ingredients: backtoarray,
        favs: 0,
        author: userID,
      })
      .catch((error) => console.log(error));
  }

  function searchCenter(categorysearch) {
    let characterRef = dbh
      .collection("allrecipe")
      .doc("users")
      .collection("placeholder")
      .doc(categorysearch);
    let marioDoc = characterRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          console.log("Document data:", doc.data());
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });
  }

  function storeRecipe(userID, textinput, categoryinput, foodarray) {
    const uniqueSet = new Set(foodarray);
    const backtoarray = [...uniqueSet];

    firebase
      .database()
      .ref("users/" + userID)
      .set({
        recipe0: textinput,
        category0: categoryinput,
        upvotes: 0,
        ingredients: backtoarray,
        favs: 0,
      })
      .catch((error) => console.log(error));
  }

  function renderCurrentIngredient({ item }) {
    return (
      <View style={styles.listIngredient}>
        <Button
          title={item.ingredient}
          onPress={() => {
            var newCurrent = currentIngredients.filter((ing) => ing !== item);
            setCurrentIngredients(newCurrent);
          }}
        />
      </View>
    );
  }

  function renderTag({ item }) {
    var objIndex = tags.findIndex((e) => {
      return e.tag == item.tag;
    });
    return (
      <View>
        <TouchableHighlight
          key={tagKey}
          style={
            tags[objIndex].selected ? styles.listTagPressed : styles.listTag
          }
          onPress={() => {
            var currentTags = tags;

            currentTags[objIndex].selected = currentTags[objIndex].selected
              ? false
              : true;
            setTags(currentTags);
            setTagKey(Math.random());
          }}
          underlayColor={"#007AFF"}
        >
          <Text
            style={
              tags[objIndex].selected
                ? styles.tagButtonTextPressed
                : styles.tagButtonText
            }
          >
            {item.tag}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.titlegroupView}>
          <Text style={styles.titleText}>Recipe Title</Text>

          <TextInput
            style={styles.titleField}
            onChangeText={onChangeTitle}
            value={title}
            placeholder={titles[randomNum]}
          />
        </View>
        <View style={styles.imagePicker}>
          <TouchableOpacity onPress={pickImage}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
              />
            )}
            {!image && (
              <Image
                style={{
                  height: "100%",
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
                source={require("./../../assets/images/upload-image.png")}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.ingredientsGroupView}>
          <Text style={styles.ingredientsText}>Add Ingredient</Text>
          <View style={styles.addIngredientsGroup}>
            <TextInput
              style={styles.addIngredientsField}
              onChangeText={onAddIngredient}
              value={ingredient}
              placeholder="2 cups of white rice"
            />
            <TouchableOpacity
              onPress={() => {
                var current = currentIngredients;
                var id = nanoid(12);
                current.push({ ingredient, id });
                setCurrentIngredients(current);
                onAddIngredient(null);
              }}
              style={styles.addIngredientButton}
            >
              <Ionicons
                name={"add-circle"}
                color={"black"}
                size={45}
              ></Ionicons>
            </TouchableOpacity>
          </View>
          {currentIngredients.length != 0 && (
            <View style={styles.listIngredients}>
              <Text style={styles.listIngredientsText}>
                Ingredients (tap to remove ingredient)
              </Text>
              <FlatList
                style={{ marginLeft: "10%" }}
                horizontal={true}
                data={currentIngredients}
                keyExtractor={(item) => item.id}
                renderItem={renderCurrentIngredient}
              />
            </View>
          )}
        </View>

        <View style={styles.directionsGroup}>
          <Text style={styles.directionsText}>Recipe Directions</Text>
          <View style={styles.directionsField}>
            <TextInput
              multiline
              style={styles.directionsFieldText}
              onChangeText={onChangeDirections}
              value={directions}
              placeholder={"Write your recipe!"}
            />
          </View>
        </View>

        <View style={styles.taggroupView}>
          <Text style={styles.tagsText}>Tags</Text>
          <FlatList
            horizontal={true}
            data={tags}
            keyExtractor={(item) => item.id}
            renderItem={renderTag}
          />
        </View>

        <View style={styles.postView}>
          <TouchableOpacity
            onPress={() => {
              // test0(title, text, categoryinput, foodarray);
            }}
          >
            <Text style={styles.postText}>Publish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "rgb(249, 250, 250)",
  },
  titlegroupView: {
    width: "100%",
    marginTop: "5%",
    marginBottom: "5%",
  },
  titleText: {
    fontSize: 24,
    marginLeft: "10%",
    fontFamily: ".Basic",
    textAlign: "left",
  },
  titleField: {
    fontSize: 32,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "rgba(79, 98, 192, 0.15)",
    shadowRadius: 20,
    shadowOpacity: 1,
    width: "85%",
    minHeight: "8%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignSelf: "center",
  },
  ingredientsGroupView: {
    width: "100%",
    marginTop: "5%",
    marginBottom: "5%",
  },
  ingredientsText: {
    fontSize: 20,
    marginLeft: "10%",
    fontFamily: ".Basic",
    textAlign: "left",
  },
  addIngredientsGroup: {
    flexDirection: "row",
    alignSelf: "center",
  },
  addIngredientsField: {
    fontSize: 30,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "rgba(79, 98, 192, 0.15)",
    shadowRadius: 20,
    shadowOpacity: 1,
    width: "70%",
    minHeight: "8%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  addIngredientButton: {
    marginLeft: "3%",
    alignContent: "center",
    justifyContent: "center",
    minHeight: "5%",
    minWidth: "5%",
  },
  listIngredient: {
    backgroundColor: "white",
    borderRadius: 3,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    shadowOpacity: 1,
    height: 40,
    marginRight: 5,
    marginTop: 1,
    justifyContent: "flex-end",
    fontSize: 6,
  },
  listIngredientsText: {
    fontSize: 20,
    marginLeft: "10%",
    fontFamily: ".Basic",
    textAlign: "left",
  },
  listIngredients: {
    marginTop: "5%",
  },
  taggroupView: {
    width: "85%",
    alignSelf: "center",
    height: "10%",
  },
  tagText: {
    backgroundColor: "transparent",
    color: "rgb(30, 30, 30)",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
  },
  tagsText: {
    fontSize: 20,
    marginLeft: "3%",
    fontFamily: ".Basic",
    textAlign: "left",
  },
  directionsGroup: {
    alignItems: "flex-start",
  },
  directionsText: {
    fontSize: 20,
    marginLeft: "10%",
    fontFamily: ".Basic",
    textAlign: "left",
  },
  directionsField: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    shadowOpacity: 1,
    alignSelf: "center",
    width: "85%",
    minHeight: "20%",
    maxHeight: "50%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  directionsFieldText: {
    color: "rgb(30, 30, 30)",
    padding: 10,
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 26,
    backgroundColor: "transparent",
  },
  listTag: {
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 3,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    shadowOpacity: 1,
    height: 40,
    marginRight: 5,
    marginTop: 1,
    padding: 5,
  },
  listTagPressed: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    borderRadius: 3,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    shadowOpacity: 1,
    height: 40,
    marginRight: 5,
    marginTop: 1,
    padding: 5,
  },
  tagButtonText: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  tagButtonTextPressed: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  postView: {
    backgroundColor: "white",
    borderRadius: 14,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    shadowOpacity: 1,
    alignSelf: "center",
    width: "30%",
    height: "6%",
    marginBottom: "50%",
    justifyContent: "center",
  },
  generalbutton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  postText: {
    color: "#007AFF",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 25,
    paddingTop: 5,
  },
  imagePicker: {
    height: layout.window.height * 0.3,
    marginBottom: "5%",
    marginTop: "5%",
  },
});
