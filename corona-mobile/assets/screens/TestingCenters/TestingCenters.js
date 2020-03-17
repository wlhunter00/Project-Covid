import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button } from "react-native";

import { getLocationAsync } from "../../Utils";

export default function TestingCenters({ navigation }) {
  const locResp = getLocationAsync().then(locResp => {
    // console.log(locResp);
    const lat = locResp.location.coords.latitude;
    const long = locResp.location.coords.longitude;
    console.log(lat, long);
    fetch("https://projectcovid-backend.herokuapp.com/centers/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(locResp)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testing Centers</Text>
      <Button
        title="Find Center"
        onPress={() => navigation.push("CenterFinder", {})}
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
