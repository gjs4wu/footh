import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import Home from "./Screens/Home/Home"
import Post1 from "./Screens/Post1/Post1"
import Post2 from "./Screens/Post2/Post2"
import Setting from "./Screens/Setting/Setting"
import Message from "./Screens/Messages/Messages"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase'



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFiGCRU7N3mnz0II5lvMuPGC0gkLNtdHs",
  authDomain: "foodbooth-d0313.firebaseapp.com",
  projectId: "foodbooth-d0313",
  storageBucket: "foodbooth-d0313.appspot.com",
  messagingSenderId: "328005893933",
  appId: "1:328005893933:web:b036674730aa8d0f3ddda4"
};

// Initialize Firebase
if(firebase.apps.length == 0){
  firebase.initializeApp(firebaseConfig);
}




const  Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'ios-information-circle';
            } else if (route.name === 'Setting') {
              iconName = 'ios-list';
            } else if (route.name === 'Message') {
              iconName = 'ios-mail';
            } else if (route.name === 'Post1') {
              iconName = 'ios-send';
            } else if (route.name === 'Post2') {
              iconName = 'ios-brush';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        

        
        <Tab.Screen name="Home" component={Home} /> 
        <Tab.Screen name="Message" component={Message} />
        <Tab.Screen name="Setting" component={Setting} />
        <Tab.Screen name="Post1" component={Post1} />
        <Tab.Screen name="Post2" component={Post2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: 'green',
    marginHorizontal: 20,
  },
});
