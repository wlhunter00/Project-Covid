import React from "react";
import { AccordionList } from "accordion-collapse-react-native";
import { View, ScrollView, Text } from "react-native";

import image1 from "./../../images/studentResources/image1.jpg";
import image2 from "./../../images/studentResources/image2.jpg";

import ModalImage from "./../../components/ModalImage";
import { useStyle } from "../../styles/styles";
import { ImageButton } from "../../components/Buttons";
import { useNavigation } from "@react-navigation/native";



export default function StyledStudentResources() {
  const { styles } = useStyle("container");
  const navigation = useNavigation();
  return <StudentResources styles={styles} navigation={navigation} />;
}

class StudentResources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          image: image1,
          title: "Stress Management",
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
          title: "Helpful Organizations",
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
    const { styles } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
          {this.state.list.map(item => {
            return <ImageButton 
              title={item.title} 
              source={item.image}
              body={<Text>{item.body}</Text>}
              navigation={this.props.navigation}
            />;
            // return <ModalImage item={item} key={item.id} />;
          })}
        </ScrollView>
      </View>
    );
  }
}
