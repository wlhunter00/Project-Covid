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

import image1 from "../../images/preventativePractice/handwash.png";
import image2 from "../../images/preventativePractice/image3.gif";
import image3 from "../../images/preventativePractice/image2.jpg";
import image4 from "../../images/preventativePractice/image4.jpg";
import image5 from "../../images/preventativePractice/image5C.jpg";
import image6 from "../../images/preventativePractice/image6.jpg";

import Modal from "react-native-modal";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView
} from "react-native-gesture-handler";

import ModalImage from "./../../components/ModalImage";
import { useStyle } from "../../styles/styles";
import { ImageButton } from "../../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { InfoView } from "../../components/InfoView";

export default function StyledPreventativePractices() {
  const { styles } = useStyle("container", "bioText");
  const navigation = useNavigation();
  return <PreventativePractices styles={styles} navigation={navigation} />;
}
class PreventativePractices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          image: image1,
          title: "Hygiene Habits",
          body: (
            <View>
              <InfoView 
                title={
                  <Text>Hand Washing</Text>
                }
                body={
                  <View>
                    <Text style={this.props.styles.bioText}>20 seconds (typically the chorus of a song), rubbing between fingers, over tops and palms, and under nail beds</Text>
                    <Text style={this.props.styles.bioText}>Antibacterial soap or alcohol-based sanitizer</Text>
                    <Text style={this.props.styles.bioText}>Avoid scalding hot water that may dry out skin, this may create microtears in the skin’s protective barrier</Text>  
                  </View>
                }
              />
              <InfoView 
                title={
                  <Text>General Tips</Text>
                }
                body={
                  <View>
                    <Text style={this.props.styles.bioText}>Avoid touching your face, become conscious of how often you do</Text>
                    <Text style={this.props.styles.bioText}>Because COVID-19 can transmit to the eyes, avoid wearing contact lenses if possible which may trap contaminants and wear traditional glasses instead</Text>
                    <Text style={this.props.styles.bioText}>Routinely sanitize personal belongings (phones, wallets, keys, glasses) and high contact surfaces (handles, counters, car steering wheels)</Text> 
                    <Text style={this.props.styles.bioText}>Cover your coughs and sneezes with your elbow, facing away from others</Text> 
                    <Text style={this.props.styles.bioText}>Avoid handshaking and hugs when greeting others professionally and socially</Text> 
                    <Text style={this.props.styles.bioText}>Masks: N95 masks should ONLY be used in those showing symptoms, or those around the potentially infected</Text> 
                    <Text style={this.props.styles.bioText}>Surfaces: COVID-19 can live on fabrics and hard surfaces for a predicted period of several days, clean surfaces routinely with disinfectants</Text>  
                  </View>
                }
              />
              <InfoView 
                title={
                  <Text>Sources</Text>
                }
                body={
                  <View>
                    <Text style={this.props.styles.bioText}>https://www.cdc.gov/coronavirus/2019-ncov/index.html</Text>
                    <Text style={this.props.styles.bioText}>https://www.who.int/health-topics/coronavirus</Text>
                    <Text style={this.props.styles.bioText}>https://healthblog.uofmhealth.org/wellness-prevention/flattening-curve-for-covid-19-what-does-it-mean-and-how-can-you-help</Text> 
                    <Text style={this.props.styles.bioText}>https://store.samhsa.gov/system/files/sma14-4894.pdf</Text> 
                    <Text style={this.props.styles.bioText}>https://www.wkbw.com/news/national/coronavirus/spectrum-to-offer-free-broadband-and-wifi-to-students-without-it</Text> 
                  </View>
                }
              />
            </View>
          ),
          id: "1"
        },
        // {
        //   image: image2,
        //   title: "Physical Distancing",
        //   body: [
        //     "-\n Social distancing is advised to prevent an exponential infection of the American people. As observed in Italy and China, ICUs and ventilators are not infinite",
        //     "\n-  Avoid large gatherings and close-contact environments (including gyms)",
        //     "\n-  Worry, concern, frustration, and loneliness are expected: remind yourself of the greater good you are promoting and advocating for by social distancing",
        //     "\n-  Those previously experiencing substance abuse and mental health concern may be more likely to struggle in social isolation, consult appropriate providers/resources",
        //     "\n-  Employees/students are advised to work from home/participate in online courses",
        //     "\n-  If you absolutely must leave the house, support small businesses",
        //     "\n ",
        //     "\nSources:",
        //     "\n1. https://www.cdc.gov/coronavirus/2019-ncov/index.html",
        //     "\n2. https://www.who.int/health-topics/coronavirus",
        //     "\n3. https://healthblog.uofmhealth.org/wellness-prevention/flattening-curve-for-covid-19-what-does-it-mean-and-how-can-you-help",
        //     "\n4. https://store.samhsa.gov/system/files/sma14-4894.pdf",
        //     "\n5. https://www.wkbw.com/news/national/coronavirus/spectrum-to-offer-free-broadband-and-wifi-to-students-without-it"
        //   ],
        //   id: "2"
        // },
        // {
        //   image: image3,
        //   title: "Stress and Stigma",
        //   id: "3",
        //   body: [
        //     "- Asian descending, recent travelers and healthcare responders are at risk of stigma",
        //     "\n \u2027 Stigmatized populations are subject to social avoidance/rejection, denial of resources, and verbal and/or physical violence",
        //     "\n-  We are ALL responsible citizens in practicing cultural competency and community support for these stigmatized populations",
        //     "\n \u2027 Take action: share your knowledge from this application and other national/global resources to dissolve myths and public stigma",
        //     "\n \u2027 Take action: express your support to those who may have experienced stigma amidst COVID-19, and refer to mental health services as needed",
        //     "\n-  As a population, we must remember to protect our mental health and coping methods",
        //     "\n \u2027 Those who previously may have struggled with mental health and/or substance abuse may be at risk of exacerbation",
        //     "\n \u2027 If you or someone you know is struggling reach out to appropriate resources",
        //     "\n ",
        //     "\nSources:",
        //     "\n1. https://www.cdc.gov/coronavirus/2019-ncov/index.html",
        //     "\n2. https://www.who.int/health-topics/coronavirus",
        //     "\n3. https://healthblog.uofmhealth.org/wellness-prevention/flattening-curve-for-covid-19-what-does-it-mean-and-how-can-you-help",
        //     "\n4. https://store.samhsa.gov/system/files/sma14-4894.pdf",
        //     "\n5. https://www.wkbw.com/news/national/coronavirus/spectrum-to-offer-free-broadband-and-wifi-to-students-without-it"
        //   ]
        // },
        // {
        //   image: image4,
        //   title: "Preparation",
        //   id: "4",
        //   body: [
        //     "-  Two Week’s Supply: If you display symptoms, you are advised to self-quarantine for two weeks; develop a two week’s supply of food, medical and cleaning supplies needed in the event you must self-quarantine",
        //     "\n-  Do not forget your prescriptions and essential medical supplies",
        //     "\n-  If you are healthy and able, consider making the trip to build a supply for the immunocompromised and/or older adults in your community",
        //     "\n-  If stores are out of stock of staples, online retailers may still deliver",
        //     "\n ",
        //     "\nWhen in stores:",
        //     "\n-  Sanitize your carts and hands; most retailers have stations",
        //     "\n-  Avoid clashing with other customers",
        //     "\n-  Thank the employees! They are working around the clock to keep shelves stocked",
        //     "\n ",
        //     "\nSources:",
        //     "\n1. https://www.cdc.gov/coronavirus/2019-ncov/index.html",
        //     "\n2. https://www.who.int/health-topics/coronavirus",
        //     "\n3. https://healthblog.uofmhealth.org/wellness-prevention/flattening-curve-for-covid-19-what-does-it-mean-and-how-can-you-help",
        //     "\n4. https://store.samhsa.gov/system/files/sma14-4894.pdf",
        //     "\n5. https://www.wkbw.com/news/national/coronavirus/spectrum-to-offer-free-broadband-and-wifi-to-students-without-it"
        //   ]
        // },
        // {
        //   image: image5,
        //   title: "Protecting Others",
        //   id: "5",
        //   body: [
        //     "-  Current observation indicates mild symptoms in non-vulnerable populations",
        //     "\n-  Vulnerable populations: older adults (65+) and immunocompromised (chronic-diseased) are subject to severe symptoms of illness",
        //     "\n-  Vulnerable populations may need emergent health services if infected:",
        //     "\n- ICU (intensive care unit) or ventilators",
        //     "\n- These resources are subject to becoming strained as caseload picks up in the United States (following China and Italy’s events)",
        //     "\n ",
        //     "\nIf a vulnerable population member shows symptoms:",
        //     "\n-  Call ahead to emergent health services so they can anticipate arrival",
        //     "\n-  Call local healthcare provider and/or health department to seek testing",
        //     "\nIf a non-vulnerable population member shows symptoms",
        //     "\n ",
        //     "\nSources:",
        //     "\n1. https://www.cdc.gov/coronavirus/2019-ncov/index.html",
        //     "\n2. https://www.who.int/health-topics/coronavirus",
        //     "\n3. https://healthblog.uofmhealth.org/wellness-prevention/flattening-curve-for-covid-19-what-does-it-mean-and-how-can-you-help",
        //     "\n4. https://store.samhsa.gov/system/files/sma14-4894.pdf",
        //     "\n5. https://www.wkbw.com/news/national/coronavirus/spectrum-to-offer-free-broadband-and-wifi-to-students-without-it"
        //   ]
        // },
        // {
        //   image: image6,
        //   title: "Caring for the Infected",
        //   id: "6",
        //   body: [
        //     "Signs and Symptoms (May Vary):",
        //     "\n-  Fever, cough, difficulty breathing, sore throat, runny nose",
        //     "\n- COVID-19 infected individuals may not display all symptoms",
        //     "\n-  Those with standard immunity may have such mild symptoms they do not believe they have become infected with COVID-19",
        //     "\n- Older adults are subject to blunted immune response, and may not show a fever",
        //     "\n ",
        //     "\nViral shedding: the period of time bodily secretions can transmit the virus",
        //     "\n-  To date, the viral shedding period of COVID-19 is unknown",
        //     "\n-  For this reason, continuously practice proper hygiene and cleaning",
        //     "\n-  COVID-19 may be a contagious virus before and after symptoms appear/clear from infected individuals",
        //     "\n ",
        //     "\nSources:",
        //     "\n1. https://www.cdc.gov/coronavirus/2019-ncov/index.html",
        //     "\n2. https://www.who.int/health-topics/coronavirus",
        //     "\n3. https://healthblog.uofmhealth.org/wellness-prevention/flattening-curve-for-covid-19-what-does-it-mean-and-how-can-you-help",
        //     "\n4. https://store.samhsa.gov/system/files/sma14-4894.pdf",
        //     "\n5. https://www.wkbw.com/news/national/coronavirus/spectrum-to-offer-free-broadband-and-wifi-to-students-without-it"
        //   ]
        // }
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
              body={item.body}
              navigation={this.props.navigation}
            />;
          })}
        </ScrollView>
      </View>
    );
  }
}
