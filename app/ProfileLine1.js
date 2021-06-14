import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "firebase";
import { useNavigation } from '@react-navigation/native';

function ProfileLine() {
    const navigation = useNavigation();

    const user = firebase.auth().currentUser;
    console.log(user);
  // [END auth_state_listener]
  return (
    <View style={styles.userContainer}>
      <Text style={styles.username}></Text>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#bfefff"
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
    backgroundColor: "#bfefff",
    marginTop: 40,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  username: {
    flex: 2,
    alignItems: "center",
    fontSize: 35,
  },
  iconUser: {
    flex: 0.5,
    alignItems: "flex-end",
  },
});

export default ProfileLine;
