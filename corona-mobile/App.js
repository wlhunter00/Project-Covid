import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { AppearanceProvider } from 'react-native-appearance';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackActions } from "@react-navigation/native";

import { useStyle } from "./assets/styles/styles";

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
import MentalHealth from "./assets/screens/GlobalResources/MentalHealth";
import StudentResources from "./assets/screens/GlobalResources/StudentResources";
import TrackerStatus from "./assets/screens/LiveTracker/TrackerStatus";
import TwitterFeed from "./assets/screens/TwitterFeed.js";

import Team from "./assets/screens/footerPages/Team.js";
import Faq from "./assets/screens/footerPages/Faq.js";
import Sources from "./assets/screens/footerPages/Sources.js";
import ContactUs from "./assets/screens/footerPages/ContactUs.js";
import ViewSource from "./assets/screens/ViewSource.js";

import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const { style, colors, isDark } = useStyle();
  console.log(colors);
  const globalScreenOptions = {
    headerStyle: {
      backgroundColor: colors.primarycolor
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
      headerBackTitle: "Back",
      ...globalScreenOptions
    })}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "Project Covid"
      }}
    />
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
      name="MentalHealth"
      component={MentalHealth}
      options={{ title: "Mental Health" }}
    />
    <Stack.Screen
      name="StudentResources"
      component={StudentResources}
      options={{ title: "Student Resources" }}
    />
    <Stack.Screen
      name="TwitterFeed"
      component={TwitterFeed}
      options={{ title: "Curated Tweets" }}
    />
    <Stack.Screen
      name="Team"
      component={Team}
      options={{ title: "Created By" }}
    />
    <Stack.Screen name="Faq" component={Faq} options={{ title: "FAQ" }} />
    <Stack.Screen
      name="Sources"
      component={Sources}
      options={{ title: "Sources" }}
    />
    <Stack.Screen
      name="ViewSource"
      component={ViewSource}
      options={{ title: "View the Source" }}
    />
    <Stack.Screen
      name="ContactUs"
      component={ContactUs}
      options={{ title: "Contact Us" }}
    />
  </Stack.Navigator>
);
  
  const TrackerStack = () => (
  <Stack.Navigator
    initialRouteName="LiveTracker"
    screenOptions={globalScreenOptions}
  >
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
      name="ViewSource"
      options={{ title: "View Source" }}
      component={ViewSource}
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
    <Stack.Screen
      name="ViewSource"
      options={{ title: "View Source" }}
      component={ViewSource}
    />
  </Stack.Navigator>
);

  return (
    <AppearanceProvider>
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
                Symptoms: (
                  <FontAwesome name="stethoscope" size={size} color={color} />
                ),
                Testing: <FontAwesome name="building" size={size} color={color} />
              }[route.name])
          })}
          tabBarOptions={{
            activeTintColor: colors.primarycolor,
            style: [{
              paddingVertical: 5,
              backgroundColor: colors.secondarybackgroundcolor,
            }, isDark ? { borderTopWidth: 0 } : {}]
          }}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Live Tracker" component={TrackerStack} />
          <Tab.Screen name="Symptoms" component={SymptomStack} />
          <Tab.Screen name="Testing" component={TestingCentersStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}
