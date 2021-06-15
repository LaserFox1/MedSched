import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Platform, CheckBox, SafeAreaView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SearchBar } from "react-native-elements";
import ProfileLine from "./ProfileLine2";
import WeekdayPicker from "./WeekdayPicker";
import TimeList from "./TimeList";
import firebase from "firebase";
import {Autocomplete, withKeyboardAwareScrollView} from "react-native-dropdown-autocomplete";


function Add(props) {
  const [searchText, setSearchText] = useState();
  const [date, setDate] = useState(new Date(1598051730000));
  const [cTime, setTime] = useState("12:00");
  const [cUser, setUser] = useState("Paul");
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
    // console.log("Add.js screen:")
    // console.log(firebaseUser);
    setUser(firebaseUser.uid);
    } else {
      console.log("Failed");
    }
});

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      var minutes;
      if(currentDate.getMinutes() > 9){
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

    const pushTime = () => {7
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


    const medications = [
      { name: 'Aspirin' },
      { name: 'Amoxicillin' },
      { name: 'Vitamin D' },
      { name: 'Ibuprofen' },
      { name: 'Cetirizine' },
      { name: 'Azithromycin' },
      { name: 'Amlodipine besylate' },
      { name: 'Albuterol sulfate' },
      { name: 'Cyclobenzaprine ' },
      { name: 'Cephalexin' },
      { name: 'Hydrochlorothiazide' },
      { name: 'Lisinopril' },
      { name: 'Amphetamine' },
      { name: 'Loratadine' },
      { name: 'Amoxicillin-clavulanate potassium' },
      { name: "Folic acid" },
      { name: 'Prednisone' },
      { name: 'Benzonatate' },
      { name: 'Gabapentin' },
      { name: 'Zolpidem tartrate' },
      { name: 'Trimethoprim' },
      { name: 'Methylprednisolone' },
      { name: 'Fluconazole' },
      { name: "Atorvastatin" },
      { name: 'Ferrous sulfate' },
      { name: 'Cyanocobalamin' },
      { name: 'Metronidazole' },
      { name: 'Bromphen' },
      { name: 'Pantoprazole sodium' },
      { name: 'Vitamin D3' },
      { name: 'Naproxen' },
      { name: 'Alprazolam' },
      { name: 'Oseltamivir phosphate' },
      { name: 'Nitrofurantoin' },
      { name: 'Losartan potassium' },
      { name: 'Metoprolol succinate ER' },
      { name: 'Fluticasone propionate' },
      { name: 'Chlorhexidine gluconate' },
      { name: 'Doxycycline' },
      { name: 'Phenazopyridine HCl' },
      { name: 'Metoprolol tartrate' },
      { name: 'Latanoprost eye drops' },
      { name: 'Sertraline HCl' },
      { name: 'Trazodone hydrochloride' },
      { name: 'Omeprazole' },
      { name: 'Ciprofloxacin' },
      { name: 'Levothyroxine sodium' },
      { name: 'Meloxicam' },
      { name: 'Docusate sodium' },
      { name: 'Triamcinolone acetonide cream' },
      { name: 'Novalgin' },
      { name: 'RatioDolor' },
      { name: 'Selina Gynial' },
      { name: 'Selina Mite' },
      { name: 'Neo-angin' },
      { name: 'Strepsils' },
      { name: 'NeoCitran' },
      { name: 'Paracetamol' },
      { name: 'Co-codamol' },
      { name: 'Codeine' },
      { name: 'Tramadol' },
      { name: 'Morphine' },
      { name: 'Diclofenac' },
      { name: 'Dihydrocodeine' },
      { name: 'Oxycodone' },
      { name: 'Nefopam' },
      { name: 'Fentanyl' },
      { name: 'Ketamine' },
      { name: 'Bisoprolol' },
      { name: 'Atenolol' },
      { name: 'Digoxin' },
      { name: 'Amiodarone' },
      { name: 'Adenosine' },
      { name: 'Diltiazem' },
      { name: 'Flucloxacillin' },
      { name: 'Meropenem' },
      { name: 'Vancomycin' },
      { name: 'Gentamycin' },
      { name: 'Clarithromycin' },
      { name: 'Co-amoxiclav' },
      { name: 'Ceftazidime' },
      { name: 'Piperacillin' },
      { name: 'Levofloxacin' },
      { name: 'Cefuroxime' },
      { name: 'Clindamycin' },
      { name: 'Warfarin' },
      { name: 'Rivaroxaban' },
      { name: 'Apixaban' },
      { name: 'Enoxaparin' },
      { name: 'Funderparinex' },
      { name: 'Heparin' },
      { name: 'Sodium valproate' },
      { name: "Phenytoin" },
      { name: 'Levetiracetam' },
      { name: 'Clonazepam' },
      { name: 'Diazapam' },
      { name: 'Lorazepam' },
      { name: 'Carbamazepine' },
      { name: 'Citalopram' },
      { name: 'Fluoxetine' },
    ];


  return (
    <View style={styles.container}>
      <ProfileLine />
      <View>
        <Text style={styles.headers}>Medication</Text>
      </View>
      <View style={styles.autocompletesContainer}>
            <Autocomplete
              data={medications} 
              valueExtractor={item => item.name}
              handleSelectItem={(item) => {
                item.name;
                setMed(item.name);
              }}
              style={styles.input}
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
  autocompletesContainer: {
    paddingTop: 0,
    width: 1000,
    paddingHorizontal: 8,
  },
  input: {
    maxHeight: 1000,
    maxWidth: 1000,
  },
});

export default Add;