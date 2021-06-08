import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SearchBar } from "react-native-elements";
import ProfileLine from "./ProfileLine2";
import WeekdayPicker from "./WeekdayPicker";
import TimeList from "./TimeList";
import firebase from "firebase";


function Add(props) {
  const [searchText, setSearchText] = useState();
  const [date, setDate] = useState(new Date(1598051730000));
   const [mode, setMode] = useState('date');
   const [show, setShow] = useState(false);
   const [med, setMed] = useState("Aspirin");
   firebase.initializeApp({
     apiKey: "AIzaSyBPBiT_zEwB85zG1xODwDPjW0ZXp9DUMQs",
     authDomain: "medsched-29619.firebaseapp.com",
     projectId: "medsched-29619"
   });

   var db = firebase.firestore();



    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showTimepicker = () => {
      showMode('time');
    };

    const pushMed = () => {
    console.log("Started");
      db.collection("users").doc("Lucas").collection("storedMedication").doc("Drugs").set({
      days: "mon, wed, fri, sun",
      times: "17:30"
      }).then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    };

  return (
    <View style={styles.container}>
      <ProfileLine />
      <View>
        <Text style={styles.headers}>Medication</Text>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={setSearchText}
          value={searchText}
          platform="android"
          showLoading={true}
        />
      </View>
      <View>
       <Text style={styles.headers}>Days</Text>
       <WeekdayPicker />
      </View>
      <View>
        <Text style={styles.headers}>Time</Text>
      </View>
<View>
<View>
        <Button onPress={showTimepicker} title="Timepicker" />
      </View>
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}</View>
      <View>
        <Text>Selected time is {date.getHours()}:{date.getMinutes()}</Text>
      </View>
      <Button title="Add time"/>
      <View>
        <Button title="Add medication" onPress={pushMed}/>
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
  headers: {
    fontSize: 25,
    margin: 10,
  },
});

export default Add;
