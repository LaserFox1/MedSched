import React from "react";
import { Button } from 'react-native-elements';
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { BoxShadow } from "react-native-shadow";
import * as Google from "expo-google-app-auth";
import { useNavigation } from '@react-navigation/native';
import { useFonts,
  Pattaya_400Regular
} from "@expo-google-fonts/dev";
function WelcomePage(props) {
  let [fontsLoaded] = useFonts({
    Pattaya_400Regular
  });

const navigation = useNavigation();

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
            onPress={() => navigation.navigate("Login")}
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
                  <Text style={{fontWeight: "bold", width: 150, height: 50, textAlign: "center", textAlignVertical: "center", fontSize: 20}}>Register</Text>
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
