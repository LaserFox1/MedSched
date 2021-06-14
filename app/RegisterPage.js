import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';
import { BoxShadow } from "react-native-shadow";
import React, { useState } from "react";
import firebase from "firebase";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";

export default function App() {
const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    if(!firebase.apps.length){
    firebase.initializeApp({
      apiKey: "AIzaSyBPBiT_zEwB85zG1xODwDPjW0ZXp9DUMQs",
      authDomain: "medsched-29619.firebaseapp.com",
      projectId: "medsched-29619"
    });
    }else firebase.app();
    var db = firebase.firestore();

  const shadowOpt = {
        width: 150,
        height: 50,
        color: "#000",
        border: 2,
        radius: 10,
        opacity: 0.2,
        x: 0,
        y: 3,
        style: { marginVertical: 5 }
      };

    function signUpWithEmailPassword() {
      // [START auth_signup_password]
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          const data = {
                  "Name" : name,
                  "Mail" : user.email,
                  "password" : user.password
              };
          db.collection("users").doc(name).set(data);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
      // [END auth_signup_password]
    }

const navigation = useNavigation();

  return (
    <View style={styles.container}>


      <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Name."
                placeholderTextColor="#003f5c"
                onChangeText={(name) => setName(name)}
              />
       </View>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

        <BoxShadow setting={shadowOpt}>
      <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="#edfbff"
                  onPress={() => {
                        console.log(name + "," + email  + ", " + password)
                        signUpWithEmailPassword(email, password);
                        navigation.navigate("Menu");

                        }
                  }
                  style={{
                    width: 150,
                    height: 50,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                  }}>
                  <Text style={{fontWeight: "bold", width: 150, height: 50, textAlign: "center", textAlignVertical: "center", fontSize: 20}}>Register</Text>
      </TouchableHighlight>
      </BoxShadow>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#88b7c6",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});