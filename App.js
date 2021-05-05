import 'react-native-gesture-handler';
import React from 'react';
import Menu from './app/Menu';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <Menu />
    </NavigationContainer>
  );
}

