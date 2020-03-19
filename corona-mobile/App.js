import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackActions } from "@react-navigation/native";

import { styles, defaults } from "./assets/styles/styles";

import HomeScreen from "./assets/screens/HomeScreen";
import LatestNews from "./assets/screens/LatestNews/LatestNews";
import NewsScreen from "./assets/screens/LatestNews/NewsScreen";
import SymptomCheck from "./assets/screens/SymptomCheck/SymptomCheck";
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
import TwitterFeed from "./assets/screens/TwitterFeed.js";

import Credits from "./assets/screens/footerPages/Credits.js";
import Faq from "./assets/screens/footerPages/Faq.js";
import Sources from "./assets/screens/footerPages/Sources.js";

import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const globalScreenOptions = {
  headerStyle: {
    backgroundColor: defaults.primarycolor 
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold"
  }
};

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={({ navigation, route }) => ({
      headerRight: () =>
        route.name !== "Home" && (
          <Entypo
            name="home"
            color={"white"}
            size={25}
            style={{ marginRight: 20 }}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.dispatch(StackActions.popToTop());
              }
            }}
          />
        ),
      ...globalScreenOptions
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
      name="TwitterFeed"
      component={TwitterFeed}
      options={{ title: "Curated Tweets" }}
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
);

const TrackerStack = () => (
  <Stack.Navigator initialRouteName="LiveTracker" screenOptions={globalScreenOptions}>
    <Stack.Screen
      name="LiveTracker"
      component={TrackerStatus}
      options={{ title: "Live Tracker" }}
    />
  </Stack.Navigator>
);

const SymptomStack = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={globalScreenOptions}>
    <Stack.Screen
      name="SymptomCheck"
      component={SymptomCheck}
      options={{ title: "Symptom Check" }}
    />
  </Stack.Navigator>
);

const TestingCentersStack = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={globalScreenOptions}>
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
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) =>
            ({
              Home: <Entypo name="home" size={size} color={color} />,
              "Live Tracker": (
                <MaterialCommunityIcons
                  name="radar"
                  size={size}
                  color={color}
                />
              ),
              "Symptom Check": (
                <FontAwesome name="stethoscope" size={size} color={color} />
              ),
              "Testing Centers": (
                <FontAwesome name="building" size={size} color={color} />
              )
            }[route.name])
        })}
        tabBarOptions={{
          activeTintColor: defaults.primarycolor,
          style: {paddingVertical: defaults.padding}
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Live Tracker" component={TrackerStack} />
        <Tab.Screen name="Symptom Check" component={SymptomStack} />
        <Tab.Screen name="Testing Centers" component={TestingCentersStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

