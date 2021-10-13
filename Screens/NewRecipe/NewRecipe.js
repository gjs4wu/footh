import React from "react";
import {
  Home,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import firebase from "firebase";
require("firebase/firestore");

export default function NewRecipe() {
  const [text, onChangeText] = React.useState(
    "Enlighten us with your recipe :)"
  );
  const [title0, onChangeText0] = React.useState("Name yer title :)"); //this for title

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

  return (
    <View style={styles.post2View}>
      <Image
        source={require("./../../assets/images/-icon-olor.png")}
        style={styles.iconСolorImage}
      />
      <View style={styles.titlegroupView}>
        <Text style={styles.titleText}>Title</Text>
        <View
          style={{
            flex: 1,
          }}
        />

        <TextInput
          style={styles.rectangleView}
          onChangeText={onChangeText0}
          value={title0}
        />
      </View>

      <View style={styles.taggroupView}>
        <Text style={styles.tagText}>Tags</Text>
        <View
          pointerEvents="box-none"
          style={{
            alignSelf: "stretch",
            width: 1,
            marginLeft: 10,
            marginTop: 4,
            alignItems: "flex-start",
          }}
        >
          {/* <View
							pointerEvents="box-none"
							style={{
								width: 68,
								height: 28,
							}}>
							<View
								style={styles.tagFourView}>
								
								<View
									style={styles.postView}>
									<Button title = "Russian"/>
								</View>
								
							</View>
							<View
								style={styles.tagFiveView}>
								<Text
									style={styles.xxxSixText}>Korean{"\n"}</Text>
							</View>
						</View> */}
        </View>
        <View
          style={{
            flex: 1,
          }}
        />
        <ScrollView horizontal>
          <View style={styles.tagView}>
            <Button
              title="German"
              onPress={() => {
                categoryinput = "German";
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Italian"
              onPress={() => {
                categoryinput = "Italian";
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Russian"
              onPress={() => {
                categoryinput = "Russian";
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Korean"
              onPress={() => {
                categoryinput = "Korean";
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="French"
              onPress={() => {
                categoryinput = "French";
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Japanese"
              onPress={() => {
                categoryinput = "Japanese";
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Chinese"
              onPress={() => {
                categoryinput = "Chinese";
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Spanish"
              onPress={() => {
                categoryinput = "Spanish";
              }}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.taggroupView}>
        <Text style={styles.tagText}>Item</Text>
        <View
          pointerEvents="box-none"
          style={{
            alignSelf: "stretch",
            width: 1,
            marginLeft: 10,
            marginTop: 4,
            alignItems: "flex-start",
          }}
        >
          {/* <View
							pointerEvents="box-none"
							style={{
								width: 68,
								height: 28,
							}}>
							<View
								style={styles.tagFourView}>
								
								<View
									style={styles.postView}>
									<Button title = "Russian"/>
								</View>
								
							</View>
							<View
								style={styles.tagFiveView}>
								<Text
									style={styles.xxxSixText}>Korean{"\n"}</Text>
							</View>
						</View> */}
        </View>
        <View
          style={{
            flex: 1,
          }}
        />
        <ScrollView horizontal>
          <View style={styles.tagView}>
            <Button
              title="Sugar"
              onPress={() => {
                foodarray.push("Sugar");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Beef"
              onPress={() => {
                foodarray.push("Beef");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Carrot"
              onPress={() => {
                foodarray.push("Carrot");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Egg"
              onPress={() => {
                foodarray.push("Egg");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Milk"
              onPress={() => {
                foodarray.push("Milk");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Cheese"
              onPress={() => {
                foodarray.push("Cheese");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Tomato"
              onPress={() => {
                foodarray.push("Tomato");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Salt"
              onPress={() => {
                foodarray.push("Salt");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Flour"
              onPress={() => {
                foodarray.push("Flour");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Mutton"
              onPress={() => {
                foodarray.push("Mutton");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Butter"
              onPress={() => {
                foodarray.push("Butter");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Cabbage"
              onPress={() => {
                foodarray.push("Cabbage");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Salmon"
              onPress={() => {
                foodarray.push("Salmon");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Onion"
              onPress={() => {
                foodarray.push("Onion");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Apple"
              onPress={() => {
                foodarray.push("Apple");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Cherry"
              onPress={() => {
                foodarray.push("Cherry");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Orange"
              onPress={() => {
                foodarray.push("Orange");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Strawberry"
              onPress={() => {
                foodarray.push("Strawberry");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Chicken"
              onPress={() => {
                foodarray.push("Chicken");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Blueberry"
              onPress={() => {
                foodarray.push("Blueberry");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Lemon"
              onPress={() => {
                foodarray.push("Lemon");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Garlic"
              onPress={() => {
                foodarray.push("Garlic");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Shrimp"
              onPress={() => {
                foodarray.push("Shrimp");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Clam"
              onPress={() => {
                foodarray.push("Clam");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Potato"
              onPress={() => {
                foodarray.push("Potato");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Catfish"
              onPress={() => {
                foodarray.push("Catfish");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Tuna"
              onPress={() => {
                foodarray.push("Tuna");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Lobster"
              onPress={() => {
                foodarray.push("Lobster");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Turkey"
              onPress={() => {
                foodarray.push("Turkey");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Eggplant"
              onPress={() => {
                foodarray.push("Eggplant");
              }}
            />
          </View>
          <View style={styles.tagView}>
            <Button
              title="Cream"
              onPress={() => {
                foodarray.push("Cream");
              }}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.contentgroupView}>
        <Text style={styles.contentText}>Main Text</Text>
        <View style={styles.contenttextView}>
          <ScrollView>
            <TextInput
              style={styles.xxxText}
              onChangeText={onChangeText}
              value={text}
            />
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}
      />
      <View style={styles.postView}>
        <Button
          title="Publish"
          onPress={() => {
            test0(title0, text, categoryinput, foodarray);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post2View: {
    backgroundColor: "rgb(249, 250, 250)",
    flex: 1,
    alignItems: "flex-start",
  },
  iconСolorImage: {
    resizeMode: "center",
    backgroundColor: "transparent",
    width: 29,
    height: 26,
    marginLeft: 34,
    marginTop: 60,
  },
  titlegroupView: {
    backgroundColor: "transparent",
    width: 301,
    height: 33,
    marginLeft: 34,
    marginTop: 26,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    color: "rgb(30, 30, 30)",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: "transparent",
  },
  rectangleView: {
    backgroundColor: "white",
    borderRadius: 14,
    shadowColor: "rgba(79, 98, 192, 0.15)",
    shadowRadius: 20,
    shadowOpacity: 1,
    width: 220,
    height: 29,
  },
  taggroupView: {
    backgroundColor: "transparent",
    alignSelf: "center",
    width: 345,
    height: 60,
    marginTop: 0,
    marginBottom: 0,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tagText: {
    backgroundColor: "transparent",
    color: "rgb(30, 30, 30)",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
  },
  tagFourView: {
    backgroundColor: "white",
    borderRadius: 13,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    shadowOpacity: 1,
    position: "absolute",
    left: 4,
    width: 64,
    top: 2,
    height: 26,
    justifyContent: "flex-end",
  },
  xxxFiveText: {
    color: "rgb(30, 30, 30)",
    fontSize: 6,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 25,
    backgroundColor: "transparent",
    marginLeft: 17,
    marginRight: 18,
  },
  tagFiveView: {
    backgroundColor: "white",
    borderRadius: 13,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    shadowOpacity: 1,
    position: "absolute",
    left: 0,
    width: 64,
    top: 0,
    height: 26,
    justifyContent: "flex-end",
  },
  xxxSixText: {
    backgroundColor: "transparent",
    color: "rgb(30, 30, 30)",
    fontSize: 6,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 25,
    marginLeft: 17,
    marginRight: 18,
  },
  tagTwoView: {
    backgroundColor: "white",
    borderRadius: 13,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    shadowOpacity: 1,
    width: 64,
    height: 26,
    marginLeft: 4,
    justifyContent: "flex-end",
  },
  xxxThreeText: {
    backgroundColor: "transparent",
    color: "rgb(30, 30, 30)",
    fontSize: 6,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 25,
    marginLeft: 17,
    marginRight: 18,
  },
  tagView: {
    backgroundColor: "white",
    borderRadius: 3,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    shadowOpacity: 1,
    width: 100,
    height: 40,
    marginRight: 5,
    marginTop: 1,
    justifyContent: "flex-end",
    fontSize: 6,
  },
  xxxTwoText: {
    backgroundColor: "transparent",
    color: "rgb(30, 30, 30)",
    fontSize: 6,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 25,
    marginLeft: 17,
    marginRight: 18,
  },
  tagThreeView: {
    backgroundColor: "white",
    borderRadius: 13,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    shadowOpacity: 1,
    width: 64,
    height: 26,
    marginRight: 31,
    marginTop: 6,
    justifyContent: "flex-end",
  },
  xxxFourText: {
    color: "rgb(30, 30, 30)",
    fontSize: 6,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 25,
    backgroundColor: "transparent",
    marginLeft: 17,
    marginRight: 18,
  },
  addtagView: {
    backgroundColor: "white",
    borderRadius: 13,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    shadowOpacity: 1,
    width: 34,
    height: 26,
    marginTop: 6,
    justifyContent: "flex-end",
  },
  textText: {
    backgroundColor: "transparent",
    color: "rgb(30, 30, 30)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 25,
    marginLeft: 12,
    marginRight: 12,
  },
  contentgroupView: {
    backgroundColor: "transparent",
    width: 334,
    height: 280,
    marginLeft: 34,
    marginTop: 10,
    alignItems: "flex-start",
  },
  contentText: {
    color: "rgb(30, 30, 30)",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: "transparent",
  },
  contenttextView: {
    backgroundColor: "white",
    borderRadius: 14,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    shadowOpacity: 1,
    alignSelf: "flex-end",
    width: 286,
    height: 229,
    marginTop: 18,
    alignItems: "flex-start",
  },
  xxxText: {
    color: "rgb(30, 30, 30)",
    fontSize: 15,
    width: 200,
    height: 400,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 25,
    backgroundColor: "transparent",
    marginLeft: 48,
    marginTop: 21,
  },
  postView: {
    backgroundColor: "white",
    borderRadius: 14,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    shadowOpacity: 1,
    alignSelf: "flex-end",
    width: 115,
    height: 52,
    marginRight: 145,
    marginBottom: 163,
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
    backgroundColor: "transparent",
    color: "rgb(30, 30, 30)",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 25,
    paddingTop: 5,
    marginLeft: 36,
    marginRight: 36,
  },
});
