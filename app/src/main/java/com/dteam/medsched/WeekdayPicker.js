import React, { useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

function WeekdayPicker(props) {
  const [moButtonVal, setMoButtonVal] = useState(false);
  const { moToggle } = moButtonVal;
  const moButtonBg = moToggle ? "blue" : "white";
  const moTextColor = moToggle ? "white" : "black";
  const [tuButtonVal, setTuButtonVal] = useState(false);
  const { tuToggle } = tuButtonVal;
  const tuButtonBg = tuToggle ? "blue" : "white";
  const tuTextColor = tuToggle ? "white" : "black";
  const [weButtonVal, setWeButtonVal] = useState(false);
  const { weToggle } = weButtonVal;
  const weButtonBg = weToggle ? "blue" : "white";
  const weTextColor = weToggle ? "white" : "black";
  const [thButtonVal, setThButtonVal] = useState(false);
  const { thToggle } = thButtonVal;
  const thButtonBg = thToggle ? "blue" : "white";
  const thTextColor = thToggle ? "white" : "black";
  const [frButtonVal, setFrButtonVal] = useState(false);
  const { frToggle } = frButtonVal;
  const frButtonBg = frToggle ? "blue" : "white";
  const frTextColor = frToggle ? "white" : "black";
  const [saButtonVal, setSaButtonVal] = useState(false);
  const { saToggle } = saButtonVal;
  const saButtonBg = saToggle ? "blue" : "white";
  const saTextColor = saToggle ? "white" : "black";
  const [suButtonVal, setSuButtonVal] = useState(false);
  const { suToggle } = suButtonVal;
  const suButtonBg = suToggle ? "blue" : "white";
  const suTextColor = suToggle ? "white" : "black";
  //   function buttonPress(day) {
  //     console.log(day);
  //     const newButtonVal = !buttonVal.toggle;
  //     setButtonVal({ toggle: newButtonVal });
  //   }
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={() => {
          console.log("Mo");
          const newMoButtonVal = !moButtonVal.moToggle;
          setMoButtonVal({ moToggle: newMoButtonVal });
        }}
        style={{
          margin: 10,
          height: 35,
          width: 35,
          justifyContent: "center",
          backgroundColor: moButtonBg,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: moTextColor,
            fontSize: 20,
          }}
        >
          Mo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("Tu");
          const newTuButtonVal = !tuButtonVal.tuToggle;
          setTuButtonVal({ tuToggle: newTuButtonVal });
        }}
        // onPress={buttonPress("Tu")}
        // onPress={buttonPress}
        style={{
          margin: 10,
          height: 35,
          width: 35,
          justifyContent: "center",
          backgroundColor: tuButtonBg,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: tuTextColor,
            fontSize: 20,
          }}
        >
          Tu
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("We");
          const newWeButtonVal = !weButtonVal.weToggle;
          setWeButtonVal({ weToggle: newWeButtonVal });
        }}
        // onPress={buttonPress("We")}
        // onPress={buttonPress}
        style={{
          margin: 10,
          height: 35,
          width: 35,
          justifyContent: "center",
          backgroundColor: weButtonBg,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: weTextColor,
            fontSize: 20,
          }}
        >
          We
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("Th");
          const newThButtonVal = !thButtonVal.thToggle;
          setThButtonVal({ thToggle: newThButtonVal });
        }}
        // onPress={buttonPress("Th")}
        // onPress={buttonPress}
        style={{
          margin: 10,
          height: 35,
          width: 35,
          justifyContent: "center",
          backgroundColor: thButtonBg,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: thTextColor,
            fontSize: 20,
          }}
        >
          Th
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("Fr");
          const newFrButtonVal = !frButtonVal.frToggle;
          setFrButtonVal({ frToggle: newFrButtonVal });
        }}
        // onPress={buttonPress("Fr")}
        // onPress={buttonPress}
        style={{
          margin: 10,
          height: 35,
          width: 35,
          justifyContent: "center",
          backgroundColor: frButtonBg,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: frTextColor,
            fontSize: 20,
          }}
        >
          Fr
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("Sa");
          const newSaButtonVal = !saButtonVal.saToggle;
          setSaButtonVal({ saToggle: newSaButtonVal });
        }}
        // onPress={buttonPress("Sa")}
        // onPress={buttonPress}
        style={{
          margin: 10,
          height: 35,
          width: 35,
          justifyContent: "center",
          backgroundColor: saButtonBg,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: saTextColor,
            fontSize: 20,
          }}
        >
          Sa
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("Su");
          const newSuButtonVal = !suButtonVal.suToggle;
          setSuButtonVal({ suToggle: newSuButtonVal });
        }}
        // onPress={buttonPress("Su")}
        // onPress={buttonPress}
        style={{
          margin: 10,
          height: 35,
          width: 35,
          justifyContent: "center",
          backgroundColor: suButtonBg,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: suTextColor,
            fontSize: 20,
          }}
        >
          Su
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default WeekdayPicker;
