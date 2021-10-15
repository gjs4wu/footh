import React from "react";
import { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  View,
} from "react-native";

export default function Search() {
  const [searchValue, onChangeSearch] = useState(null);

  function showSearch() {
    return (
      <TextInput
        style={styles.titleField}
        onChangeText={onChangeSearch(value)}
        placeholder={"Search here"}
      />
    );
  }
}

const renderItem = ({ title }) => {
  return (
    <View
      style={styles.rectangle4View}
      onPress={() => {
        setSelectedId(item.id);
        navigation.navigate("DisplayRecipe", {
          recipe: title,
        });
      }}
    >
      <Text style={styles.textTwoText}>{title}</Text>
    </View>
  );
};

const onChangeSearch = async (search) => {
  const values = firebase
    .firestore()
    .collection("recipes")
    .where("title", "==", value);
  return (
    <FlatList>
      numColumns={1}
      data={values}
      renderItem={renderItem}
      keyExtractor=
    </FlatList>
  );

  console.log(values);
};
const styles = StyleSheet.create({
  messagesView: {
    backgroundColor: "rgb(249, 250, 250)",
    flex: 1,
  },
  contentView: {
    backgroundColor: "transparent",
    width: 365,
    height: 663,
  },
  rectangle5View: {
    backgroundColor: "white",
    borderRadius: 14,
    shadowColor: "rgba(79, 98, 192, 0.15)",
    shadowRadius: 20,
    shadowOpacity: 1,
    height: 147,
    marginRight: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  textText: {
    backgroundColor: "transparent",
    color: "rgb(30, 30, 30)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 25,
    width: 310,
  },
  rectangle4View: {
    backgroundColor: "white",
    borderRadius: 14,
    shadowColor: "rgba(79, 98, 192, 0.15)",
    shadowRadius: 20,
    shadowOpacity: 1,
    height: 147,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  textTwoText: {
    color: "rgb(30, 30, 30)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 25,
    backgroundColor: "transparent",
    width: 310,
  },
  rectangle3View: {
    backgroundColor: "white",
    borderRadius: 14,
    shadowColor: "rgba(79, 98, 192, 0.15)",
    shadowRadius: 20,
    shadowOpacity: 1,
    height: 147,
    marginLeft: 4,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  textThreeText: {
    color: "rgb(30, 30, 30)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 25,
    backgroundColor: "transparent",
    width: 310,
  },
  rectangle2View: {
    backgroundColor: "white",
    borderRadius: 14,
    shadowColor: "rgba(79, 98, 192, 0.15)",
    shadowRadius: 20,
    shadowOpacity: 1,
    height: 147,
    marginRight: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  textFourText: {
    backgroundColor: "transparent",
    color: "rgb(30, 30, 30)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 25,
    width: 310,
  },
  searchgroupView: {
    backgroundColor: "transparent",
    width: 337,
    height: 37,
    marginRight: 35,
    flexDirection: "row",
    alignItems: "center",
  },
  rectangleView: {
    backgroundColor: "white",
    borderRadius: 14,
    shadowColor: "rgba(79, 98, 192, 0.15)",
    shadowRadius: 20,
    shadowOpacity: 1,
    width: 278,
    height: 37,
  },
  iconСolorImage: {
    resizeMode: "center",
    backgroundColor: "transparent",
    width: 34,
    height: 34,
  },
  navbarView: {
    backgroundColor: "transparent",
    alignSelf: "stretch",
    height: 107,
  },
  barCopyView: {
    backgroundColor: "white",
    shadowColor: "rgba(155, 132, 135, 0.14)",
    shadowRadius: 20,
    shadowOpacity: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 94,
  },
  homegroupView: {
    backgroundColor: "transparent",
    width: 22,
    height: 48,
  },
  fill3View: {
    backgroundColor: "rgb(35, 31, 32)",
    position: "absolute",
    left: 9,
    right: 8,
    top: 15,
    height: 8,
  },
  fill4Image: {
    resizeMode: "center",
    backgroundColor: "transparent",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 24,
  },
  homeText: {
    color: "rgb(135, 133, 154)",
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: "transparent",
  },
  mesgroupImage: {
    backgroundColor: "transparent",
    resizeMode: "center",
    width: 31,
    height: 46,
    marginLeft: 56,
  },
  collgroupView: {
    backgroundColor: "transparent",
    width: 24,
    height: 49,
    marginRight: 64,
  },
  fill3TwoImage: {
    resizeMode: "center",
    backgroundColor: "transparent",
    position: "absolute",
    left: 0,
    right: 13,
    top: 7,
    height: 17,
  },
  fill5TwoImage: {
    resizeMode: "center",
    backgroundColor: "transparent",
    position: "absolute",
    left: 1,
    right: 0,
    top: 0,
    height: 10,
  },
  fill7Image: {
    resizeMode: "center",
    backgroundColor: "transparent",
    position: "absolute",
    left: 13,
    right: 0,
    top: 7,
    height: 17,
  },
  collText: {
    color: "rgb(32, 61, 186)",
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: "transparent",
    marginLeft: 2,
  },
  setgroupView: {
    backgroundColor: "transparent",
    width: 22,
    height: 49,
  },
  fill3Image: {
    resizeMode: "center",
    backgroundColor: "transparent",
    width: null,
    height: 11,
    marginLeft: 6,
    marginRight: 5,
  },
  fill5Image: {
    backgroundColor: "transparent",
    resizeMode: "center",
    width: null,
    height: 11,
    marginLeft: 2,
    marginRight: 1,
    marginTop: 2,
  },
  setText: {
    backgroundColor: "transparent",
    color: "rgb(135, 133, 154)",
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
  },
  plusView: {
    backgroundColor: "rgb(32, 61, 186)",
    borderRadius: 29,
    borderWidth: 3,
    borderColor: "rgb(230, 233, 255)",
    borderStyle: "solid",
    position: "absolute",
    alignSelf: "center",
    width: 58,
    top: 0,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
  },
  plusCopyImage: {
    backgroundColor: "transparent",
    resizeMode: "center",
    width: 17,
    height: 17,
  },
});
