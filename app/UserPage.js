import React from "react";
import { StyleSheet, Text, TouchableHighlight, View, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

function UserPage(props) {
const navigation = useNavigation();
  return (
    <View>
      <Text>This is the user page!</Text>
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
                                  navigation.navigate("Welcome");
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
    </View>
  );
}

export default UserPage;
