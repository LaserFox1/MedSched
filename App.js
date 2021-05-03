import 'react-native-gesture-handler';
import React from 'react';
import Menu from './app/Menu';
import { NavigationContainer } from '@react-navigation/native';
import firebase from "firebase";

export default function App() {
  return (
    <NavigationContainer>
      <Menu />
    </NavigationContainer>
  );
}

