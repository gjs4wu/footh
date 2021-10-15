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
  Alert,
} from "react-native";
import "react-native-get-random-values";
import layout from "../../constants/layout";
import initData from "../../constants/recipeData";
import { nanoid } from "nanoid";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../db/images";
import { uploadRecipe } from "../../db/recipes";
const titles = initData.titlesList;

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
  const [tags, setTags] = useState(initData.tagsList);

  function resetState() {
    setTagKey(Math.random());
    setImage(null);
    onChangeTitle(null);
    onAddIngredient(null);
    onChangeDirections(null);
    setCurrentIngredients([]);
    setRandom(Math.floor(Math.random() * titles.length));
    setTags(initData.tagsList);
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
                if (ingredient != null) {
                  var current = currentIngredients;
                  var id = nanoid(12);
                  current.push({ ingredient, id });
                  setCurrentIngredients(current);
                  onAddIngredient(null);
                }
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
              numberOfLines={6}
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
            onPress={async () => {
              if (
                image != null &&
                title != null &&
                directions != null &&
                currentIngredients.length != 0
              ) {
                var imagePath = image ? await uploadImage(image) : null;
                uploadRecipe(
                  title,
                  imagePath,
                  currentIngredients,
                  directions,
                  tags
                );
                resetState();
                Alert.alert("Recipe Created!");
              } else {
                var str = "";
                if (image == null) {
                  str += "image, ";
                }
                if (title == null) {
                  str += "title, ";
                }
                if (directions == null) {
                  str += "title, ";
                }
                if (currentIngredients.length == 0) {
                  str += "ingredients, ";
                }
                str = str.slice(0, str.length - 2);
                Alert.alert("Missing required field(s): " + str);
              }
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
    marginBottom: 10,
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
    marginBottom: 10,
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
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  addIngredientButton: {
    marginLeft: "3%",
    alignContent: "center",
    justifyContent: "center",
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
    marginBottom: 20,
  },
  tagsText: {
    fontSize: 20,
    marginLeft: "3%",
    marginBottom: 10,
    fontFamily: ".Basic",
    textAlign: "left",
  },
  directionsGroup: {
    alignItems: "flex-start",
    marginBottom: 30,
  },
  directionsText: {
    fontSize: 20,
    marginLeft: "10%",
    marginBottom: 10,
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
    minHeight: "10%",
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
  postText: {
    color: "#007AFF",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 40,
  },
  imagePicker: {
    height: layout.window.height * 0.3,
    marginBottom: "5%",
    marginTop: "5%",
  },
});
