import React from "react"
import screenSize from "../../constants/layout"
import * as fb from "firebase"
const firebase = fb.default

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native"

export default function Login_Signup({ navigation }) {
  if(firebase.auth().currentUser != null){
    navigation.navigate("Tabs")
  }
  return (
    <View style={styles.login_signup}>
      <Image
        style={styles.foothLogo}
        source={require("./../../assets/images/footh-orange.png")}
      />
      <View style={styles.buttons_group}>
        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.5}
          onPress={() => navigation.push("Login")}
        >
          <Text style={[styles.log_in, styles.valign_text_middle]}>LOG IN</Text>
        </TouchableOpacity>
        <Text style={styles.accountText}>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.signupButton}
          activeOpacity={0.5}
          onPress={() => navigation.push("Signup")}
        >
          <Text style={[styles.sign_up, styles.valign_text_middle]}>
            SIGN UP
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  login_signup: {
    alignItems: "center",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    height: screenSize.window.height,
    padding: "5% 5% 5% 5%",
    width: screenSize.window.width,
  },
  foothLogo: {
    width: "75%",
    marginTop: "20%",
    marginBottom: "20%",
    resizeMode: "contain",
  },
  buttons_group: {
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    minWidth: "90%",
    position: "relative",
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#ff8c2b",
    height: "15%",
    minWidth: "75%",
    marginBottom: "5%",
  },
  log_in: {
    color: "white",
    fontFamily: ".Basic",
    fontSize: 30,
  },
  accountText: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: ".Montserrat-Regular",
    marginTop: "5%",
    marginBottom: "5%",
  },
  signupButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FF8C2B",
    borderRadius: 100,
    marginTop: "5%",
    height: "15%",
    minWidth: "75%",
    marginBottom: "5%",
  },
  sign_up: {
    color: "#FF8C2B",
    fontFamily: ".Basic",
    fontSize: 30,
  },
  valign_text_middle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
})
