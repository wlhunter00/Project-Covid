import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";

import { getLocationAsync } from "../../Utils";

export default class TestingCenters extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      location: {}
    }
  }

  componentDidMount(){
    const locResp = getLocationAsync().then(locResp => {
      // console.log(locResp);
      const lat = locResp.location.coords.latitude;
      const long = locResp.location.coords.longitude;
      console.log(lat, long);
      fetch("https://projectcovid-backend.herokuapp.com/centers/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(locResp)
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({isLoaded: true, location: responseJson})
          console.log(this.state.location);
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  render(){

    if(this.state.isLoaded === false){
      return (
        <View style={styles.container}>
          <ActivityIndicator size='small'/>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {this.props.navigation.push("CenterFinder", {
            state: this.state.location.State,
            department: this.state.location["State Department"],
            tel: this.state.location["Phone Number"],
            url: this.state.location.URL
          })}
        </View>
      );
    }

    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.title}>Testing Centers</Text>
    //     {/* <Button
    //       title="Find Center"
    //       onPress={() => this.props.navigation.push("CenterFinder", {
    //         state: 'Alaska',
    //         department: 'Alaska Department of Health and Social Services',
    //         tel: '0123456789',
    //         url: 'http://dhss.alaska.gov/dph/Epi/id/Pages/COVID-19/general.aspx'
    //       })}
    //     /> */}

    //   </View>
    // );
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
