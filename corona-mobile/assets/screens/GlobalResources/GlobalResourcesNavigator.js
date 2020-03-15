import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import GlobalResourcesMain from "./GlobalResourcesMain";
import InformationalToolkit from "./InformationalToolkit";
import PreventativePractices from "./PreventivePractices";
import MythBusting from "./MythBusting";
import HowToHelp from "./HowToHelp";
import StudentResources from "./StudentResources";
import CrisisContact from "./CrisisContact";

const GlobalStack = createStackNavigator();

export default class GlobalResourcesNavigator extends Component {
  render() {
    return (
      <GlobalStack.Navigator initialRouteName="GlobalResourcesMain">
        <GlobalStack.Screen
          name="GlobalResourcesMain"
          component={GlobalResourcesMain}
          options={{ headerShown: false }}
        />

        <GlobalStack.Screen
          name="InformationalToolkit"
          component={InformationalToolkit}
        />

        <GlobalStack.Screen
          name="PreventativePractices"
          component={PreventativePractices}
        />

        <GlobalStack.Screen name="MythBusting" component={MythBusting} />

        <GlobalStack.Screen name="HowToHelp" component={HowToHelp} />

        <GlobalStack.Screen
          name="StudentResources"
          component={StudentResources}
        />

        <GlobalStack.Screen name="CrisisContact" component={CrisisContact} />
      </GlobalStack.Navigator>
    );
  }
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
