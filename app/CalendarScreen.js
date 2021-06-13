import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import ProfileLine from "./ProfileLine1";
import firebase from "firebase";

function CalendarScreen(props) {
  const [state, setState] = useState("Select a day to see more information!");

  if(!firebase.apps.length){
  firebase.initializeApp({
    apiKey: "AIzaSyBPBiT_zEwB85zG1xODwDPjW0ZXp9DUMQs",
    authDomain: "medsched-29619.firebaseapp.com",
    projectId: "medsched-29619"
  });
  }else firebase.app();

  var db = firebase.firestore();

  return (
    <View style={styles.container}>
      <ProfileLine />
      <View>
        <Calendar
          onDayPress={(day) => {
            console.log("selected day", day);
            var s = "";
            db.collection("users").doc("Paul").collection("storedMedication").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    var dayArr = doc.data().days.split(',');
                    for (var d of dayArr){
                        if(d == new Date(day.dateString).getDay()){
                            s += `${doc.id}: ${doc.data().times}\n`
                            setState(s);
                        }
                    }
                });
            });
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