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
import { useStyle } from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { PrimaryText, PrimaryTextBold } from "./../../components/Texts";
import { SourceItem } from "../../components/FooterComponents";

const contactLoading = (
  <View style={{ height: 100, justifyContent: "center" }}>
    <ActivityIndicator size="small" />
  </View>
);


const call = tel => {
  Linking.openURL("tel:" + tel);
};

function ContactInfo(location) {
  const { styles } = useStyle("bioText", "positionText", "containerRowCenter");

  const navigation = useNavigation();

  return (
    <View>
      <View>
        <View style={{ paddingBottom: 10 }}>
          <Text style={styles.bioText}>
            <Text style={styles.positionText}>Your current location: </Text>
            <Text>{location.location["State"]}</Text>
          </Text>
        </View>

        <View style={{ paddingBottom: 10 }}>
          <Text style={styles.bioText}>
            <Text style={styles.positionText}>Contact: </Text>
            <Text>{location.location["State Department"]}</Text>
          </Text>
        </View>

        {/* <View style={styles.containerRowCenter}> */}
        <View
          style={{ flex: 1, justifyContent: "center"}}
        >
          {location.location.hasOwnProperty("Crisis Phone Number") && (
            <ActionButton
              title="Call"
              action={() => {
                call(location.location["Crisis Phone Number"]);
              }}
              style={{marginBottom: 10}}
            />
          )}

          {location.location.hasOwnProperty("Local Info") && (
            <ActionButton
              title="Local Info"
              action={() => {
                navigation.navigate("CenterFinder", {
                  url: location.location["Local Info"]
                });
              }}
              style={{marginBottom: 10}}
            />
          )}

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

function LocalSourceObject() {
  const navigation = useNavigation();
  return (
    <SourceItem
      navigation={navigation}
      typeSource={"Information Sources"}
      sourcesList={[
        {
          title: "Bloomberg",
          headline:
            "Coronavirus Tests From LabCorp, Quest Will Cost $50 to $100",
          url:
            "https://www.bloomberg.com/news/articles/2020-03-15/coronavirus-tests-from-labcorp-quest-will-cost-50-to-100"
        },
        {
          title: "NBC News",
          headline:
            "What to do if you are concerned you have COVID-19, according to state health departments",
          url:
            "https://www.nbcnews.com/health/health-news/coronavirus-testing-information-covid-19-tests-according-state-health-departments-n1158041"
        },
        {
          title: "NPR",
          headline:
            "Seattle Health Care System Offers Drive-Through Coronavirus Testing For Workers",
          url:
            "https://www.npr.org/sections/health-shots/2020/03/08/813501632/seattle-health-care-system-offers-drive-through-coronavirus-testing-for-workers"
        },
        {
          title: "CDC",
          headline: "Testing in U.S",
          url:
            "https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/testing-in-us.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Ftesting-in-us.html"
        }
      ]}
      key={"sourceList"}
    />
  );
}

export default function StyledTestingCenters() {
  const { styles, colors } = useStyle("bioText", "positionText");
  return <TestingCenters styles={styles} colors={colors}/>;
}

class TestingCenters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      location: {},
      contact: contactLoading
    };
  }


  contactNotFound = (
    <View>
      <Text style={[this.props.styles.positionText, { paddingBottom: 10, paddingTop: 0 }]}>
        We're currently unable to identify your location
    </Text>

      <Text style={[this.props.styles.bioText, { paddingBottom: 10 }]}>
        - Contact your health provider or a nearby urgent care center
    </Text>

      <Text style={[this.props.styles.bioText, { paddingBottom: 10 }]}>
        - Use a telemedicine service - Teladoc
    </Text>

      <Text style={[this.props.styles.bioText, { paddingBottom: 10 }]}>
        - Call 9-1-1 if a medical emergency
    </Text>

      <Text style={[this.props.styles.bioText, { paddingBottom: 10 }]}>
        - Contact state/county health department (211 if no number is listed)
    </Text>

      <Text style={[this.props.styles.positionText, { paddingBottom: 10 }]}>
        Please enable location services to find state contact information
    </Text>
    </View>
  );

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
    const { styles, colors } = this.props;
    return (
      <View style={{ backgroundColor: colors.backgroundcolor }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 15,
            backgroundColor: colors.backgroundcolor
          }}
        >
          <InfoView
            title="Step 1"
            body={
              <Text style={styles.bioText}>
                If you're feeling sick and exhibit symptoms of COVID-19, you
                should contact your primary healthcare provider if possible,
                else use a telemedicine app (Teladoc), or contact the health
                deparment based on your state.
              </Text>
            }
          />
          <InfoView title="Contact Information" body={this.state.contact} />
          <InfoView
            title="Step 2"
            body={
              <Text style={styles.bioText}>
                To be tested, you must be apporved by your healthcare provider
                or health department according to state criteria based on
                symptoms or if you've had exposure to an infected individual.
              </Text>
            }
          />
          <InfoView
            title="Step 3"
            body={
              <Text style={styles.bioText}>
                The test procedure involves taking a swab of the patient's nose.
                Free testing is available in public facilities and price ranges
                from $50 - $100 for commercial lab testing if you don't meet
                state criteria or want an expedited process.
              </Text>
            }
          />
          <InfoView
            title="Step 4"
            body={
              <Text style={styles.bioText}>
                Samples are sent to labs for analysis. Timing to get results
                back range from 5 to 48 hours, with an average of 24 hours.
              </Text>
            }
          />
          <LocalSourceObject />
        </ScrollView>
      </View>
    );
  }
}
