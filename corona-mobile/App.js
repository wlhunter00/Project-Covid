import React from "react";
import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import { AppearanceProvider } from "react-native-appearance";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackActions } from "@react-navigation/native";

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

  const HomeStack = () => (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation, route }) => ({
        headerRight: ({ tintColor }) =>
          route.name !== "Home" && (
            <Entypo
              name="home"
              color={tintColor}
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
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="LatestNews"
        component={LatestNews}
        options={{
          title: "Latest News"
        }}
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
        options={{
          title: "",
          headerTransparent: true,
          headerTintColor: colors.primarycolor
        }}
        component={InformationalToolkit}
      />
      <Stack.Screen
        name="PreventativePractices"
        options={{
          title: "",
          headerTransparent: true,
          headerTintColor: colors.primarycolor
        }}
        component={PreventativePractices}
      />
      <Stack.Screen
        name="MentalHealth"
        component={MentalHealth}
        options={{
          title: "",
          headerTransparent: true,
          headerTintColor: colors.primarycolor
        }}
      />
      <Stack.Screen
        name="StudentResources"
        component={StudentResources}
        options={{
          title: "",
          headerTransparent: true,
          headerTintColor: colors.primarycolor
        }}
      />
      <Stack.Screen
        name="ResourceTopic"
        component={ResourceTopic}
        options={{
          title: "",
          headerTintColor: colors.primarycolor,
          headerStyle: {
            backgroundColor: colors.backgroundcolor
          }
        }}
      />
      <Stack.Screen name="WebView" component={WebViewScreen} />
      <Stack.Screen
        name="Sources"
        component={Sources}
        options={{ title: "Sources" }}
      />
      <Stack.Screen
        name="Symptoms"
        component={SymptomsList}
        options={{
          title: "",
          headerTransparent: true,
          headerTintColor: colors.primarycolor
        }}
      />
      <Stack.Screen
        name="LiveTracker"
        component={TrackerStatus}
        options={{ title: "Live Tracker" }}
      />
    </Stack.Navigator>
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
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={globalScreenOptions}
    >
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: "About the App" }}
      />
      <Stack.Screen name="WebView" component={WebViewScreen} />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ title: "Contact Us" }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ title: "Privacy Policy" }}
      />
      <Stack.Screen
        name="Team"
        component={Team}
        options={{ title: "Created By" }}
      />
      <Stack.Screen
        name="AboutLFR"
        component={AboutLFR}
        options={{ title: "About LFR" }}
      />
      <Stack.Screen name="Faq" component={Faq} options={{ title: "FAQ" }} />
    </Stack.Navigator>
  );

  const TestingCentersStack = () => (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={globalScreenOptions}
    >
      <Stack.Screen
        name="TestingCenters"
        options={{ title: "Testing Centers" }}
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
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Live Tracker" component={TrackerStack} />
          <Tab.Screen name="Testing" component={TestingCentersStack} />
          <Tab.Screen name="About" component={AboutStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}
