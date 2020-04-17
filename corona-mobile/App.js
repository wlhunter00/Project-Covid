import React from "react";
import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import { AppearanceProvider } from "react-native-appearance";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackActions } from "@react-navigation/native";
import { enableScreens } from 'react-native-screens';

import { useStyle } from "./assets/styles/styles";

import HomeScreen from "./assets/screens/HomeScreen";
import LatestNews from "./assets/screens/LatestNews/LatestNews";
import TestingCenters from "./assets/screens/TestingCenters/TestingCenters";
import TravelInformation from "./assets/screens/TravelInformation/TravelInformation";
import TravelStatus from "./assets/screens/TravelInformation/TravelStatus";
import GlobalResourcesMain from "./assets/screens/GlobalResources/GlobalResourcesMain";
import InformationalToolkit from "./assets/screens/GlobalResources/InformationalToolkit";
import PreventativePractices from "./assets/screens/GlobalResources/PreventivePractices";
import MentalHealth from "./assets/screens/GlobalResources/MentalHealth";
import StudentResources from "./assets/screens/GlobalResources/StudentResources";
import TrackerStatus from "./assets/screens/LiveTracker/TrackerStatus";
import ResourceTopic from "./assets/screens/GlobalResources/ResourceTopic";

import AboutScreen from "./assets/screens/AboutScreen";
import Team from "./assets/screens/footerPages/Team.js";
import Faq from "./assets/screens/footerPages/Faq.js";
import Sources from "./assets/screens/footerPages/Sources.js";
import ContactUs from "./assets/screens/footerPages/ContactUs.js";
import PrivacyPolicy from "./assets/screens/footerPages/PrivacyPolicy.js";
import AboutLFR from "./assets/screens/footerPages/AboutLFR.js";

import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import WebViewScreen from "./assets/screens/WebViewScreen";
import { SymptomsList } from "./assets/screens/SymptomCheck/SymptomsList";
import LocationRequest from "./assets/components/LocationRequest";

enableScreens();

const NativeStack = createNativeStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const { styles, colors, isDark } = useStyle();

  const globalScreenOptions = {
    headerStyle: {
      backgroundColor: colors.primarycolor
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
    headerBackTitle: " "
  };

  const globalNativeStackScreenOptions = {
    headerLargeTitle: true,
    // headerTranslucent: true,
    headerStyle: { backgroundColor: colors.backgroundcolor },
    headerHideShadow: true,
    headerTintColor: colors.primarycolor,
    headerTitleStyle: { color: colors.textcolor }
  };

  const HomeNativeStack = () => (
    <NativeStack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation, route }) => globalNativeStackScreenOptions}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LatestNews"
        component={LatestNews}
        options={{title: "Latest News"}}
      />
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
        options={{ title: "Informational Toolkit" }}
        component={InformationalToolkit}
      />
      <Stack.Screen
        name="PreventativePractices"
        options={{ title: "Preventative Practices" }}
        component={PreventativePractices}
      />
      <Stack.Screen
        name="MentalHealth"
        options={{ title: "Mental Health" }}
        component={MentalHealth}
      />
      <Stack.Screen
        name="StudentResources"
        options={{ title: "Student Resources" }}
        component={StudentResources}
      />
      <Stack.Screen
        name="ResourceTopic"
        component={ResourceTopic}
      />
      <Stack.Screen name="WebView" component={WebViewScreen} options={{
        headerLargeTitle: false,
        headerStyle: { backgroundColor: colors.primarycolor },
        headerTintColor: "white",
        headerTitleStyle: {color: "white"}
      }} />
      <Stack.Screen
        name="Sources"
        component={Sources}
      />
      <Stack.Screen
        name="Symptoms"
        component={SymptomsList}
      />
    </NativeStack.Navigator>
  );

  const TrackerStack = () => (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={globalScreenOptions}
    >
      <Stack.Screen
        name="LiveTracker"
        component={TrackerStatus}
        options={{ title: "Live Tracker" }}
      />
    </Stack.Navigator>
  );

  const AboutStack = () => (
    <NativeStack.Navigator
      initialRouteName="About"
      screenOptions={globalNativeStackScreenOptions}
    >
      <Stack.Screen
        name="About"
        component={AboutScreen}
      />
      <Stack.Screen name="WebView" component={WebViewScreen} options={{
        headerLargeTitle: false,
        headerStyle: { backgroundColor: colors.primarycolor },
        headerTintColor: "white",
        headerTitleStyle: {color: "white"}
      }} />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ 
          title: "Contact Us",
         }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ 
          title: "Privacy Policy",
         }}
      />
      <Stack.Screen
        name="Team"
        component={Team}
      />
      <Stack.Screen
        name="AboutLFR"
        component={AboutLFR}
        options={{ 
          title: "About LFR",
         }}
      />
      <Stack.Screen name="Faq"
        component={Faq}
        options={{ 
          title: "FAQ",
         }} />
    </NativeStack.Navigator>
  );

  const TestingCentersStack = () => (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={globalScreenOptions}
    >
      <Stack.Screen
        name="TestingCenters"
        options={{ 
          title: "",
          headerTransparent: true,
          headerTintColor: colors.primarycolor
         }}
        component={TestingCenters}
      />
      <Stack.Screen name="WebView" component={WebViewScreen} />
    </Stack.Navigator>
  );

  return (
    <AppearanceProvider>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
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
                Testing: (
                  <FontAwesome name="building" size={size} color={color} />
                ),
                About: (
                  <Entypo name="info-with-circle" size={size} color={color} />
                )
              }[route.name])
          })}
          tabBarOptions={{
            activeTintColor: colors.primarycolor,
            style: [
              {
                paddingVertical: 5,
                backgroundColor: colors.secondarybackgroundcolor
              },
              isDark ? { borderTopWidth: 0 } : {}
            ]
          }}
        >
          <Tab.Screen name="Home" component={HomeNativeStack} />
          <Tab.Screen name="Live Tracker" component={TrackerStack} />
          <Tab.Screen name="Testing" component={TestingCentersStack} />
          <Tab.Screen name="About" component={AboutStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}
