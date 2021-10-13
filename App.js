import React from "react";
import { StyleSheet } from "react-native";
import Home from "./Screens/Home/Home";
import Post1 from "./Screens/Post1/Post1";
import NewRecipe from "./Screens/NewRecipe/NewRecipe";
import Profile from "./Screens/Profile/Profile";
import Search from "./Screens/Search/Search";
import Login from "./Screens/Login/Login";
import Signup from "./Screens/Signup/Signup";
import LoginSignup from "./Screens/Login-Signup/Login-Signup";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = require("./db/credentials.json");

// Initialize Firebase
if (!firebase.apps.length) {
  const firebaseApp = firebase.initializeApp(firebaseConfig);
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginSignup"
        component={LoginSignup}
        options={{ title: "Welcome" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Log In" }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Sign Up" }}
      />
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Post1") {
            iconName = "ios-send";
          } else if (route.name === "New Recipe") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="New Recipe" component={NewRecipe} />
      <Tab.Screen name="Post1" component={Post1} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsReady: false,
    };
  }

  componentDidMount() {
    this.initProjectFonts();
  }

  async initProjectFonts() {
    await Font.loadAsync({
      ".Basic": require("./assets/fonts/Basic-Regular.ttf"),
      ".Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
      ".Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    });
    this.setState({
      fontsReady: true,
    });
  }

  render() {
    if (!this.state.fontsReady) {
      return (
        <AppLoading
          startAsync={this.initProjectFonts()}
          onFinish={() => {
            this.state.fontsReady = true;
          }}
          onError={() => {}}
        />
      );
    }
    return (
      <NavigationContainer independent={true}>
        <StartStack />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    backgroundColor: "green",
    marginHorizontal: 20,
  },
});
