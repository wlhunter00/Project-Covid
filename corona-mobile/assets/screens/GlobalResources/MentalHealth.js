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

import { ModalImage } from "./../../components/ModalImage";
import { defaults } from "../../styles/styles";

export default class MentalHealth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          image: image1,
          title: "Social Distancing",
          body: [
            "Look out for these common signs of distress:",
            "\n-  Feelings of numbness, disbelief, anxiety or fear",
            "\n-  Changes in appetite, energy, and activity levels",
            "\n-  Difficulty concentrating",
            "\n-  Difficulty sleeping or nightmares and upsetting thoughts and images",
            "\n-  Physical reactions, such as headaches, body pains, stomach problems, and skin rashes",
            "\n-  Worsening of chronic health problems",
            "\n-  Anger or short-temper",
            "\n-  Increased use of alcohol, tobacco, or other drugs",
            "\n",
            "\nDaily Activities to Help With Stress:",
            "\n-  “If distress impacts activities of your daily life for several days or weeks, talk to a clergy member, counselor, or doctor, or contact the SAMHSA helpline at 1-800-985-5990.” - CDC",
            "\n-  Sleeping well, exercising† and maintaining a healthy diet will promote your mental health",
            "\n-  Take mental breaks, time to unwind and reflect. Deep breathing. Do activities you usually enjoy",
            "\n-  Share your concerns and feelings with friends and family",
            "\n ",
            "\nExercise Tips:",
            "\n-  Health benefits of 30 minutes of exercise include improved sleep, stress relief, and improvement in mood",
            "\n-  Examples of at-home exercises include: Jumping Jacks, Squats, Sit-Ups, Push-Ups, Yoga",
            "\n",
            "\nSources:",
            "\n1. https://emergency.cdc.gov/coping/selfcare.asp",
            "\n2. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1470658/",
            "\n3. https://www.mghclaycenter.org/hot-topics/7-ways-to-support-kids-and-teens-through-the-coronavirus-pandemic/"
          ],
          id: "1"
        },
        {
          image: image2,
          title: "Resources",
          body: [
            "-  Mental Health America:",
            "\nMHA has compiled a range of resources and information to assist you and your community. Visit if you’re looking for mental health information and resources related to COVID-19, isolation, anxiety, stress, and more",
            "\n",
            "\n-  Rethink My Therapy",
            "\nRethink My Therapy is the most affordable virtual mental health counseling in America. Members are able to book unlimited 45-minute therapy sessions, with the counselor of their choice for $60/month. It works just like in-person counseling, except the experience is more affordable and convenient",
            "\n",
            "\n-  The National Alliance on Mental Illness",
            "\nNAMI hosts online communities where people can share encouragement",
            "\n",
            "\n-  7 Cups",
            "\n7 Cups is an app and online resource that lets you chat with a trained listener for emotional support and counseling. It also offers online therapy with a licensed mental health professional. Services are also offered in Spanish",
            "\n",
            "\n-  Support Group Central",
            "\nSupport Group Central offers virtual support groups on numerous mental health conditions for free or low-cost. This website is also offered in many different languages, including Chinese and Spanish",
            "\n",
            "\n-  Betterhelp",
            "\nBetterhelp is an app that offers individual, couples, or teens counseling. Licensed therapists are available through text, video, and audio",
            "\n ",
            "\n-  The Tribe Wellness Community",
            "\nThe Tribe Wellness Community is a free, online peer support network that gives members facing mental health challenges and/or difficult family dynamics a safe place to connect",
            " \n",
            "\n-  Psych Central",
            "\nPsych Central offers online mental health resources, quizzes, news, and an “Ask the Therapist” function",
            "\n",
            "\n-  Talkspace",
            "\nTalkspace matches you to a licensed therapist, available five days a week for text, video, and audio messaging. Talkspace is also available as an app",
            " \n",
            "\n-  For Like Minds",
            "\nFor Like Minds is an online mental health support network that allows individuals to connect with others who are experiencing stressful life events",
            "\n",
            "\n-  18percent",
            "\n18percent offers a free, peer-to-peer online support community for those struggling with a wide range of mental health issues."
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
