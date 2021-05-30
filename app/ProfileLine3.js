import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

function ProfileLine(props) {
  return (
    <View style={styles.userContainer}>
      <Text style={styles.username}>Username</Text>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#998bb9"
        style={styles.iconUser}
        onPress={() => console.log("User")}
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
    backgroundColor: "#998bb9",
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
