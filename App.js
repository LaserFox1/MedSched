import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import Menu from './app/Menu';
import Welcome from './app/WelcomePage';
import UserPage from './app/UserPage';
import Login from './app/LoginPage';
import Register from './app/RegisterPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import firebase from "firebase";

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default App = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [currentTime, setCurrentTime] = useState();

    if(!firebase.apps.length){
    firebase.initializeApp({
      apiKey: "AIzaSyBPBiT_zEwB85zG1xODwDPjW0ZXp9DUMQs",
      authDomain: "medsched-29619.firebaseapp.com",
      projectId: "medsched-29619"
    });
    }else firebase.app();

    var db = firebase.firestore();

    updateTime = () => {
        setCurrentTime(new Date().toLocaleTimeString());
        db.collection("users").doc("Paul").collection("storedMedication").doc("Aspirin").get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data().days);
                var dayArr = doc.data().days.split(',');
                var timeArr = doc.data().times.split(',');
                for (var d of dayArr){
                    for(var t of timeArr){
                        t += ":00"
                        if(d == new Date().getDay() && t == currentTime){
                            (async () => {
                                await sendPushNotification(expoPushToken);
                            })();
                        }
                    }
                }
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

     useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });

        const interval = setInterval(() => {
          //updateTime();
        }, 1000);

        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
          clearInterval(interval);
        }
      }, []);

    return (
        <NavigationContainer>
             <Stack.Navigator initialRouteName="Menu">
                <Stack.Screen name="Menu" component={Menu} options={{headerShown: false}}/>
                <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
                <Stack.Screen name="UserPage" component={UserPage} options={{headerShown: false}}/>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
      );
};

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'It is time to take your medication!',
    body: 'Now scheduled: Aspirin',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    console.log(new Date());
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

