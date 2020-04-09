import React from "react";
import { AccordionList } from "accordion-collapse-react-native";
import { View, ScrollView, Text } from "react-native";

import image1 from "./../../images/studentResources/image1.jpg";
import image2 from "./../../images/studentResources/image2.jpg";

import ModalImage from "./../../components/ModalImage";
import BigHeaderScrollView from "../../components/BigHeaderScrollView.js";
import { MaterialIcons } from "@expo/vector-icons";
import { useStyle } from "../../styles/styles";
import { ImageButton } from "../../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { InfoView } from "./../../components/InfoView";



export default function StyledStudentResources() {
  const { styles, colors, isDark } = useStyle("container", "resourceText");
  const navigation = useNavigation();
  return <StudentResources styles={styles} colors={colors} isDark={isDark} navigation={navigation} />;
}

class StudentResources extends React.Component {
  constructor(props) {
    super(props);
    const { isDark } = this.props;
    this.state = {
      list: [
        {
          image: image1,
          title: (<Text style={{ color: !isDark ? 'black' : 'white' }}>Stress Management</Text>),
          body: (
            <InfoView
                title={<Text>Discount with OurBus</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Discount with OurBus- LEAVINGCAMPUS - This code takes 10% off the price of the bus ticket, up to $5 through March 31, 2020
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      Check your college website for resources. Most of them have different grants for travel if you need to go back home
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      FREE WIFI: Spectrum is offering free access to Spectrum Broadband and WiFi for 60 days for new K-12and College Student Households. Enroll by calling 1-844-488-8395
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      U Haul is offering free storage services for 30 days. Along with them, collegeboxes is also providing other free move out resources
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      The Student Relief Fund is working to provide resources and funding to students. Visit their website for more information
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      Numerous local businesses are providing resources to deal with the coronavirus. This includes free or discounted meals. Make sure to check with businesses to see whether they are providing any options. If they are not, consider asking them to do so
                    </Text>
                  </View>
                }
              />
          ),
          id: "1"
        },
        {
          image: image2,
          title: (<Text style={{ color: !isDark ? 'black' : 'white' }}>Helpful Organizations</Text>),
          body: (
            <InfoView
                title={<Text>Resources</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Code Academy is offering free access to its premium training platform
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      Dial 211 is a great resource for if you need assistance finding food, paying housing bills, or other essential services
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      The American Bankers Association compiled resources for each bank regarding the virus
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      Zoom is offering schools video conferencing tools for free
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      U.S. Centers for Disease Control and Prevention
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      National Institutes of Health
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      World Health Organization (WHO)
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      U.S. Department of State
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      European Centre for Disease Prevention and Control (ECDC)
                    </Text>
                  </View>
                }
              />
          ),
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
    const { styles, colors, isDark } = this.props;
    return (
      <View style={styles.container}>
        <BigHeaderScrollView title="Student Resources" description="Helpful information pertinent to students." image={
          <MaterialIcons
            name="school"
            size={100}
            color={!isDark ? colors.textcolor : "#444"}
          />
        }>
          {this.state.list.map(item => {
            return <ImageButton 
              title={item.title} 
              source={item.image}
              body={item.body}
              navigation={this.props.navigation}
            />;
          })}
        </BigHeaderScrollView>
      </View>
    );
  }
}
