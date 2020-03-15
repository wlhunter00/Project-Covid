import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class GlobalResourcesMain extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Global Resources</Text>

        <Button
          title="Informational Toolkit"
          onPress={() => this.props.navigation.navigate("InformationalToolkit")}
        />

        <Button
          title="Preventative Practices"
          onPress={() =>
            this.props.navigation.navigate("PreventativePractices")
          }
        />

        <Button
          title="Myth Busting"
          onPress={() => this.props.navigation.navigate("MythBusting")}
        />

        <Button
          title="How to Help"
          onPress={() => this.props.navigation.navigate("HowToHelp")}
        />

        <Button
          title="Student Resources"
          onPress={() => this.props.navigation.navigate("StudentResources")}
        />

        <Button
          title="Crisis Contact Information"
          onPress={() => this.props.navigation.navigate("CrisisContact")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
