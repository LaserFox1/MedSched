import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import ProfileLine from "./ProfileLine";

function CalendarScreen(props) {
  const [state, setState] = useState("Select a day to see more information!");
  return (
    <View style={styles.container}>
      <ProfileLine />
      <View>
        <Calendar
          onDayPress={(day) => {
            setState(new Date(day.dateString).getDay());
            console.log("selected day", day);
          }}
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          disableAllTouchEventsForDisabledDays={true}
          enableSwipeMonths={true}
        />
      </View>
      <View>
      <Text style={styles.text}>{state}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 15,
    margin: 10,
  },
});

export default CalendarScreen;
