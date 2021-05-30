import React from "react";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Calendar from "./CalendarScreen";
import Add from "./Add";
import MedicationList from "./MedicationList";

const TabNavigator = createMaterialBottomTabNavigator();

function Menu(props) {
  return (
    <TabNavigator.Navigator
      initialRouteName="Calendar"
      activeColor="#9b4600"
      inactiveColor="black"
      shifting={true}
      barStyle={{ }}
    >
      <TabNavigator.Screen 
        name="Calendar"
        component={Calendar}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color }) => (
            <AntDesign name="calendar" size={25} color={color} />
          ),
          tabBarColor: "#bfefff",
        }}
      />
      <TabNavigator.Screen 
        name="Add"
        component={Add}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" size={24} color={color} />
          ),
          tabBarColor: "#88b7c6"
        }}
      />
      <TabNavigator.Screen 
        name="List"
        component={MedicationList}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color }) => (
            <AntDesign name="barschart" size={25} color={color} />
          ),
          tabBarColor: "#998bb9"
        }}
      />
    </TabNavigator.Navigator>
  );
}

const styles = StyleSheet.create({

});

export default Menu;
