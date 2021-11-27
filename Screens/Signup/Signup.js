import React from "react"
import screenSize from "../../constants/layout"
import { registration } from "../../db/auth"
import { useState } from "react"

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native"

export default function Signup({ navigation }) {
  return (
    <View style={styles.log_in}>
      <Text style={[styles.log_in_text, styles.valign_text_middle]}>
        SIGN UP
      </Text>
      <SignupFields navigation={navigation}></SignupFields>
    </View>
  )
}

function SignupFields(props) {
  const { navigation } = props

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <View style={styles.input_group}>
      <View style={styles.email_password_view}>
        <TextInput
          style={[styles.email_password_field, styles.valign_text_middle]}
          onChangeText={(text) => setName(text)}
          placeholder="Display Name"
          keyboardType="default"
          placeholderTextColor="#9E9E9E"
        />
      </View>
      <View style={styles.email_password_view}>
        <TextInput
          style={[styles.email_password_field, styles.valign_text_middle]}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#9E9E9E"
        />
      </View>
      <View style={styles.email_password_view}>
        <TextInput
          style={[styles.email_password_field, styles.valign_text_middle]}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          keyboardType="default"
          placeholderTextColor="#9E9E9E"
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        activeOpacity={0.5}
        onPress={() => sendSignup(email, password, name, navigation)}
      >
        <Text style={[styles.log_in_button_text, styles.valign_text_middle]}>
          SIGN UP
        </Text>
      </TouchableOpacity>
    </View>
  )
}

async function sendSignup(email, password, name, navigation) {
  const res = await registration(email, password, name)
  if (res) {
    return navigation.navigate("Tabs")
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  log_in: {
    alignItems: "center",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    height: screenSize.window.height,
    padding: "5% 5% 5% 5%",
    position: "relative",
    width: screenSize.window.width,
  },
  log_in_text: {
    color: "#333333",
    fontFamily: ".Montserrat-Regular",
    fontSize: 60,
    letterSpacing: 2.25,
    marginTop: "15%",
    marginBottom: "5%",
    textAlign: "center",
  },
  welcome_text: {
    letterSpacing: 0,
    fontSize: 16,
    textAlign: "center",
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#ff8c2b",
    height: "15%",
    minWidth: "90%",
    marginBottom: "5%",
    marginTop: "10%",
  },
  input_group: {
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    marginTop: "15%",
    minWidth: "90%",
    position: "relative",
  },
  email_password_field: {
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#E0E0E0",
    alignItems: "flex-start",
    display: "flex",
    minWidth: "90%",
    padding: 10,
  },
  email_password_view: {
    marginTop: "5%",
    marginBottom: "5%",
  },
  valign_text_middle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  log_in_button_text: {
    color: "white",
    fontFamily: ".Basic",
    fontSize: 30,
  },
})
