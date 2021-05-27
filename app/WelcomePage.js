import React from "react";
import { Button } from 'react-native-elements';
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { BoxShadow } from "react-native-shadow";

function WelcomePage(props) {
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

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 40}}>Welcome to</Text>
      <Text style={{marginBottom: 50, fontSize: 40, fontFamily: "Pattaya-Regular"}}>MedSched</Text>
      <BoxShadow setting={shadowOpt}>
        <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#edfbff"
        onPress={() => console.log("Login")}
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
