import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "firebase";
import { useNavigation } from '@react-navigation/native';

function ProfileLine() {
const navigation = useNavigation();

    const [cUser, setCUser] = useState("");

        firebase.auth().onAuthStateChanged((firebaseUser) => {
                   if (firebaseUser) {
                   setCUser(firebaseUser.email);
                   } else {
                     console.log("Failed");
                   }
           });

  return (
    <View style={styles.userContainer}>
      <Text style={styles.username}>{cUser}</Text>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#88b7c6"
        style={styles.iconUser}
        onPress={() => navigation.navigate('UserPage')}
      >
        <View>
          <FontAwesome5 name="user-circle" size={45} color="black" />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#88b7c6",
    marginTop: 40,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  username: {
    flex: 2,
    alignItems: "center",
    fontSize: 30,
  },
  iconUser: {
    flex: 0.5,
    alignItems: "flex-end",
  },
});

export default ProfileLine;
