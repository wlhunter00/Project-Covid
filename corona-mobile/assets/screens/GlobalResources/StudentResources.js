import React from "react";
import { AccordionList } from "accordion-collapse-react-native";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Button
} from "react-native";

import image1 from "./../../images/studentResources/image1.jpg";
import image2 from "./../../images/studentResources/image2.jpg";

import Modal from "react-native-modal";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView
} from "react-native-gesture-handler";

import { ModalImage } from "./../../components/ModalImage";
import { defaults } from "../../styles/styles";

export default class StudentResources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          image: image1,
          title: "Stress Managment",
          body: [
            "-  Discount with OurBus- LEAVINGCAMPUS - This code takes 10% off the price of the bus ticket, up to $5 through March 31, 2020",
            "\n-  Check your college website for resources. Most of them have different grants for travel if you need to go back home",
            "\n-  FREE WIFI: Spectrum is offering free access to Spectrum Broadband and WiFi for 60 days for new K-12and College Student Households. Enroll by calling 1-844-488-8395",
            "\n-  U Haul is offering free storage services for 30 days. Along with them, collegeboxes is also providing other free move out resources",
            "\n-  The Student Relief Fund is working to provide resources and funding to students. Visit their website for more information",
            "\n-  Numerous local businesses are providing resources to deal with the coronavirus. This includes free or discounted meals. Make sure to check with businesses to see whether they are providing any options. If they are not, consider asking them to do so"
          ],
          id: "1"
        },
        {
          image: image2,
          title: "Organizations and Resources",
          body: [
            "Resources:",
            "-  Code Academy is offering free access to its premium training platform",
            "\n-  Dial 211 is a great resource for if you need assistance finding food, paying housing bills, or other essential services",
            "\n-  The American Bankers Association compiled resources for each bank regarding the virus",
            "\n-  Zoom is offering schools video conferencing tools for free",
            "\n",
            "\nU.S. Centers for Disease Control and Prevention",
            "\nNational Institutes of Health",
            "\nWorld Health Organization (WHO)",
            "\nU.S. Department of State",
            "\nEuropean Centre for Disease Prevention and Control (ECDC)"
          ],
          id: "2"
        }
      ]
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: defaults.backgroundcolor }
        ]}
      >
        <ScrollView>
          {this.state.list.map(item => {
            return <ModalImage item={item} key={item.id} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 5,
    paddingTop: 10,
    height: "100%"
  },
  header: {
    padding: 5,
    marginBottom: 5,
    borderRadius: 50,
    borderBottomRightRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    padding: 10,
    backgroundColor: "#b8dedd",
    borderRadius: 10,
    marginBottom: 10
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    position: "relative",
    left: 9,
    textShadowColor: "black",
    textShadowRadius: 2
  },
  headerImage: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    overflow: "hidden",
    resizeMode: "cover",
    borderRadius: 15
  }
});
