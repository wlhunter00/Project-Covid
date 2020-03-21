import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { PageButton } from "./../../components/Buttons";
import { styles } from "./../../styles/styles";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export default class GlobalResourcesMain extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <PageButton
          title="Informational Toolkit"
          navigationName="InformationalToolkit"
          icon={<MaterialCommunityIcons name="toolbox" size={25} />}
          description="All you need to know about COVID-19"
          navigation={this.props.navigation}
        />

        <PageButton
          title="Preventative Practices"
          navigationName="PreventativePractices"
          icon={<MaterialIcons name="healing" size={25} />}
          description="Tips for to stay healthy"
          navigation={this.props.navigation}
        />
        <PageButton
          title="Student Resources"
          navigationName="StudentResources"
          icon={<MaterialIcons name="school" size={25} />}
          description="Helpful information for students"
          navigation={this.props.navigation}
        />

        <PageButton
          title="Mental Health"
          navigationName="MentalHealth"
          icon={<FontAwesome name="heart" size={25} />}
          description="Information for a healthy mindset"
          navigation={this.props.navigation}
        />
      </ScrollView>
    );
  }
}
