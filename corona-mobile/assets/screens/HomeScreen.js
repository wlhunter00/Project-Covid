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
import { Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useStyle } from "../styles/styles";
import { PageButton, SimpleButton, EmbeddedPageButton } from "../components/Buttons";
import { StandardText } from "../components/Texts";

function Section({ title, children, titleRight }) {
  const { styles } = useStyle("homeScreenSection", "shadow");
  return (
    <View style={[styles.homeScreenSection, styles.shadow]}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <StandardText fontSize="subtitle" isBold >{title}</StandardText>
        <View style={{flex: 1}}/>
        {titleRight}
      </View>
      {children}
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const { styles, colors } = useStyle("container", "appTitle", "subtitle", "divider");

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingHorizontal: 15 }}>
      <View style={{ marginBottom: 20 }}>
        <StandardText fontSize="title" isBold style={{
          marginTop: 60,
          marginBottom: 10
        }}>
          Project<Text style={{ fontWeight: "normal" }}>Covid</Text>
        </StandardText>
        <StandardText>
          Live tracking and resources to help you get through the pandemic.
      </StandardText>
      </View>

      <Section title="Live Statistics">
        <View style={{ height: 200 }} />
      </Section>
      <Section title="Latest News" titleRight={
        <SimpleButton title="More news" action={() => { navigation.navigate("LatestNews") }} hasChevron/>
      }>
        <View style={{ height: 200 }} />
      </Section>
      <Section title="Global Resources" titleRight={
        <SimpleButton title="View more" action={() => { navigation.navigate("GlobalResources") }} hasChevron/>
      } >
        
        <EmbeddedPageButton
          title="Informational Toolkit"
          navigationName="InformationalToolkit"
          icon={
            <MaterialCommunityIcons
              name="toolbox"
              size={25}
              color={colors.textcolor}
            />
          }
          description="All you need to know about COVID-19"
          navigation={navigation}
        />
        <View style={styles.divider}/>
        <EmbeddedPageButton
          title="Symptoms"
          navigationName="Symptoms"
          icon={
            <FontAwesome name="stethoscope" size={25} color={colors.textcolor} />
          }
          description="Learn about the symptoms of the virus."
          navigation={navigation}
        />
        <View style={styles.divider} />
        <EmbeddedPageButton
        title="Preventative Practices"
        navigationName="PreventativePractices"
        icon={
          <MaterialIcons name="healing" size={25} color={colors.textcolor} />
        }
        description="Tips for to stay healthy"
        navigation={navigation}
      />
      </Section>

      <PageButton
        title="Live Twitter Feed"
        navigationName="TwitterFeed"
        icon={<Entypo name="twitter" size={25} color={colors.textcolor} />}
        description="View a curated feed from reliable sources."
        navigation={navigation}
      />

      <PageButton
        title="Sources"
        navigationName="Sources"
        icon={<FontAwesome name="book" size={25} color={colors.textcolor} />}
        description="Learn where this information comes from."
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
