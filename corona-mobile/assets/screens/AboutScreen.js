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
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useStyle } from "../styles/styles";
import { PageButton } from "../components/Buttons";

export default function AboutScreen({ navigation }) {
  const { styles, colors } = useStyle("container");

  return (
    <ScrollView style={styles.container}>
      <PageButton
        title="About LFR"
        navigationName="AboutLFR"
        icon={
          <FontAwesome name="heartbeat" size={25} color={colors.textcolor} />
        }
        description="Learn about LFR International."
        navigation={navigation}
      />
      <PageButton
        title="Frequently Asked Questions"
        navigationName="Faq"
        icon={
          <FontAwesome
            name="question"
            size={25}
            style={{ marginRight: 9 }}
            color={colors.textcolor}
          />
        }
        description="Find answers to questions about the app."
        navigation={navigation}
      />
      <PageButton
        title="Meet the Team"
        navigationName="Team"
        icon={
          <MaterialIcons name="people" size={25} color={colors.textcolor} />
        }
        description="See who created this app."
        navigation={navigation}
      />
      <PageButton
        title="Contact Us"
        navigationName="ContactUs"
        icon={<Entypo name="mail" size={25} color={colors.textcolor} />}
        description="Get in touch with us."
        navigation={navigation}
      />
      <PageButton
        title="Privacy Policy"
        navigationName="PrivacyPolicy"
        icon={<Entypo name="lock" size={25} color={colors.textcolor} />}
        description="Read our privacy policy and terms."
        navigation={navigation}
      />
    </ScrollView>
  );
}
