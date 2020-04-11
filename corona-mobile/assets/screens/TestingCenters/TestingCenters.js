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
import { FontAwesome } from "@expo/vector-icons";

import { getLocationAsync } from "../../utils/LocationAPI";
import { ScrollView } from "react-native-gesture-handler";
import BigHeaderScrollView from "../../components/BigHeaderScrollView.js";

import { InfoView } from "./../../components/InfoView";
import { ActionButton } from "./../../components/Buttons";
import { useStyle } from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
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
        <View style={{ flex: 1, justifyContent: "center" }}>
          {location.location.hasOwnProperty("Crisis Phone Number") && (
            <ActionButton
              title="Call"
              action={() => {
                call(location.location["Crisis Phone Number"]);
              }}
              style={{ marginBottom: 10 }}
            />
          )}

          {location.location.hasOwnProperty("Local Info") && (
            <ActionButton
              title="Crisis Contact"
              action={() => {
                navigation.navigate("WebView", {
                  url: location.location["Local Info"],
                  title: "Center Info"
                });
              }}
              style={{ marginBottom: 10 }}
            />
          )}

          <ActionButton
            title="Visit Website"
            action={() => {
              navigation.navigate("WebView", {
                url: location.location["URL"],
                title: "Center Website"
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
          title: "CDC",
          headline: "Testing in U.S",
          key: "Testing in U.S",
          url:
            "https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/testing-in-us.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Ftesting-in-us.html"
        },
        {
          title: "Bloomberg",
          headline:
            "Coronavirus Tests From LabCorp, Quest Will Cost $50 to $100",
          key: "Coronavirus Tests From LabCorp, Quest Will Cost $50 to $100",
          url:
            "https://www.bloomberg.com/news/articles/2020-03-15/coronavirus-tests-from-labcorp-quest-will-cost-50-to-100"
        },
        {
          title: "NBC News",
          headline:
            "What to do if you are concerned you have COVID-19, according to state health departments",
          key:
            "What to do if you are concerned you have COVID-19, according to state health departments",
          url:
            "https://www.nbcnews.com/health/health-news/coronavirus-testing-information-covid-19-tests-according-state-health-departments-n1158041"
        },
        {
          title: "NPR",
          key:
            "Seattle Health Care System Offers Drive-Through Coronavirus Testing For Workers",
          headline:
            "Seattle Health Care System Offers Drive-Through Coronavirus Testing For Workers",
          url:
            "https://www.npr.org/sections/health-shots/2020/03/08/813501632/seattle-health-care-system-offers-drive-through-coronavirus-testing-for-workers"
        }
      ]}
      key={"sourceList"}
    />
  );
}

function ContactNotFound() {
  const { styles } = useStyle("bioText", "positionText", "container");

  return (
    <View>
      <Text style={[styles.positionText, { paddingBottom: 10, paddingTop: 0 }]}>
        We're currently unable to identify your location
      </Text>

      <Text style={[styles.bioText, { paddingBottom: 10 }]}>
        • Contact your health provider or a nearby urgent care center
      </Text>

      <Text style={[styles.bioText, { paddingBottom: 10 }]}>
        • Use a telemedicine service - Teladoc
      </Text>

      <Text style={[styles.bioText, { paddingBottom: 10 }]}>
        • Call 9-1-1 if a medical emergency
      </Text>

      <Text style={[styles.bioText, { paddingBottom: 10 }]}>
        • Contact state/county health department (211 if no number is listed)
      </Text>

      <Text style={[styles.positionText, { paddingBottom: 10 }]}>
        Please enable location services to find state contact information
      </Text>
    </View>
  );
}

export default function StyledTestingCenters() {
  const { styles, colors, isDark } = useStyle("bioText", "positionText", "container");
  return <TestingCenters styles={styles} colors={colors} isDark={isDark} />;
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
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          const contactNotFound = <ContactNotFound />;
          this.setState({ contact: contactNotFound });
        })
        .then(responseJson => {
          if (responseJson === undefined) {
            return;
          }

          if (responseJson.hasOwnProperty("message")) {
            this.setState({ isLoaded: true, contact: <ContactNotFound /> });
          } else {
            this.setState({ isLoaded: true, location: responseJson });
            const contact = <ContactInfo location={this.state.location} />;
            this.setState({ contact: contact });
          }
        })
        .catch(error => {
          const contactNotFound = <ContactNotFound />;
          this.setState({ contact: contactNotFound });
        });
    });
  }

  render() {
    const { styles, colors, isDark } = this.props;
    return (
      <View contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 7,
        backgroundColor: colors.backgroundcolor
      }}
        style={styles.container}>
      <BigHeaderScrollView title="Testing Centers" description="Everything you need to know about testing and centers near you." image={
        <FontAwesome
          name="building"
          size={100}
          color={!isDark ? colors.textcolor : "#444"}
        />
        }
        numLines={1}>
        <InfoView
          title="Step 1"
          body={
            <Text style={styles.bioText}>
              To be tested, you must be approved by your primary care provider
              (PCP) or other medical professional/facility (urgent care,
              telehealth application (Teladoc), hospital, health department) to
              meet state criteria based on symptoms or exposure to a confirmed
              case.
            </Text>
          }
        />
        <InfoView title="Contact Information" body={this.state.contact} />
        <InfoView
          title="Step 2"
          body={
            <Text style={styles.bioText}>
              The test procedure involves taking a swab of the patient's nose.
              Free testing is available in public facilities and price ranges
              from $50 - $100 for commercial lab testing if you don't meet state
              criteria or want an expedited process.
            </Text>
          }
        />
        <InfoView
          title="Step 3"
          body={
            <Text style={styles.bioText}>
              Samples are sent to labs for analysis. Timing to get results back
              range from 5 to 48 hours, with an average of 24 hours.
            </Text>
          }
        />
          <LocalSourceObject />
        </BigHeaderScrollView>
      </View>
    );
  }
}
