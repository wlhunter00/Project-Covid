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

import image1 from "./../../images/informationalToolkit/image1.jpg";
import image2 from "./../../images/informationalToolkit/image2.jpg";
import image3 from "./../../images/informationalToolkit/image3.jpg";
import image4 from "./../../images/informationalToolkit/image4.jpg";
import Modal from "react-native-modal";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView
} from "react-native-gesture-handler";
import BigHeaderScrollView from "../../components/BigHeaderScrollView.js";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import ModalImage from "./../../components/ModalImage";
import { useStyle } from "../../styles/styles";
import { ImageButton } from "../../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { InfoView } from "./../../components/InfoView";
import { SourceItem } from "../../components/FooterComponents";
import { StandardText } from "../../components/Texts";

export default function StyledInformationalToolkit() {
  const { styles, colors, isDark } = useStyle("container", "resourceText", "scrollViewContent");
  const navigation = useNavigation();
  return (
    <InformationalToolkit
      styles={styles}
      colors={colors}
      isDark={isDark}
      navigation={navigation}
    />
  );
}

class InformationalToolkit extends React.Component {
  constructor(props) {
    super(props);
    const { isDark } = this.props;

    this.state = {
      list: [
        {
          image: image1,
          title: (
            <Text style={{ color: "white" }}>COVID-19</Text>
          ),
          body: (
            <View>
              <InfoView
                title={<Text>What is COVID-19?</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      COVID-19 is the name of the disease caused by coronavirus,
                      originally discovered in Wuhan, China, that can be
                      transmitted from human to human.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      The coronavirus 2020 outbreak is officially considered a
                      pandemic by the World Health Organization (WHO).
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>How does one get infected?</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      • Close contact with people (within 6 feet) who are
                      infected.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • It may be possible for someone to get COVID-19 by
                      touching a surface with the virus on it and then touching
                      their mouth, nose, eyes, or face.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>What are the signs and symptoms?</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      • Common symptoms include fever, cough, and shortness of
                      breath.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Other symptoms include sneezing, runny nose, sore
                      throat, and muscle aches.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Those infected can be asymptomatic carriers of the
                      virus.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Different people may have different combinations of
                      symptoms, even with the same virus.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Who is at a higher risk?</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      • Those with serious chronic medical conditions like heart
                      disease, diabetes, and lung disease.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • The immunocompromised, such as people with HIV, those
                      taking corticosteroids, those with cancer and
                      current/recent chemotherapy treatment.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Older adults.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={
                  <Text>
                    How is the coronavirus treated? Can I take antibiotics?
                  </Text>
                }
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      There are currently no drug treatments approved, but
                      several drugs that are used for other conditions are being
                      studied to see whether they could help treat COVID-19.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      Plasma/antibody therapies are currently under study as
                      well.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      Antibiotics are not effective against the virus.
                    </Text>
                  </View>
                }
              />
              <SourceItem
                navigation={this.props.navigation}
                typeSource={"Sources"}
                sourcesList={[
                  {
                    title: "CDC",
                    url:
                      "https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/high-risk-complications.html",
                    headline: "People who are at higher risk for severe illness"
                  },
                  {
                    title: "CDC",
                    url:
                      "https://www.cdc.gov/coronavirus/2019-ncov/about/transmission.html",
                    headline: "How Coronavirus Spreads"
                  },
                  {
                    title: "WHO",
                    url:
                      "https://www.who.int/dg/speeches/detail/who-director-general-s-opening-remarks-at-the-media-briefing-on-covid-19---11-march-2020",
                    headline:
                      "WHO Director-General's opening remarks at the media briefing on COVID-19 - 11 March 2020"
                  },
                  {
                    title: "The Lancet",
                    url:
                      "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30154-9/fulltext",
                    headline:
                      "A familial cluster of pneumonia associated with the 2019 novel coronavirus indicating person-to-person transmission: a study of a family cluster"
                  },
                  {
                    title: "The Lancet",
                    url:
                      "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30211-7/fulltext",
                    headline:
                      "Epidemiological and clinical characteristics of 99 cases of 2019 novel coronavirus pneumonia in Wuhan, China: a descriptive study"
                  },
                  {
                    title: "The Lancet",
                    url:
                      "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30183-5/fulltext",
                    headline:
                      "Clinical features of patients infected with 2019 novel coronavirus in Wuhan, China"
                  },
                  {
                    title: "The Lancet",
                    url:
                      "https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(20)30150-9/fulltext",
                    headline: "Risk of COVID-19 for cancer patients"
                  },
                  {
                    title: "The Clay Center for Young Healthy Minds",
                    url:
                      "https://www.mghclaycenter.org/hot-topics/7-ways-to-support-kids-and-teens-through-the-coronavirus-pandemic/",
                    headline:
                      "7 Ways to Support Kids and Teens Through the Coronavirus Pandemic"
                  },
                  {
                    title: "Cell Research",
                    url:
                      "https://www.nature.com/articles/s41422-020-0282-0?fbclid=IwAR2wgEzxXL3pzUEefkN4dOTq_iIEoq5O88p9ZPRMgYlDxLpg_bISGT6RoZ4",
                    headline:
                      "Remdesivir and chloroquine effectively inhibit the recently emerged novel coronavirus (2019-nCoV) in vitro"
                  }
                ]}
                key={"researchJourn"}
              />
            </View>
          ),
          id: "1"
        },
        {
          image: image2,
          title: (
            <Text style={{ color: "white" }}>
              Preparedness
            </Text>
          ),
          body: (
            <View>
              <InfoView
                title={
                  <Text>What sanitation measures should I be taking?</Text>
                }
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      • Frequent handwashing for at least 20 seconds several
                      times throughout the day.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Maintaining distance from others in public spaces (6
                      feet recommended).
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Avoid touching one’s face.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Wear a mask if you suspect you have been exposed or have
                      the virus or if you are caring for someone who has.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={
                  <Text>What preventative measures should I be taking?</Text>
                }
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      • Stay home as much as possible.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Avoid travel and public spaces as much as possible.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Practice social distancing by staying away from large
                      groups and gatherings.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Wear a simple facemask in all external interactions.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Those who suspect they may have the virus should stay at
                      home and limit interactions with their family/members of
                      their home.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Should I self-quarantine and for how long?</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Research shows that after being exposed and infected by
                      COVID-19 it takes between 2 and 14 days for symptoms to
                      begin, with most beginning by day 5.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      If you have been exposed, it is recommended you
                      self-quarantine for 14 days, and longer if you develop
                      symptoms or receive a positive test result. Government
                      experts and healthcare providers can guide you in this
                      case.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>How does one get diagnosed?</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      • From one’s symptoms and risk factors.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • A nasal/throat swab or sputum sample.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • A chest CT scan.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Is there a vaccine?</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      • Currently there is no vaccine.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Vaccine trials are underway, but may be far from
                      production even if effective.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • According to the WHO, a vaccine is not expected to
                      become available until 2021 at the earliest.
                    </Text>
                  </View>
                }
              />
              <SourceItem
                navigation={this.props.navigation}
                typeSource={"Sources"}
                sourcesList={[
                  {
                    title: "WHO",
                    url:
                      "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public",
                    headline:
                      "Coronavirus disease (COVID-19) advice for the public"
                  },
                  {
                    title: "CDC",
                    url:
                      "https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Fabout%2Fsteps-when-sick.html",
                    headline: "What To Do if You Are Sick"
                  },
                  {
                    title: "CDC",
                    url:
                      "https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Fabout%2Fprevention.html",
                    headline: "How to Protect Yourself"
                  },
                  {
                    title: "The Lancet",
                    url:
                      "https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Fabout%2Fsymptoms.html",
                    headline: "Symptoms of Coronavirus"
                  },
                  {
                    title: "CDC",
                    url:
                      "https://www.cdc.gov/coronavirus/2019-ncov/about/transmission.html",
                    headline: "How Coronavirus Spreads"
                  },
                  {
                    title: "Wiley Online Library",
                    url:
                      "https://onlinelibrary.wiley.com/doi/full/10.1111/tmi.13383",
                    headline: "The COVID‐19 epidemic"
                  },
                  {
                    title: "CDC",
                    url:
                      "https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/high-risk-complications.html",
                    headline: "People who are at higher risk for severe illness"
                  },
                  {
                    title: "MMR",
                    url:
                      "https://mmrjournal.biomedcentral.com/articles/10.1186/s40779-020-0233-6",
                    headline:
                      "A rapid advice guideline for the diagnosis and treatment of 2019 novel coronavirus (2019-nCoV) infected pneumonia (standard version)"
                  },
                  {
                    title: "TIME Magazine",
                    url:
                      "https://time.com/5804092/experimental-covid-19-vaccine-test-begins-as-u-s-volunteer-receives-first-shot",
                    headline:
                      "Experimental COVID-19 Vaccine Test Begins as U.S. Volunteer Receives First Shot"
                  }
                ]}
                key={"researchJourn"}
              />
            </View>
          ),
          id: "2"
        },
        {
          image: image3,
          title: (
            <Text style={{ color: "white" }}>
              Post-Infection Steps
            </Text>
          ),
          body: (
            <View>
              <InfoView
                title={<Text>If you Feel Sick</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      • If you are sick, you should wear a facemask if available
                      when around others in the home or in public.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Cover your face with a tissue when sneezing and
                      coughing; then, dispose of the tissue and wash your hands
                      for 20 seconds with soap and water.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Use hand sanitizer with at least 60% alcohol content if
                      you cannot wash your hands with soap and water - rub hands
                      together until the alcohol dries without wiping it off on
                      anything.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Avoid sharing personal household items.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Clean and disinfect commonly touched surfaces around the
                      house daily.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Maintain as much space between people as possible while
                      in the same room; droplets carrying the virus can travel
                      several feet. When possible, stay in a separate room and
                      use a separate bathroom from other household members.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Do not give aspirin to children with a fever as it can
                      cause a serious condition called Reyes Syndrome.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Seeking Medical Attention</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      • The CDC currently recommends: 'If you think you have
                      been exposed to COVID-19 and develop a fever and symptoms,
                      such as cough or difficulty breathing, call your
                      healthcare provider for medical advice.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • If you develop difficulty breathing, pain or pressure in
                      the chest, new confusion or inability to arouse, bluish
                      lips or face, call your doctor or the local emergency room
                      to find out the best way to get medical care immediately.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Look to your state or local guidelines surrounding best
                      practices, testing criteria, and available healthcare
                      facilities caring for patients with suspected COVID-19.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Infected or possibly infected individuals should stay
                      home (and avoid travel) except to get medical care.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Call ahead before visiting a healthcare provider (they
                      may have protocols such as meeting you outside to avoid
                      many sick people coming into a waiting room).
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Do not leave home isolation until you are instructed to
                      do so by healthcare providers in consultation with state
                      and local health departments if you are confirmed to have
                      COVID-19.
                    </Text>
                  </View>
                }
              />
              <SourceItem
                navigation={this.props.navigation}
                typeSource={"Sources"}
                sourcesList={[
                  {
                    title: "CDC",
                    url:
                      "https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html",
                    headline: "What To Do if You Are Sick"
                  },
                  {
                    title: "CDC",
                    url:
                      "https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Fabout%2Fprevention.html",
                    headline: "How to Protect Yourself"
                  },
                  {
                    title: "WHO",
                    url:
                      "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public",
                    headline:
                      "Coronavirus disease (COVID-19) advice for the public"
                  }
                ]}
                key={"researchJourn"}
              />
            </View>
          ),
          id: "3"
        },
        {
          image: image4,
          title: (
            <Text style={{ color: "white" }}>
              Myth-Busting
            </Text>
          ),
          body: (
            <View>
              <InfoView
                title={<Text>Myth: Packages will infect me</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Fact: Coronavirus is spread through respiratory droplets,
                      but those may live on packages for up to several days.
                      Take precautionary measures to disinfect packages.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Myth: I can get coronavirus from my pet</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Fact: There are no reports of people being infected by
                      animals. However, CDC recommends people with coronavirus
                      limit contact with animals and with others.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={
                  <Text>Myth: I should avoid persons of Asian descent</Text>
                }
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Fact: People from Asian descent are not more likely to
                      spread the virus. Disease affects everybody regardless of
                      race or ethnicity.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={
                  <Text>
                    Myth: If I am young and healthy, I don’t have to worry about
                    it affecting me
                  </Text>
                }
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Fact: Many healthy people can be without symptoms but
                      still spread the virus and infect the rest of their
                      community; this puts the elderly and people with weak
                      immune systems at highest risk.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      There are also cases of young, healthy indviduals becoming
                      hospitalized.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={
                  <Text>
                    Myth: I shouldn't wear a mask to protect me from coronavirus
                  </Text>
                }
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Fact: Certain models of face masks protect healthcare
                      workers who care for patients.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      Guidlines have expanded and people should create and wear
                      a mask when they must leave their home.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Myth: Children are immune to coronavirus</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Fact: Children of any age can be infected by coronavirus.
                      Children with existing health conditions are more likely
                      to have complications.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={
                  <Text>Myth: I can take antibiotics for coronavirus</Text>
                }
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Fact: Antibiotics do not work on viruses and therefore do
                      not work on coronavirus.
                    </Text>
                  </View>
                }
              />
              <SourceItem
                navigation={this.props.navigation}
                typeSource={"Sources"}
                sourcesList={[
                  {
                    title: "Johns Hopkins Medicine",
                    url:
                      "https://www.hopkinsmedicine.org/health/conditions-and-diseases/coronavirus/2019-novel-coronavirus-myth-versus-fact",
                    headline: "Coronavirus Disease 2019: Myth vs. Fact"
                  },
                  {
                    title: "Harvard Health",
                    url:
                      "https://www.health.harvard.edu/diseases-and-conditions/coronavirus-resource-center",
                    headline: "Coronavirus Resource Center"
                  },
                  {
                    title: "CDC",
                    url:
                      "https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/share-facts.html",
                    headline: "Stop the Spread of Rumors"
                  }
                ]}
                key={"researchJourn"}
              />
            </View>
          ),
          id: "4"
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
      <View
        style={[styles.container, { backgroundColor: colors.backgroundcolor }]}
      >
        {/* <BigHeaderScrollView
          title="Informational Toolkit"
          description="All you need to know about COVID-19."
          // image={
          //   <MaterialCommunityIcons
          //     name="toolbox"
          //     size={100}
          //     color={!isDark ? colors.textcolor : "#444"}
          //   />
          // }
        > */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <StandardText style={{marginBottom: 20}}>All you need to know about COVID-19</StandardText>
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
        </ScrollView>
      </View>
    );
  }
}
