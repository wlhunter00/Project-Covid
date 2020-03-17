import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from "react-native";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { styles } from "../styles/styles";
import { PageButton } from "../Components/Buttons";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <PageButton
        title="Latest News"
        navigationName="LatestNews"
        icon={<Entypo name="news" size={25} />}
        description="Read updates from reliable news sites."
        navigation={navigation}
      />
      <PageButton
        title="Global Resources"
        navigationName="GlobalResources"
        icon={<Entypo name="globe" size={25} />}
        description="Get info straight from the experts."
        navigation={navigation}
      />
      <PageButton
        title="Live Twitter Feed"
        navigationName="TwitterFeed"
        icon={<Entypo name="twitter" size={25} />}
        description="View a curated feed from reliable sources."
        navigation={navigation}
      />
    </ScrollView>
  );
}

// Travel Info page commented out until we can actually get that information
// <PageButton
//   title="Travel Information"
//   navigationName="TravelInformation"
//   icon={<Entypo name="aircraft" size={25} />}
//   description="Check travel status before you travel."
//   navigation={navigation}
// />
