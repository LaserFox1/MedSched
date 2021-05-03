import 'react-native-gesture-handler';
import React from 'react';
import Menu from './app/Menu';
import { NavigationContainer } from '@react-navigation/native';
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBPBiT_zEwB85zG1xODwDPjW0ZXp9DUMQs",
    authDomain: "medsched-29619.firebaseapp.com",
    projectId: "medsched-29619",
    storageBucket: "medsched-29619.appspot.com",
    messagingSenderId: "992717464334",
    appId: "1:992717464334:web:2864a0b67919922e39ed5f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <NavigationContainer>
      <Menu />
    </NavigationContainer>
  );
}

