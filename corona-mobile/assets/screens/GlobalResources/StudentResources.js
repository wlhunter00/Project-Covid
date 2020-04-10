import React from "react";
import { AccordionList } from "accordion-collapse-react-native";
import { View, ScrollView, Text } from "react-native";

import image1 from "./../../images/studentResources/image1.jpg";
import image2 from "./../../images/studentResources/image2.jpg";

import ModalImage from "./../../components/ModalImage";
import BigHeaderScrollView from "../../components/BigHeaderScrollView.js";
import { FontAwesome5 } from "@expo/vector-icons";
import { useStyle } from "../../styles/styles";
import { ImageButton } from "../../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { InfoView } from "./../../components/InfoView";

export default function StyledStudentResources() {
  const { styles, colors, isDark } = useStyle("container", "resourceText");
  const navigation = useNavigation();
  return (
    <StudentResources
      styles={styles}
      colors={colors}
      isDark={isDark}
      navigation={navigation}
    />
  );
}

class StudentResources extends React.Component {
  constructor(props) {
    super(props);
    const { isDark } = this.props;
    this.state = {
      list: [
        {
          image: image2,
          title: (
            <Text style={{ color: !isDark ? "black" : "white" }}>
              Health Organizations
            </Text>
          ),
          body: (
            <View>
              <InfoView
                title={<Text>World Health Organization (WHO)</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      The World Health Organization is a specialized agency of
                      the United Nations responsible for international public
                      health. It is part of the U.N. Sustainable Development
                      Group.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={
                  <Text>
                    U.S. Centers for Disease Control and Prevention (CDC)
                  </Text>
                }
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      The Centers for Disease Control and Prevention is the
                      leading national public health institute of the United
                      States. It is a United States federal agency, under the
                      Department of Health and Human Services
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>National Institutes of Health</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      The National Institutes of Health (NIH), a part of the
                      U.S. Department of Health and Human Services, is the
                      nation’s medical research agency — making important
                      discoveries that improve health and save lives.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>U.S. Department of State</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      The United States Department of State, commonly referred
                      to as the State Department, is a federal executive
                      department responsible for carrying out U.S. foreign
                      policy and international relations
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={
                  <Text>
                    European Centre for Disease Prevention and Control (ECDC)
                  </Text>
                }
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      The European Centre for Disease Prevention and Control is
                      an independent agency of the European Union whose mission
                      is to strengthen Europe's defenses against infectious
                      diseases.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={
                  <Text>
                    African Centers for Disease Control and Prevention
                  </Text>
                }
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Africa CDC strengthens the capacity and capability of
                      Africa’s public health institutions as well as
                      partnerships to detect and respond quickly and effectively
                      to disease threats and outbreaks, based on data-driven
                      interventions and programs.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={
                  <Text>
                    The Communicable Diseases Network Australia (CDNA)
                  </Text>
                }
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      The Communicable Diseases Network Australia will provide
                      national public health coordination and leadership, and
                      support best practices for the prevention and control of
                      communicable diseases.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Indian National Center for Disease Control</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      The Institute takes a leading role in undertaking
                      investigations of disease outbreaks all over the country
                      employing epidemiological and diagnostic tools. It also
                      provides referral diagnostic services to individuals,
                      communities, medical colleges, research institutions, and
                      state health directorates.
                    </Text>
                  </View>
                }
              />
            </View>
          ),
          id: "2"
        },
        {
          image: image1,
          title: (
            <Text style={{ color: !isDark ? "black" : "white" }}>
              Student Resources
            </Text>
          ),
          body: (
            <View>
              <InfoView
                title={<Text>Free WiFi through Spectrum</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Spectrum is offering free access to Spectrum Broadband and
                      WiFi for 60 days for new K-12and College Student
                      Households. Enroll by calling 1-844-488-8395.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Storage Services</Text>}
                url={
                  "https://www.uhaul.com/Articles/About/20625/College-Students-U-Haul-Offers-30-Days-Free-Self-Storage-Amid-Coronavirus-Outbreak/"
                }
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      U-Haul is offering college students 30-days free of self
                      storage due to the coronavirus outbreak.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Moving Out Resources</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Similarly to U-Haul, collegeboxes.com is offering free
                      resources to aid students that are moving out of their
                      dorms.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Resources and Funding</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      The Student Relief Fund is working to provide resources
                      and funding to students in need of support because of a
                      COVID-19 campus shutdown. Visit their website for more
                      information.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Learn to Code</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Code Academy teaches millions of learners web development,
                      mobile development, and data science skills. In the wake
                      of school closures due to COVID-19, they’re offering
                      10,000 scholarships to Codecademy Pro for free to high
                      school and college students across the world for the rest
                      of the school year.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Multilingual Student Resources</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Switchboard TA has put together fact sheets, posters,
                      multimedia resources, and links to live updates in
                      multiple languages about COVID-19. Students can go here
                      for news, multimedia and more.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Find Assistance</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Dial 211 to find assistance with finding food, paying
                      housing bills, or other essential services.
                    </Text>
                  </View>
                }
              />
            </View>
          ),
          id: "1"
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
        <BigHeaderScrollView
          title="General Resources"
          description="Helpful information and organizations."
          image={
            <FontAwesome5
              name="hands-helping"
              size={100}
              color={!isDark ? colors.textcolor : "#444"}
            />
          }
        >
          {this.state.list.map(item => {
            return (
              <ImageButton
                title={item.title}
                source={item.image}
                body={item.body}
                navigation={this.props.navigation}
              />
            );
          })}
        </BigHeaderScrollView>
      </View>
    );
  }
}
