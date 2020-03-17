// import React, { Component } from 'react';
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from "react-native";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <PageButton
        title="Latest News"
        navigationName="LatestNews"
        icon={<Entypo name="news" size={25} />}
        description="Read updates from reliable news sites."
        navigation={navigation}
      />

      <PageButton
        title="Global Resources"
        navigationName="GlobalResources"
        icon={<Entypo name="globe" size={25} />}
        description="Get info straight from the experts."
        navigation={navigation}
      />

      <PageButton
        title="Symptom Check"
        navigationName="SymptomCheck"
        icon={
          <FontAwesome
            name="stethoscope"
            size={27}
            style={{ marginRight: 3 }}
          />
        }
        description="Do a quick diagnosis to see if you should get tested."
        navigation={navigation}
      />

      <PageButton
        title="Testing Centers"
        navigationName="TestingCenters"
        icon={
          <FontAwesome name="building-o" size={25} style={{ marginRight: 5 }} />
        }
        description="Find information regarding testing near you."
        navigation={navigation}
      />

      <PageButton
        title="Travel Information"
        navigationName="TravelInformation"
        icon={<Entypo name="aircraft" size={25} />}
        description="Check travel status before you travel."
        navigation={navigation}
      />

      <PageButton
        title="Live Global Outbreak Tracker"
        navigationName="LiveTracker"
        icon={<MaterialCommunityIcons name="radar" size={25} />}
        description="Track the global spread."
        navigation={navigation}
      />
    </ScrollView>
  );
}

function PageButton({ navigation, title, navigationName, icon, description }) {
  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate(navigationName);
      }}
    >
      <View style={styles.pageButton}>
        {icon}
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.pageButtonTitle}>{title}</Text>
          <Text style={styles.pageButtonDescription}>{description}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Entypo name="chevron-thin-right" />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  pageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderBottomColor: "#c8c7cc",
    borderBottomWidth: 0.5
  },
  pageButtonTitle: {
    fontSize: 18,
    fontWeight: "400"
  },
  pageButtonDescription: {
    color: "grey",
    marginTop: 4
  }
});
