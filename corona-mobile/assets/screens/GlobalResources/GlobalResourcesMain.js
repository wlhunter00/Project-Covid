import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { PageButton } from './../../components/Buttons';
import { styles } from "./../../styles/styles";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export default class GlobalResourcesMain extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>

        <PageButton
          title="Informational Toolkit"
          navigationName="InformationalToolkit"
          icon={<Entypo name="news" size={25} />}
          description=""
          navigation={this.props.navigation}
        />  

        <PageButton
          title="Preventative Practices"
          navigationName="PreventativePractices"
          icon={<Entypo name="news" size={25} />}
          description=""
          navigation={this.props.navigation}
        /> 

        <PageButton
          title="Myth Busting"
          navigationName="MythBusting"
          icon={<Entypo name="news" size={25} />}
          description=""
          navigation={this.props.navigation}
        /> 

        <PageButton
          title="How to Help"
          navigationName="HowToHelp"
          icon={<Entypo name="news" size={25} />}
          description=""
          navigation={this.props.navigation}
        /> 

        <PageButton
          title="Student Resources"
          navigationName="StudentResources"
          icon={<Entypo name="news" size={25} />}
          description=""
          navigation={this.props.navigation}
        /> 

        <PageButton
          title="Crisis Contact"
          navigationName="CrisisContact"
          icon={<Entypo name="news" size={25} />}
          description=""
          navigation={this.props.navigation}
        /> 
      </ScrollView>
    );
  }
}

