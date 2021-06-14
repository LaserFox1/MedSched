import React from "react";
import { StyleSheet, Text, TouchableHighlight, View, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { BoxShadow } from "react-native-shadow";
import firebase from "firebase";
import {
  useFonts,
  Pattaya_400Regular
} from "@expo-google-fonts/dev";

function UserPage(props) {
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
    <View style={styles.titleContainer}>
      <Text style={styles.title}>MedSched</Text>
     </View>
     <View style={styles.dataContainer}>
      <Text style={styles.username}>Dominic</Text>
      <Text style={styles.email}>dteam@gmail.com</Text>
     </View>
      <View style={styles.logout}>
      <BoxShadow setting={shadowOpt}>
      <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#edfbff"
              onPress={() =>
              {Alert.alert(
                            'Alert',
                            'Are you sure you want to logout?',
                            [
                              {text: 'No'},
                              {text: 'Yes', onPress: () => {
                                  firebase.auth().signOut().then(() =>{
                                        navigation.navigate("Welcome");
                                  }).catch((error) => {
                                        console.log(error.getMessage());
                                  });
                              }},
                            ],
                            {cancelable: true}
                          )
              }}
              style={{
                width: 150,
                height: 50,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            >
              <Text style={{fontWeight: "bold", width: 150, height: 50, textAlign: "center", textAlignVertical: "center", fontSize: 20}}>Logout</Text>
            </TouchableHighlight>
            </BoxShadow>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
  flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
  },
  dataContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
},
title: {
    fontSize: 50,
    fontFamily: "Pattaya_400Regular",
},
username: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
},
email: {
    fontSize: 30,
    fontWeight: 'bold',
},
  logout: {
    flex: 1,
    justifyContent: 'flex-end',
     alignItems: 'center',
    marginBottom: 40,
  },
});

export default UserPage;