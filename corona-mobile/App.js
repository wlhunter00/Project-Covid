import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackActions } from '@react-navigation/native';

import HomeScreen from "./assets/screens/HomeScreen";
import LatestNews from "./assets/screens/LatestNews/LatestNews";
import NewsScreen from "./assets/screens/LatestNews/NewsScreen";
import LiveTracker from "./assets/screens/LiveTracker/LiveTracker";
import SymptomCheck from "./assets/screens/SymptomCheck/SymptomCheck";
import Diagnosis from "./assets/screens/SymptomCheck/Diagnosis";
import TestingCenters from "./assets/screens/TestingCenters/TestingCenters";
import CenterFinder from "./assets/screens/TestingCenters/CenterFinder";
import TravelInformation from "./assets/screens/TravelInformation/TravelInformation";
import TravelStatus from "./assets/screens/TravelInformation/TravelStatus";
import GlobalResourcesMain from "./assets/screens/GlobalResources/GlobalResourcesMain";
import InformationalToolkit from "./assets/screens/GlobalResources/InformationalToolkit";
import PreventativePractices from "./assets/screens/GlobalResources/PreventivePractices";
import MythBusting from "./assets/screens/GlobalResources/MythBusting";
import HowToHelp from "./assets/screens/GlobalResources/HowToHelp";
import StudentResources from "./assets/screens/GlobalResources/StudentResources";
import CrisisContact from "./assets/screens/GlobalResources/CrisisContact";
import TrackerStatus from "./assets/screens/LiveTracker/TrackerStatus";

import Credits from "./assets/screens/footerPages/Credits.js";
import Faq from "./assets/screens/footerPages/Faq.js";
import Sources from "./assets/screens/footerPages/Sources.js";

import { Entypo } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#3d9141"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          },
          headerRight: () => (
            <Entypo
              name="home"
              color={"white"}
              size={25}
              style={{ marginRight: 20 }}
              // TODO: Fix below
              onPress={() => navigation.dispatch(StackActions.popToTop())}
            />
          )
        })}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="LatestNews"
          component={LatestNews}
          options={{
            title: "Latest News"
          }}
        />
        <Stack.Screen name="NewsScreen" component={NewsScreen} />
        <Stack.Screen
          name="GlobalResources"
          options={{ title: "Global Resources" }}
          component={GlobalResourcesMain}
        />
        <Stack.Screen
          name="SymptomCheck"
          options={{ title: "Symptom Check" }}
          component={SymptomCheck}
        />
        <Stack.Screen name="Diagnosis" component={Diagnosis} />
        <Stack.Screen
          name="TestingCenters"
          options={{ title: "Testing Centers" }}
          component={TestingCenters}
        />
        <Stack.Screen
          name="CenterFinder"
          options={{ title: "Center Information" }}
          component={CenterFinder}
        />
        <Stack.Screen
          name="TravelInformation"
          options={{ title: "Travel Information" }}
          component={TravelInformation}
        />
        <Stack.Screen
          name="TravelStatus"
          options={{ title: "Travel Status" }}
          component={TravelStatus}
        />
        <Stack.Screen
          name="LiveTracker"
          options={{ title: "Live Tracker" }}
          component={LiveTracker}
        />
        <Stack.Screen
          name="TrackerStatus"
          options={{ title: "Tracker Status" }}
          component={TrackerStatus}
        />
        <Stack.Screen
          name="InformationalToolkit"
          options={{ title: "Info to Use" }}
          component={InformationalToolkit}
        />
        <Stack.Screen
          name="PreventativePractices"
          options={{ title: "Preventative Practices" }}
          component={PreventativePractices}
        />
        <Stack.Screen
          name="MythBusting"
          component={MythBusting}
          options={{ title: "Myth Busting" }}
        />
        <Stack.Screen
          name="HowToHelp"
          component={HowToHelp}
          options={{ title: "How to Help" }}
        />
        <Stack.Screen
          name="StudentResources"
          component={StudentResources}
          options={{ title: "Student Resources" }}
        />
        <Stack.Screen
          name="CrisisContact"
          component={CrisisContact}
          options={{ title: "Crisis Contact" }}
        />
        <Stack.Screen
          name="Credits"
          component={Credits}
          options={{ title: "Created By" }}
        />
        <Stack.Screen name="Faq" component={Faq} options={{ title: "FAQ" }} />
        <Stack.Screen
          name="Sources"
          component={Sources}
          options={{ title: "Sources" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
