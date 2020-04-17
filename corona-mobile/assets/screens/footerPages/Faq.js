import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FAQItem } from "../../components/FooterComponents";
import { useStyle } from "./../../styles/styles.js";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export default function Faq({ route, navigation }) {
  const { styles, colors, isDark } = useStyle("container");
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <StandardText style={{ marginBottom: 20 }}>Find common questions regarding Project Covid.</StandardText>
        <FAQItem
          question="What is Project Covid?"
          answer={
            "The information that exists online about COVID-19 today is far too scattered and complicated for the average person to understand; there is also a growing concern over the spread of misinformation and “fake news” on the topic. Project Covid is the solution. 22 passionate college students from around the country came together to identify, analyze, and curate verified information and resources from several online and offline sources in one place to help anyone seeking knowledge and information about COVID-19. Our diverse team consists of students with experience in healthcare, health literacy, policy, and technology.\n\n Our iOS and Android apps come loaded with live outbreak trackers, testing center information, breaking news stories from verified sources, live travel information, along with best practices, knowledge about the virus, educational toolkits, student resources, and crisis contact information."
          }
          key="1"
        />
        <FAQItem
          question="What are your sources, what gives you credibility?"
          answer={
            "Our goal in creating this app was to identify and curate verified information and resources from trusted and reliable sources. All the information that you find on our platform has been curated only from these sources, and we have had a team of health literacy experts from Harvard Medical School and the University of Maryland thoroughly vet them prior to utilization. \n\nBelow is the list of all the information sources that we’ve utilized: \n\n• The Lancet Commission\n\n•  World Health Organization (WHO)\n\n• UNICEF\n\n• Centers for Disease Control and Prevention (CDC)\n\n• MMR Journal\n\n• TIME Magazine\n\n• John Hopkins University - Department of Medicine\n\n• Harvard University - Department of Health\n\n• University of Michigan - Department of Medicine\n\n• Substance Abuse and Mental Health Services Administration (SAMHSA)\n\n• National Health Commission of the People's Republic of China\n\n• European Centre for Disease Prevention and Control\n\nWe aimed to utilize a lot of pre-existing resources that we know are trustworthy for our technological development:\n\n• Our Embed Twitter Feed\n\n• WHO\n\n• Associated Press\n\n• BBC\n\n• New York Times\n\n• Aljazeera\n\n• Reuters\n\n• NPR\n\n• Bloomberg\n\n• CDC\n\n• coronavirus.app\n\nThe coronavirus.app is a trustworthy web application that we integrated into mobile. This is the list of the sources they use to keep the tracker up to date. It is updated in real-time. We have gotten their permission to embed their web application in our mobile application."
          }
          key="2"
        />
        <FAQItem
          question="Why is this app associated with LFR International?"
          answer={
            "In March of 2020, LFR International adopted the Project Covid Initiative, partnering with founders Satvik Sethi and Will Hunter to expand international access to the application. LFR International now serves as the primary publisher and regulatory organization for Project Covid.\n\nWe partnered with the original founders of Project Covid in order to increase access to trustworthy, reliable information regarding COVID-19 during this time of international crisis. The Project Covid mobile and web applications now are vital tools to fulfilling our mission of spreading equitable access to healthcare and empowering first responders around the globe. Thousands of LFR first responders around the globe use the Project Covid application to provide their communities with neccesary information regarding COVID-19, and LFR International is working with the development team to increase the international capabilities of Project Covid."
          }
          key="21"
        />
        <FAQItem
          question="Who is part of the founding team?"
          answer={
            "Project Covid was founded by Satvik Sethi, a senior at Binghamton University, New York. Satvik has been deeply involved in the global mental health and healthcare ecosystem and has worked with organizations like UNICEF, World Health Organization, and Mental Health America to conduct research, create policy, and to advocate for better mental health resources and accessibility for students around the world.\n\nSatvik has been recognized as 1 of 8 inspiring mental health youth activists by Mashable, and 1 of 15 students changing collegiate mental health by Mental Health America for the impact he has carried through his advocacy. He has also had the opportunity to give talks at events like the Millennial Summit and has been interviewed in media outlets like Vice, Arianna Huffington’s Thrive Global, Times of India, and Subconscious, for his entrepreneurial and social endeavors that have inspired and motivated people of all ages around the world. Satvik has also garnered immense professional experience, having worked with organizations like Jones Lang LaSalle, Deloitte, EY, and Mastercard.\n\nSatvik connected with Will Hunter, a sophomore at Washington University, St. Louis and brought him on as a Co-Founder owing to Will’s knowledge and skills in technological development. Will has expertise in full-stack development and delivering intuitive products to users. His development experience spans multiple programming languages and frameworks, and he excels at scoping large team-based projects. Will has a professional background in Data Science, working on multiple predictive analytics projects and is part of Alvarez and Marsal’s forensic technology services team. He has a passion for data security and personal privacy and seeks to find technological solutions for large global problems."
          }
          key="22"
        />
        <FAQItem
          question="What are you doing with my location?"
          answer={
            "We do not store any data related to an individual user’s location. Some of our features can be greatly enhanced by having access to location information, such as the testing center app, where we can tailor the information based on location by state. We plan on matching the latest headlines to local information, requiring the user’s location as well.\n\nA given location from the user is sent to our server in the form of coordinates. After sending necessary information about testing centers, outbreaks and current news to the user’s device, any and all location data extracted from the user is deleted.\n\nThe local news feature has not been implemented yet."
          }
          key="3"
        />
        <FAQItem
          question="What technology does the app use?"
          answer={
            "The app is coded in React Native. This allows us to deploy to both Android and iOS at the same time. We are using Expo, React Navigation, and React Elements inside the mobile app. We embed the twitter feed and coronavirus.app by using a WebView.\n\nThe backend is coded in Node.JS and is an Express server. We use it to communicate with third-party APIs. This backend is hosted on Heroku. This is our backend server. All sensitive user information has tokens to ensure data security. All other data regarding the app is available to the public for GET requests, although the data received would be very similar to other public APIs. The APIs we use are:\n\n• Coronavirusapi (Data on the spread of virus)\n\n• News API (News Data)\n\n• MapQuest (Reverse Geocoding)\n\n• NLTK (NLP Processing)\n\nWe store user permission tokens for push notifications and user services in a MongoDB database hosted by Atlas. We do not store any other data from our users.\n\nWe have some backend functionality regarding word processing and machine learning in Python. This information is then routed back into Node.JS."
          }
          key="5"
        />
        <FAQItem
          question="Why is this app important?"
          answer={
            "There are two main reasons why we felt the need to create this app:\n\n1. To help people find access to information and resources: \nToday, there are several online and offline sources available to everyone to find information relating to the COVID-19 pandemic. Unfortunately, through research and personal experience, we concluded that these sources are scattered and often difficult to comprehend for the average person. We wanted to create an extensive knowledge base of verified information and resources relating to the COVID-19 outbreak presented in an appealing and user-friendly manner.\n\n2. To prevent the spread of misinformation and 'fake news': \nWhile social media and instant communication have become a staple of interpersonal interaction, they have unfortunately fueled an increase in the dispersal of misinformation. Misinformation can be extremely harmful, especially with sensitive topics like COVID-19. By only utilizing trusted sources, we want to ensure that all aggregated knowledge and resources we share with our users are credible.\n\nWe provide complete transparency for all our sources, both for technological and non-technologically rooted information. You can find these sources on this page, as well as within each section on the mobile app."
          }
          key="7"
        />
        <FAQItem
          question="Are you making a profit from this?"
          answer={
            "No! We are a not-for-profit project made by college students with a desire to help. We identified a need for centralized information and wanted to provide it to our users at no cost, with no expectation of reciprocated gratification."
          }
          key="8"
        />
        <FAQItem
          question="How can I volunteer?"
          answer={
            "We are proud of the fact that our team is 100% on a volunteer basis. We are actively looking to bring new volunteers with diverse experiences onto our team. If you are interested in joining team Project Covid:\n\n• Email a copy of your resume\n\n• Your preferred role (technological or non-technological)\n\nWith the subject line “Project Covid - Volunteer Application” to satvik@runawayapp.com. "
          }
          key="9"
        />
        <FAQItem
          question="What can we expect next?"
          answer={
            "Many new features are in development:\n\n• A page featuring the latest information on global travel bans. Once we find a trustworthy and reliable data source, we will implement it right away.\n\n• A smart news feed, pulling the most noteworthy headlines sources in the app itself. We want these to include local headlines to best tailor the app to the user.\n\n• A sentiment-based news feature that will allow our users to filter news based on the type (positive or negative) of news content that you would like to see.\n\n• When information about testing centers is more widely available, we would like a feature where you can find the nearest testing location to you on a map.\n\n• We also have other broader plans such as displaying more statistics as well as video content. If you have any other ideas on how to improve the app, please let us know!"
          }
          key="10"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
