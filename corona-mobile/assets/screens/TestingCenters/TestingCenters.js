import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Linking
} from "react-native";

import { getLocationAsync } from "../../Utils";
import { ScrollView } from "react-native-gesture-handler";

import { InfoView } from "./../../components/InfoView";
import { ActionButton } from "./../../components/Buttons";
import { styles, defaults, boxStyles } from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { PrimaryText, PrimaryTextBold } from "./../../components/Texts";

const contactLoading = (
  <View style={{ height: 100, justifyContent: "center" }}>
    <ActivityIndicator size="small" />
  </View>
);

const contactNotFound = (
  <View>
    <Text
      style={[
        boxStyles.position,
        { paddingBottom: 10, paddingTop: 0 }
      ]}
    >
      We're currently unable to identify your location
    </Text>

    <Text style={[boxStyles.bio, { paddingBottom: 10 }]}>
      - Contact your health provider or a nearby urgent care center
    </Text>

    <Text style={[boxStyles.bio, { paddingBottom: 10 }]}>
      - Use a telemedicine service - Teladoc
    </Text>

    <Text style={[boxStyles.bio, { paddingBottom: 10 }]}>
      - Call 9-1-1 if a medical emergency
    </Text>

    <Text style={[boxStyles.bio, { paddingBottom: 10 }]}>
      - Contact state/county health department (211 if no number is listed)
    </Text>

    <Text style={[boxStyles.position, { paddingBottom: 10 }]}>
      Please enable location services to find state contact information
    </Text>
  </View>
);

const call = tel => {
  Linking.openURL("tel:" + tel);
};

function ContactInfo(location) {
  const navigation = useNavigation();

  return (
    <View>
      <View>
        <View style={{ paddingBottom: 10 }}>
          <Text style={boxStyles.bio}>
            <Text style={boxStyles.position}>Your current location: </Text>
            <Text>{location.location["State"]}</Text>
          </Text>
        </View>

        <View style={{ paddingBottom: 10 }}>
          <Text style={boxStyles.bio}>
            <Text style={boxStyles.position}>Contact: </Text>
            <Text>{location.location["State Department"]}</Text>
          </Text>
        </View>

        <View style={styles.containerRowCenter}>
          
          {location.location.hasOwnProperty("Phone Number")
          ? <ActionButton
            title="Call"
            action={() => {
              call(location.location["Phone Number"]);
            }}
          />
          : <View/>
          }

          <ActionButton
            title="Visit Website"
            action={() => {
              navigation.navigate("CenterFinder", {
                url: location.location["URL"]
              });
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default class TestingCenters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      location: {},
      contact: contactLoading
    };
  }

  componentDidMount() {
    const locResp = getLocationAsync().then(locResp => {
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
          console.log(responseJson);

          if (responseJson.hasOwnProperty("message")) {
            console.log("err");
            this.setState({ isLoaded: true, contact: contactNotFound });
          } else {
            this.setState({ isLoaded: true, location: responseJson });
            const contact = <ContactInfo location={this.state.location} />;
            this.setState({ contact: contact });
          }

          console.log(this.state.location);
        })
        .catch(error => {
          this.setState({ contact: contactNotFound });
          console.error(error);
        });
    });
  }

  render() {
    return (
      <View style={{backgroundColor: defaults.backgroundcolor}}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 15, paddingTop: 15, backgroundColor: defaults.backgroundcolor}}>
          <InfoView
            title="Step 1"
            body={
              <Text style={boxStyles.bio}>
                If you're feeling sick and exhibit symptoms of COVID-19, you should contact your primary healthcare provider if possible, else use a telemedicine app (Teladoc), or contact the health deparment based on your state.
              </Text>
            }
          />
          <InfoView
            title="Contact Information"
            body={this.state.contact}
          />
          <InfoView
            title="Step 2"
            body={
              <Text style={boxStyles.bio}>
                  To be tested, you must be apporved by your healthcare provider or health department according to state criteria based on symptoms or if you've had exposure to an infected individual.
              </Text>
            }
          />
          <InfoView
            title="Step 3"
            body={
              <Text style={boxStyles.bio}>
                  The test procedure involves taking a swab of the patient's nose. Free testing is available in public facilities and price ranges from $50 - $100 for commercial lab testing if you don't meet state criteria or want an expedited process.
              </Text>
            }
          />
          <InfoView
            title="Step 4"
            body={
              <Text style={boxStyles.bio}>
                Samples are sent to labs for analysis. Timing to get results back range from 5 to 48 hours, with an average of 24 hours.
              </Text>
            }
          />
          <InfoView
            title="Information Sources"
            body={<Text style={boxStyles.bio}>--All links from research--</Text>}
          />
        </ScrollView>
      </View>
    );
  }
}
