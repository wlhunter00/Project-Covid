// import React, { Component } from 'react';
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles}>
      <Text>Home Screen</Text>
      <Button
        title="Latest News"
        onPress={() => navigation.navigate("LatestNews")}
      />
      <Button
        title="Global Resources"
        onPress={() => navigation.navigate("GlobalResources")}
      />
      <Button
        title="Symptom Check"
        onPress={() => navigation.navigate("SymptomCheck")}
      />
      <Button
        title="Testing Centers"
        onPress={() => navigation.navigate("TestingCenters")}
      />
      <Button
        title="Travel Information"
        onPress={() => navigation.navigate("TravelInformation")}
      />
      <Button
        title="Live Gloabl Outbreak Tracker"
        onPress={() => navigation.navigate("LiveTracker")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
