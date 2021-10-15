import React from "react";
import Home from "./Screens/Home/Home";
import Post1 from "./Screens/Post1/Post1";
import NewRecipe from "./Screens/NewRecipe/NewRecipe";
import Profile from "./Screens/Profile/Profile";
import Search from "./Screens/Search/Search";
import Login from "./Screens/Login/Login";
import Signup from "./Screens/Signup/Signup";
import LoginSignup from "./Screens/Login-Signup/Login-Signup";
import DisplayRecipe from "./Screens/DisplayRecipe/DisplayRecipe";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as fb from "firebase";
const firebase = fb.default;

// Your web app's Firebase configuration
const firebaseCredentials = require("./db/credentials.json");

// Initialize Firebase
if (!firebase.apps.length) {
  const firebaseApp = firebase.initializeApp(firebaseCredentials);
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
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "NewRecipe") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({})}
      />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen
        name="NewRecipe"
        component={NewRecipe}
        options={{ title: "New Recipe" }}
      />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen
        name="DisplayRecipe"
        component={DisplayRecipe}
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
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
