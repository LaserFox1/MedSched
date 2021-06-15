import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import { Platform, LogBox } from 'react-native';
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
LogBox.ignoreAllLogs();
LogBox.ignoreAllLogs();
LogBox.ignoreAllLogs();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

var med = "";

export default App = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const [gaming, setGaming] = useState();
    const notificationListener = useRef();
    const responseListener = useRef();
    const [currentTime, setCurrentTime] = useState();
    const [cUser, setCUser] = useState("");

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
      setCUser(firebaseUser.uid);
      } else {
        console.log("Failed");
      }
});

    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
      // console.log("Add.js screen:")
      // console.log(firebaseUser);
      setCUser(firebaseUser.uid);
      } else {
        console.log("Failed");
      }
});

    function authStateListener() {
          // [START auth_state_listener]
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setGaming(user);
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
          // [END auth_state_listener]
        }
    updateTime = () => {
        setCurrentTime(new Date().toLocaleTimeString());
        db.collection("users").doc(cUser).collection("storedMedication").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              var dayArr = doc.data().days.split(',');
              var timeArr = doc.data().times.split(', ');
              for (var d of dayArr){
                  for(var t of timeArr){
                      t += ":00"
                      if(d == new Date().getDay() && t == currentTime){
                          med = doc.id;
                          (async () => {
                              await sendPushNotification(expoPushToken);
                          })();
                      }
                  }
              }
          });
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
    if(gaming!=null){
        return (
        <NavigationContainer>
             <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Menu" component={Menu} options={{headerShown: false}}/>
                <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
                <Stack.Screen name="UserPage" component={UserPage} options={{headerShown: false}}/>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
            );
        }
    else{
        return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Menu" component={Menu} options={{headerShown: false}}/>
                <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
                <Stack.Screen name="UserPage" component={UserPage} options={{headerShown: false}}/>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>

      );
}

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'It is time to take your medication!',
    body: `Now scheduled: ${med}`,
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
}

