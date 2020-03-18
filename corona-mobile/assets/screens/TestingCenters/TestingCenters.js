import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button, ActivityIndicator, Linking } from "react-native";

import { getLocationAsync } from "../../Utils";
import { ScrollView } from "react-native-gesture-handler";

import { InfoView } from './../../components/InfoView';
import { ActionButton } from './../../components/Buttons';
import { styles, defaults } from "../../styles/styles";
import { useNavigation } from '@react-navigation/native';


const contactLoading = 
<View style={{height: 100, justifyContent: 'center'}}>
  <ActivityIndicator size='small'/>
</View>;

const contactNotFound = 
<View>
  <Text style={styles.boldPrimary}>We're currently unable to identify your location</Text>
  <Text style={{color: defaults.primarycolor}}>- Contact your health provider or a nearby urgent care center</Text>
  <Text style={{color: defaults.primarycolor}}>- Use a telemedicine service - Teladoc</Text>
  <Text style={{color: defaults.primarycolor}}>- Call 9-1-1 if a medical emergency</Text>
  <Text style={{color: defaults.primarycolor}}>- Contact state/county health department (211 if no number is listed)</Text>  
  <Text style={styles.boldPrimary}>Please enable location services to find state contact information</Text>
</View>;



const call = (tel)=>{Linking.openURL('tel:' + tel)};

function ContactInfo(location){

  const navigation = useNavigation();

  return(
    <View>
      <View style={styles.containerFull}>

        <View style={styles.containerRowCenter}>
          <Text style={styles.boldPrimary}>Your current location: </Text>
          <Text style={{color: defaults.primarycolor}}>{location.location["State"]}</Text>
        </View>

        <View style={styles.containerRowCenter}>
          <Text style={styles.boldPrimary}>Contact: </Text>
          <Text style={{color: defaults.primarycolor}}>{location.location["State Department"]}</Text>
        </View>

        <View style={styles.containerRowCenter}>
          <ActionButton title='Call Department' action={() => {call(location.location["Phone Number"])}}/>

          <ActionButton title='Visit Website' action={() => {navigation.navigate("CenterFinder", {url: location.location["URL"]});}}/>
        </View>
      </View>
    </View>
  );
}



export default class TestingCenters extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      location: {},
      contact: contactLoading
    }
  }

  componentDidMount(){
    const locResp = getLocationAsync().then(locResp => {

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
          const contact = <ContactInfo location={this.state.location}/>
          this.setState({contact: contact});
          console.log(this.state.location);
        })
        .catch(error => {
          this.setState({contact: contactNotFound})
          console.error(error);
        });
    });
  }

  render(){
    return(
      <ScrollView>
        <InfoView title='Step 1' body={<Text>this is a test</Text>} chevron={true}/>
        <InfoView title='Contact Information' body={this.state.contact} chevron={false}/>
        <InfoView title='Step 2' body={<Text>this is a test</Text>} chevron={true}/>
        <InfoView title='Step 3' body={<Text>this is a test</Text>} chevron={true}/>
        <InfoView title='Step 4' body={<Text>this is a test</Text>} chevron={true}/>
        <InfoView title='Information Sources' body={<Text>this is a test</Text>} chevron={true}/>
      </ScrollView>
    );
    
  }
}


