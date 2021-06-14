import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Platform, CheckBox } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SearchBar } from "react-native-elements";
import ProfileLine from "./ProfileLine2";
import WeekdayPicker from "./WeekdayPicker";
import TimeList from "./TimeList";
import firebase from "firebase";


function Add(props) {
  const [searchText, setSearchText] = useState();
  const [date, setDate] = useState(new Date(1598051730000));
  const [cTime, setTime] = useState("12:00");
  const [cUser, setCUser] = useState("");
   const [mode, setMode] = useState('date');
   const [show, setShow] = useState(false);
   const [med, setMed] = useState("Aspirin");
    const [timesList, setTimes] = useState("");

    const [isMon, setMon] = useState(false);
    const [isTue, setTue] = useState(false);
    const [isWed, setWed] = useState(false);
    const [isThu, setThu] = useState(false);
    const [isFri, setFri] = useState(false);
    const [isSat, setSat] = useState(false);
    const [isSun, setSun] = useState(false);

   if(!firebase.apps.length){
   firebase.initializeApp({
     apiKey: "AIzaSyBPBiT_zEwB85zG1xODwDPjW0ZXp9DUMQs",
     authDomain: "medsched-29619.firebaseapp.com",
     projectId: "medsched-29619"
   });
   }else firebase.app();

   var db = firebase.firestore();

   firebase.auth().onAuthStateChanged((firebaseUser) => {
           if (firebaseUser) {
           console.log("Add.js screen:")
           console.log(firebaseUser);
           setCUser(firebaseUser.uid);
           } else {
             console.log("Failed");
           }
   });

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      var minutes;
      if(currentDate.getMinutes().length > 9){
        minutes = currentDate.getMinutes();
      }
      else{
        minutes = "0" + currentDate.getMinutes();
      }
      setTime(currentDate.getHours() + ":" + minutes);
    };

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showTimepicker = () => {
      showMode('time');
    };

    const pushMed = () => {
    console.log("Starting the writing process for "+cUser+"/"+med);
      db.collection("users").doc(cUser).collection("storedMedication").doc(med).set({
      days: getDays(),
      times: timesList
      }).then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        setTimes("");
    };

    const pushTime = () => {
        var ifComma = "";
        if(timesList != "") ifComma = ",";
        setTimes(timesList + ifComma + cTime);
        console.log(timesList);
    }

    const getDays = () => {
        var output = "";
        if(isMon) output = output + "1,";
        if(isTue) output = output + "2,";
        if(isWed) output = output + "3,";
        if(isThu) output = output + "4,";
        if(isFri) output = output + "5,";
        if(isSat) output = output + "6,";
        if(isSun) output = output + "0,";
        output = output.substring(0, output.length - 1);
        return output;
    }




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
          </View>
          <View style={styles.rowContainer}>
            <Text>Mon</Text>
            <CheckBox value={isMon} onValueChange={setMon} style={styles.checkbox}/>
            <Text>Tue</Text>
            <CheckBox value={isTue} onValueChange={setTue} style={styles.checkbox}/>
            <Text>Wed</Text>
            <CheckBox value={isWed} onValueChange={setWed} style={styles.checkbox}/>
            <Text>Thu</Text>
            <CheckBox value={isThu} onValueChange={setThu} style={styles.checkbox}/>
            <Text>Fri</Text>
            <CheckBox value={isFri} onValueChange={setFri} style={styles.checkbox}/>
            <Text>Sat</Text>
            <CheckBox value={isSat} onValueChange={setSat} style={styles.checkbox}/>
            <Text>Sun</Text>
            <CheckBox value={isSun} onValueChange={setSun} style={styles.checkbox}/>
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
            <Text>Selected time is {cTime}</Text>
          </View>
          <Button title="Add time" onPress={pushTime}/>
          <Text>{timesList}</Text>
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
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Add;
