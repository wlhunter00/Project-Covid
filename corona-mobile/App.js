import React from "react";
import { StatusBar } from "react-native";
import { AppearanceProvider } from "react-native-appearance";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enableScreens } from 'react-native-screens';

import { useStyle } from "./assets/styles/styles";

import HomeScreen from "./assets/screens/HomeScreen";
import LatestNews from "./assets/screens/LatestNews/LatestNews";
import TestingCenters from "./assets/screens/TestingCenters/TestingCenters";
import GlobalResourcesMain from "./assets/screens/GlobalResources/GlobalResourcesMain";
import TrackerStatus from "./assets/screens/LiveTracker/TrackerStatus";
import ResourceTopic from "./assets/screens/GlobalResources/ResourceTopic";
import ResourcePage from "./assets/screens/GlobalResources/ResourcePage";

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

const HomeNativeStack = createNativeStackNavigator();
const ResourceTopicStack = createNativeStackNavigator();
const HomeRootStack = createNativeStackNavigator();
const AboutNativeStack = createNativeStackNavigator();
const TestingCentersStack = createNativeStackNavigator();
const TrackerStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AppRootStack = createNativeStackNavigator();

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
    headerTitleStyle: { color: colors.textcolor },
    headerLargeTitleStyle: {
      backgroundColor: colors.backgroundcolor
    },
    headerLargeTitleHideShadow: true,
  };

  const HomeNativeStackScreen = () => (
    <HomeNativeStack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation, route }) => globalNativeStackScreenOptions}
    >
      <HomeNativeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <HomeNativeStack.Screen
        name="LatestNews"
        component={LatestNews}
        options={{title: "Latest News"}}
      />
      <HomeNativeStack.Screen
        name="GlobalResources"
        options={{ title: "Global Resources" }}
        component={GlobalResourcesMain}
      />
      <HomeNativeStack.Screen
        name="ResourcePage"
        options={({route})=>({title: route.params.title})}
        component={ResourcePage}
      />
      <HomeNativeStack.Screen
        name="Sources"
        component={Sources}
      />
      <HomeNativeStack.Screen
        name="Symptoms"
        component={SymptomsList}
      />
    </HomeNativeStack.Navigator>
  );

  const ResourceTopicStackScreen = () => (
    <ResourceTopicStack.Navigator screenOptions={globalScreenOptions}>
      <ResourceTopicStack.Screen name="ResourceTopic" component={ResourceTopic} options={{headerShown: false}}/>
      <ResourceTopicStack.Screen name="WebView" component={WebViewScreen} />
    </ResourceTopicStack.Navigator>
  )

  const HomeRootStackScreen = () => (
    <HomeRootStack.Navigator screenOptions={() => ({headerShown: false, stackPresentation: "modal"})}>
      <HomeRootStack.Screen name="Main" component={HomeNativeStackScreen}/>
      <HomeRootStack.Screen name="ResourceTopic" component={ResourceTopicStackScreen}/>
    </HomeRootStack.Navigator>
  );

  const TrackerStackScreen = () => (
    <TrackerStack.Navigator
      initialRouteName="Home"
      screenOptions={globalScreenOptions}
    >
      <TrackerStack.Screen
        name="LiveTracker"
        component={TrackerStatus}
        options={{ title: "Live Tracker" }}
      />
    </TrackerStack.Navigator>
  );

  const AboutStackScreen = () => (
    <AboutNativeStack.Navigator
      initialRouteName="About"
      screenOptions={globalNativeStackScreenOptions}
    >
      <AboutNativeStack.Screen
        name="About"
        component={AboutScreen}
      />
      <AboutNativeStack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ 
          title: "Contact Us",
         }}
      />
      <AboutNativeStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ 
          title: "Privacy Policy",
         }}
      />
      <AboutNativeStack.Screen
        name="Team"
        component={Team}
      />
      <AboutNativeStack.Screen
        name="AboutLFR"
        component={AboutLFR}
        options={{ 
          title: "About LFR",
         }}
      />
      <AboutNativeStack.Screen name="Faq"
        component={Faq}
        options={{ 
          title: "FAQ",
         }} />
    </AboutNativeStack.Navigator>
  );

  const TestingCentersStackScreen = () => (
    <TestingCentersStack.Navigator
      initialRouteName="Home"
      screenOptions={globalNativeStackScreenOptions}
    >
      <TestingCentersStack.Screen
        name="TestingCenters"
        options={{ 
          title: "Testing Centers",
         }}
        component={TestingCenters}
      />
    </TestingCentersStack.Navigator>
  );

  const AppTabsScreen = () => (
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
      <Tab.Screen name="Home" component={HomeRootStackScreen} />
      <Tab.Screen name="Live Tracker" component={TrackerStackScreen} />
      <Tab.Screen name="Testing" component={TestingCentersStackScreen} />
      <Tab.Screen name="About" component={AboutStackScreen} />
    </Tab.Navigator>
  );

  return (
    <AppearanceProvider>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <NavigationContainer>
        <AppRootStack.Navigator screenOptions={{ headerShown: false }}>
          <AppRootStack.Screen name="Tabs" component={AppTabsScreen} />
          <AppRootStack.Screen name="WebView" component={WebViewScreen} options={{
            headerShown: true,
            headerLargeTitle: false,
            headerStyle: { backgroundColor: colors.primarycolor },
            headerTintColor: "white",
            headerTitleStyle: { color: "white" }
          }} />
        </AppRootStack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}
