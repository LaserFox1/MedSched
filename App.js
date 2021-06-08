import 'react-native-gesture-handler';
import React from 'react';
import Menu from './app/Menu';
import Welcome from './app/WelcomePage';
import UserPage from './app/UserPage';
import Login from './app/LoginPage';
import NotificationTest from './app/NotificationTestPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default App = () => {
    return (
        <NavigationContainer>
             <Stack.Navigator initialRouteName="Menu">
                <Stack.Screen name="Menu" component={Menu} options={{headerShown: false}}/>
                <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
                <Stack.Screen name="UserPage" component={UserPage} options={{headerShown: false}}/>
                <Stack.Screen name="NotificationTest" component={NotificationTest} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
      );
};

