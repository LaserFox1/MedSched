import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import ProfileLine from "./ProfileLine";

function Statistics(props) {
  return (
    <View>
      <ProfileLine />
      <StatusBar style="auto" />
    </View>
  );
}


export default Statistics; 