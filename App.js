import 'react-native-gesture-handler';
import React from 'react';
import Menu from './app/src/main/java/com/dteam/medsched/Menu';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <Menu />
    </NavigationContainer>
  );
}

