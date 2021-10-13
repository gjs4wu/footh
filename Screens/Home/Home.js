import React, { useState } from "react";
import screenSize from "../../constants/layout";
import uuid from "react-native-uuid";
import getRecipes from "../../db/recipes";
import getImage from "../../db/images";

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
  recipes();
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
        image={item.source}
        favorited={item.favorited}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        numColumns={2}
      />
    </View>
  );
}

const Item = ({ item, onPress, image, favorited }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <Image
        style={[
          styles.thumbnail,
          favorited ? styles.favorited : styles.notFavorited,
        ]}
        source={image}
      ></Image>
    </TouchableOpacity>
  );
};

async function recipes() {
  var recs = await getRecipes();
  var url = await getImage(recs[0].imagePath);
  console.log(url);
}

const DATA = [
  {
    id: uuid.v4(),
    source: require("./../../assets/images/image-1.png"),
    favorited: true,
  },
  {
    id: uuid.v4(),
    source: require("./../../assets/images/image-2.png"),
    favorited: false,
  },
  {
    id: uuid.v4(),
    source: require("./../../assets/images/image-3.png"),
    favorited: false,
  },
  {
    id: uuid.v4(),
    source: require("./../../assets/images/image-4.png"),
    favorited: true,
  },
  {
    id: uuid.v4(),
    source: require("./../../assets/images/image-5.png"),
    favorited: false,
  },
  {
    id: uuid.v4(),
    source: require("./../../assets/images/image-6.png"),
    favorited: false,
  },
  {
    id: uuid.v4(),
    source: require("./../../assets/images/image-7.jpg"),
    favorited: false,
  },
  {
    id: uuid.v4(),
    source: require("./../../assets/images/image-8.jpg"),
    favorited: false,
  },
  {
    id: uuid.v4(),
    source: require("./../../assets/images/image-9.jpg"),
    favorited: false,
  },
  {
    id: uuid.v4(),
    source: require("./../../assets/images/image-10.jpg"),
    favorited: false,
  },
  {
    id: uuid.v4(),
    source: require("./../../assets/images/image-11.jpg"),
    favorited: false,
  },
  {
    id: uuid.v4(),
    source: require("./../../assets/images/image-12.jpg"),
    favorited: false,
  },
  {
    id: uuid.v4(),
    source: require("./../../assets/images/image-13.jpg"),
    favorited: false,
  },
  {
    id: uuid.v4(),
    source: require("./../../assets/images/image-14.jpg"),
    favorited: false,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",
  },
  item: {
    padding: "4%",
  },
  title: {
    fontSize: 32,
  },
  thumbnail: {
    resizeMode: "cover",
    width: screenSize.window.width * 0.4,
    height: screenSize.window.width * 0.4,
    borderRadius: 20,
  },
  favorited: {
    borderColor: "#ff8c2b",
    borderWidth: 3,
  },
  notFavorited: {
    borderColor: "black",
    borderWidth: 3,
  },
});
