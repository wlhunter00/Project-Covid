import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './assets/screens/HomeScreen';

import LatestNews from './assets/screens/LatestNews/LatestNews';
import NewsScreen from './assets/screens/LatestNews/NewsScreen';

import LiveTracker from './assets/screens/LiveTracker/LiveTracker';

import SymptomCheck from './assets/screens/SymptomCheck/SymptomCheck';
import Diagnosis from './assets/screens/SymptomCheck/Diagnosis';

import TestingCenters from './assets/screens/TestingCenters/TestingCenters';
import CenterFinder from './assets/screens/TestingCenters/CenterFinder';

import TravelInformation from './assets/screens/TravelInformation/TravelInformation';
import TravelStatus from './assets/screens/TravelInformation/TravelStatus';

import GlobalResources from './assets/screens/GlobalResources/GlobalResources';
import TrackerStatus from './assets/screens/LiveTracker/TrackerStatus';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="LatestNews" component={LatestNews} />
        <Stack.Screen name="NewsScreen" component={NewsScreen} />

        <Stack.Screen name="GlobalResources" component={GlobalResources} />

        <Stack.Screen name="SymptomCheck" component={SymptomCheck} />
        <Stack.Screen name="Diagnosis" component={Diagnosis} />

        <Stack.Screen name="TestingCenters" component={TestingCenters} />
        <Stack.Screen name="CenterFinder" component={CenterFinder} />

        <Stack.Screen name="TravelInformation" component={TravelInformation} />
        <Stack.Screen name="TravelStatus" component={TravelStatus} />

        <Stack.Screen name="LiveTracker" component={LiveTracker} />
        <Stack.Screen name="TrackerStatus" component={TrackerStatus} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
