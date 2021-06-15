import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
import { StyleSheet, Text, View,  FlatList, RefreshControl, Alert } from "react-native";
import Swipeout from "react-native-swipeout";
import ProfileLine from "./ProfileLine3";
import firebase from "firebase";

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
       cUser = firebaseUser.uid;
       } else {
         console.log("Failed");
       }
   });

var cUser = "";
var data = [];

if(cUser != ""){
db.collection("users").doc(cUser).collection("storedMedication")
    .onSnapshot((querySnapshot) => {
    var arr1 = [];
        querySnapshot.forEach((doc) => {
            arr1.push(doc.data());
        });
        console.log(arr1);
    });
    }

class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null
    }
  }
  render() {
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if(this.state.activeRowKey != null) {
          this.setState({activeRowKey: null});
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({activeRowKey: this.props.item.id});
      },
      left: [
        {
          onPress: () => {
            const deletingRow = this.state.activeRowKey;
            Alert.alert(
              'Alert',
              'Are you sure you want to delete?',
              [
                {text: 'No'},
                {text: 'Yes', onPress: () => {
                    data.splice(this.props.index, 1);
                    this.props.parentFlatList.refreshFlatList(deletingRow);
                }},
              ],
              {cancelable: true}
            )
          },
          text: 'Delete', type: 'delete'
        }
      ],
      rowId: this.props.index,
      sectionId: 1
    };

    return (
      <Swipeout style={styles.swipe} {...swipeSettings}>
        <View style={styles.outerContainer}>
          <Text style={styles.medicationName}>{this.props.item.name}</Text>
          <Text style={styles.subtitle}>{this.props.item.date}</Text>
          <Text style={styles.subtitle}>{this.props.item.time}</Text>
        </View>
      </Swipeout>
    );
  }
}

class MedicationList extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      activeRowKey: null,
    });
  }
  refreshFlatList = (deletedKey) => {
    this.setState((prevState) => {
      return {
        deletedKey: deletedKey
      };
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ProfileLine />
        <FlatList 
          data={data}
          renderItem={({item, index}) => {
            return (
              <FlatListItem item={item} index={index} parentFlatList={this}>

              </FlatListItem>
            );
          }}
        >
        </FlatList>
        <StatusBar style="auto" />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  swipe: {
    backgroundColor: "#fff",
    borderColor: "#a6a6a6",
    borderTopWidth: 4,
  },
  outerContainer: {
    padding: 15,
  },
  medicationName: {
    fontSize: 25,
  },
  subtitle: {
    fontSize: 15,
  }
});

export default MedicationList; 