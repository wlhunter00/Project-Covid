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

import image1 from "./../../images/mentalHealth/image1.jpg";
import image2 from "./../../images/mentalHealth/image2.jpg";

import Modal from "react-native-modal";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView
} from "react-native-gesture-handler";

import ModalImage from "./../../components/ModalImage";
import BigHeaderScrollView from "../../components/BigHeaderScrollView.js";
import { FontAwesome } from "@expo/vector-icons";
import { useStyle } from "../../styles/styles";
import { ImageButton } from "../../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { InfoView } from "./../../components/InfoView";
import { SourceItem } from "../../components/FooterComponents";

export default function StyledMentalHealth() {
  const { styles, colors, isDark } = useStyle("container", "resourceText");
  const navigation = useNavigation();
  return (
    <MentalHealth
      styles={styles}
      colors={colors}
      isDark={isDark}
      navigation={navigation}
    />
  );
}

class MentalHealth extends React.Component {
  constructor(props) {
    super(props);
    const { isDark } = this.props;
    this.state = {
      list: [
        {
          image: image1,
          title: (
            <Text style={{ color: "white" }}>
              Social Distancing
            </Text>
          ),
          body: (
            <View>
              <InfoView
                title={<Text>Look out for Potential Signs of Distress</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      • Feelings of numbness, disbelief, anxiety or fear.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Changes in appetite, energy, and activity levels.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Difficulty concentrating.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Difficulty sleeping or nightmares and upsetting
                      thoughts. and images
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Physical reactions, such as headaches, body pains,
                      stomach problems, and skin rashes.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Worsening of chronic health problems.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Anger or short-temper.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Increased use of alcohol, tobacco, or other drugs.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Stress Coping Activities</Text>}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      • "If distress impacts activities of your daily life for
                      several days or weeks, talk to a clergy member, counselor,
                      or doctor, or contact the SAMHSA helpline at
                      1-800-985-5990.” - CDC
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Sleeping well, exercising and maintaining a healthy diet
                      will promote your mental health.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Take mental breaks, time to unwind and reflect. Deep
                      breathing. Do activities you usually enjoy.
                    </Text>
                    <Text style={this.props.styles.resourceText}>
                      • Share your concerns and feelings with friends and
                      family.
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
                    url: "https://emergency.cdc.gov/coping/selfcare.asp",
                    headline: "Taking Care of Your Emotional Health"
                  },
                  {
                    title: "NCBI",
                    url:
                      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1470658/",
                    headline: "Exercise for Mental Health"
                  },
                  {
                    title: "The clay Center for Young Healthy Minds",
                    url:
                      "https://www.mghclaycenter.org/hot-topics/7-ways-to-support-kids-and-teens-through-the-coronavirus-pandemic/",
                    headline:
                      "7 Ways to Support Kids and Teens Through the Coronavirus Pandemic"
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
              Resources to Use
            </Text>
          ),
          body: (
            <View>
              <InfoView
                title={<Text>Mental Health America</Text>}
                url={"http://mhanational.org/covid19"}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      MHA has compiled a range of resources and information to
                      assist you and your community. Visit if you’re looking for
                      mental health information and resources related to
                      COVID-19, isolation, anxiety, stress, and more.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Rethink My Therapy</Text>}
                url={"https://rethinkmytherapy.com/"}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Rethink My Therapy is the most affordable virtual mental
                      health counseling in America. Members are able to book
                      unlimited 45-minute therapy sessions, with the counselor
                      of their choice for $60/month. It works just like
                      in-person counseling, except the experience is more
                      affordable and convenient.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>The National Alliance on Mental Illness</Text>}
                url={"http://www.nami.org/"}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      NAMI hosts online communities where people can share
                      encouragement.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>7 Cups</Text>}
                url={"http://www.7cups.com/"}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      7 Cups is an app and online resource that lets you chat
                      with a trained listener for emotional support and
                      counseling. It also offers online therapy with a licensed
                      mental health professional. Services are also offered in
                      Spanish.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Support Group Central</Text>}
                url={"http://www.supportgroupscentral.com/"}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Support Group Central offers virtual support groups on
                      numerous mental health conditions for free or low-cost.
                      This website is also offered in many different languages,
                      including Chinese and Spanish.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Betterhelp</Text>}
                url={
                  "https://www.betterhelp.com/start/?go=true&transaction_id=10295e48477e19f6e9b100987860cb&utm_source=affiliate&utm_campaign=1510&utm_medium=Desktop&utm_content=&utm_term=%C2%AC_found=1&gor=start"
                }
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Betterhelp is an app that offers individual, couples, or
                      teens counseling. Licensed therapists are available
                      through text, video, and audio.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>The Tribe Wellness Community</Text>}
                url={"http://www.support.therapytribe.com/"}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      The Tribe Wellness Community is a free, online peer
                      support network that gives members facing mental health
                      challenges and/or difficult family dynamics a safe place
                      to connect.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Psych Central</Text>}
                url={"http://www.psychcentral.com/"}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Psych Central offers online mental health resources,
                      quizzes, news, and an “Ask the Therapist” function.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Talkspace</Text>}
                url={
                  "https://lp.talkspace.com/try/ct?siteID=Q.Sg3glZ_fs-GARENcQs7bz1gXKzyyX5NQ&ranMID=41986&ranEAID=Q*Sg3glZ%2Ffs&ranSiteID=Q.Sg3glZ_fs-GARENcQs7bz1gXKzyyX5NQ&LSNSUBSITE=LSNSUBSITE&utm_source=linkshare&utm_campaign=Affiliate_Linkshare&utm_keyword=3&utm_medium=dotdash&utr_adgroup=3672320&utr_adid=37"
                }
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Talkspace matches you to a licensed therapist, available
                      five days a week for text, video, and audio messaging.
                      Talkspace is also available as an app.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>For Like Minds</Text>}
                url={"http://www.forlikeminds.com/"}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      For Like Minds is an online mental health support network
                      that allows individuals to connect with others who are
                      experiencing stressful life events.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>Runaway</Text>}
                url={"http://www.runawayapp.com"}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      Runaway is a student-owned and operated social venture
                      that aims to promote mental health awareness and help
                      those in need of emotional support. They’ve facilitated
                      thousands of mental health conversations.
                    </Text>
                  </View>
                }
              />
              <InfoView
                title={<Text>18percent</Text>}
                url={"http://www.18percent.org/"}
                body={
                  <View>
                    <Text style={this.props.styles.resourceText}>
                      18percent offers a free, peer-to-peer online support
                      community for those struggling with a wide range of mental
                      health issues."
                    </Text>
                  </View>
                }
              />
            </View>
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
        <BigHeaderScrollView
          title="Mental Health"
          description="Tips for keeping up a healthy mindset."
          // image={
          //   <FontAwesome
          //     name="heart"
          //     size={100}
          //     color={!isDark ? colors.textcolor : "#444"}
          //   />
          // }
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
