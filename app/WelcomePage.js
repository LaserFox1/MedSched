import React from "react";
import SocialButton from './components/SocialButton';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { BoxShadow } from "react-native-shadow";
import * as Google from "expo-google-app-auth";
import { useFonts,
  Pattaya_400Regular
} from "@expo-google-fonts/dev";
function WelcomePage(props) {
  let [fontsLoaded] = useFonts({
    Pattaya_400Regular
  });

  const signInAsync = async () => {
    console.log("LoginScreen.js 6 | loggin in");
    try {
    await Google.initializeAsync('992717464334-qiljmtjb02l7g8ug08le4gg9shmjqg8g.apps.googleusercontent.com');

    const { type, token } = await Google.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
    });

        if (type === "success") {
            // Then you can use the Google REST API
            console.log("LoginScreen.js 17 | success, navigating to profile");
            const credential = firebase.auth.GoogleAuthProvider.credential(token);
            firebase.auth().signInWithCredential(credential);
            navigation.navigate("UserPage").catch(error => {
                console.log("LoginScreen.js 19 | error with login", error);
            });
        }
    }
    catch (error) {
        console.log("LoginScreen.js 19 | error with login", error);
    }
  }

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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 40}}>Welcome to</Text>
      <Text style={{fontSize: 40, marginBottom: 50, fontFamily: "Pattaya_400Regular"}}>MedSched</Text>
      <BoxShadow setting={shadowOpt}>
        <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#edfbff"
        onPress={() => signInAsync()}
        style={{
          width: 150,
          height: 50,
          backgroundColor: "#fff",
          borderRadius: 10,
        }}
      >
        <Text style={{fontWeight: "bold", width: 150, height: 50, textAlign: "center", textAlignVertical: "center", fontSize: 20}}>Login</Text>
      </TouchableHighlight>
    </BoxShadow>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});



export default WelcomePage;
