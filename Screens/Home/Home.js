import React from "react";
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

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null,
      headerLeft: null,
      headerRight: null,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      dataLoaded: false,
      data: [],
    };
  }

  componentDidMount() {
    this.getRecipes();
  }

  async getRecipes() {
    var recipeData = await recipes();
    this.setState({ dataLoaded: true, data: recipeData });
  }

  render() {
    if (!this.state.dataLoaded) {
      return (
        <AppLoading
          startAsync={this.getRecipes()}
          onFinish={() => {
            this.state.dataLoaded = true;
          }}
          onError={() => {}}
        />
      );
    }
    const renderItem = ({ item }) => {
      return (
        <Item
          item={item}
          onPress={() => {
            this.state.selectedId = item.id;
          }}
          image={item.imageUrl}
        />
      );
    };
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={this.state.selectedId}
          numColumns={2}
        />
      </View>
    );
  }
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
