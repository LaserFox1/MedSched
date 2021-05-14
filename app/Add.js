import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Platform } from "react-native";
import { SearchBar } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import ProfileLine from "./ProfileLine";
import WeekdayPicker from "./WeekdayPicker";
import TimeList from "./TimeList";

function Add(props) {
  const [searchText, setSearchText] = useState();
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showTimepicker = () => {
    showMode("time");
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
        <View>
          <Button onPress={showTimepicker} title="Select a time!" />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        )}
        <View>
        
        </View>
      </View>
      <View>
        <Button title="Add" />
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
