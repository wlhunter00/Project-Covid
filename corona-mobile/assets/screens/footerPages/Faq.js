import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { FAQItem } from "../../components/FooterComponents";
import { defaults } from "./../../styles/styles.js";

export default function Faq({ route, navigation }) {
  return (
    <ScrollView
      style={{ backgroundColor: defaults.backgroundcolor }}
      contentContainerStyle={styles.container}
    >
      <FAQItem
        question="What is Project Covid?"
        answer={
          "The information that exists online about COVID-19 today is far too scattered and complicated for the average person to understand; there is also a growing concern over misinformation and fake news that is being spread on the topic. Project Covid is the solution to these problems. 22 college students from around the country who are passionate about helping the world came together to identify, analyze, and curate verified information and resources from several online and offline sources in one place to help anyone looking to gain knowledge, information, and resources about COVID-19 . Our diverse team comprises students with credible experiences in healthcare, health literacy, and technology.\n\nOur iOS and Android apps come loaded with live outbreak trackers, testing center information, breaking news stories from verified sources, live travel information, along with verified information on best practices, knowledge about the virus, educational toolkits, student resources, and crisis contact information."
        }
        key="1"
      />
      <FAQItem
        question="What are your sources, what gives you credibility?"
        answer={
          "Our goal behind creating this app was to identify and curate verified information and resources from trusted and reliable sources. All the information that you find on our platform has been curated only from these sources, and we have had a team of health literacy experts from Harvard Medical School and the University of Maryland thoroughly vet them prior to utilizing them. \n\nBelow is the list of all the information sources that we’ve utilized: \n\n• The Lancet Commission\n\n•  World Health Organization (WHO)\n\n• UNICEF\n\n• Centers for Disease Control and Prevention (CDC)\n\n• MMR Journal\n\n• TIME Magazine\n\n• John Hopkins University - Department of Medicine\n\n• Harvard University - Department of Health\n\n• University of Michigan - Department of Medicine\n\n• Substance Abuse and Mental Health Services Administration (SAMHSA)\n\n• National Health Commission of the People's Republic of China\n\n• European Centre for Disease Prevention and Control\n\nWe aimed to utilize a lot of pre-existing resources that we know are trustworthy for our technological development:\n\n• Embed Twitter Feed\n\n• WHO\n\n• CNN\n\n• BBC\n\n• New York Times\n\n• Aljazeera\n\n• Reuters\n\n• CNBC\n\n• Sky News\n\n• CDC\n\n• Coronavirus.app\n\n• Coronavirusapi\n\nThe coronavirus.app is a trustworthy web application that we integrated into mobile. This is the list of the sources they use to keep the tracker up to date. It is updated in real-time. We have gotten their permission to embed their web application in our mobile application.\n\nThe coronavirusapi uses the same data sources as coronavirus.app but presents the data in a way so that our backend server can parse it."
        }
        key="2"
      />
      <FAQItem
        question="What are you doing with my location?"
        answer={
          "We do not store any data regarding an individual user’s location. Some of our features can be greatly enhanced by having access to location information, such as the testing center app, where we can tailor the information based on what state you are. We also plan on tailoring the latest headlines to local information, and for that, we need the user’s location as well.\n\nThe location that you give us is sent to our server in the form of coordinates. We then use MapQuest’s API to reverse geocode your location (figure out what state you are in). We then look at what information we have regarding testing centers for your state and send that data to your phone. After this is complete, your location data is deleted.\n\nThe local news feature has not been implemented yet."
        }
        key="3"
      />
      <FAQItem
        question="Are you storing my symptom data?"
        answer={
          "We do not store any data regarding what symptoms you have. The answers you write will get sent to the server, which uses a script to flag any notable symptoms, and sends that information back to your phone. Then the server deletes the symptom information."
        }
        key="4"
      />
      <FAQItem
        question="What technology does the app use?"
        answer={
          "The app is coded in React Native. This allows us to deploy to both Android and iOS at the same time. We are using Expo, React Navigation, and React Elements inside the mobile app. We embed the twitter feed and coronavirus.app by using a WebView.\n\nThe backend is coded in Node.JS and is an Express server. We use it to communicate with third-party APIs. This backend is hosted on Heroku. This is our backend server. All sensitive user information has tokens to ensure data security. All other data regarding the app is available to the public for GET requests, although the data received would be very similar to other public APIs. The APIs we use are:\n\n• Coronavirusapi.com (Data on the spread of virus)\n\n• News API (News Data)\n\n• MapQuest (Reverse Geocoding)\n\n• Spacy (NLP Processing)\n\nWe store user permission tokens for push notifications and user services in a MongoDB database hosted by Atlas. We do not store any other data from our users.\n\nWe have some backend functionality regarding word processing and machine learning in Python. This information is then routed back into Node.JS."
        }
        key="5"
      />
      <FAQItem
        question="Who is part of the Founding Team?"
        answer={
          "Project Covid was founded by Satvik Sethi, a senior at Binghamton University, New York. Satvik has been deeply involved in the global mental health and healthcare ecosystem and has worked with organizations like UNICEF, World Health Organization, and Mental Health America to conduct research, create policy, and to advocate for better mental health resources and accessibility for students around the world.\n\nSatvik has been recognized as 1 of 8 inspiring mental health youth activists by Mashable, and 1 of 15 students changing collegiate mental health by Mental Health America for the impact he has carried through his advocacy. He has also had the opportunity to give talks at events like the Millennial Summit and has been interviewed in media outlets like Vice, Arianna Huffington’s Thrive Global, Times of India, and Subconscious, for his entrepreneurial and social endeavors that have inspired and motivated people of all ages around the world. Satvik has also garnered immense professional experience, having worked with organizations like Jones Lang LaSalle, Deloitte, EY, and Mastercard.\n\nSatvik connected with Will Hunter, a sophomore at Washington University, St. Louis and brought him on as a Co-Founder owing to Will’s expansive knowledge and know-how in technological development. Will has expertise in full-stack development and delivering products that are intuitive for the user. He has development experience in multiple languages and frameworks and strength in scoping large projects to be worked on by a team. Will has a professional background in Data Science, working on multiple predictive analytics projects and is a part of Alvarez and Marsal’s forensic technology services team. He has a passion for data security and personal privacy and seeks to find technological solutions for large global problems."
        }
        key="6"
      />
      <FAQItem
        question="Why is this app important?"
        answer={
          "There are two main reasons why we felt the need to create this app:\n\n1. To help people find access to information and resources: \nToday, there are several online and offline sources available to everyone to find information relating to the COVID-19 pandemic. Unfortunately, through our market research and personal experiences, we came to the conclusion that these sources are extremely scattered and oftentimes difficult to comprehend for the average person. We wanted to create an extensive knowledge base of verified information and resources relating to the COVID-19 outbreak presented in a way that is both appealing and easy to understand.\n\n2. To prevent the spread of misinformation and fake news: \nWhile social media and instant communication has become a huge part of our life by shaping the way we interact with each other, it has also fueled a massive increase in the dispersal of misinformation. Misinformation can be extremely harmful, especially in the case of a sensitive topic like COVID-19. By only utilizing verified and trusted sources, we want to ensure that the aggregated knowledge and resources we share with our users is credible and prevents the spread of misinformation. \n\nWe provide complete transparency for all our sources, both for technological and non-technologically rooted information. You can find these sources on this page, as well as within each section on the mobile app. "
        }
        key="7"
      />
      <FAQItem
        question="Are you making a profit from this?"
        answer={
          "No! We are a not-for-profit project made by college students passionate about helping the world. We saw that there was a need for trusted information, and wanted to provide it to our users at no cost, with no expectation of personal incentive."
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
          "We have a lot of features planned for the future:\n\n• We want to have a page featuring the latest information on global travel bans in effect, and once we find a data source that we can trust and use, we will implement it right away.\n\n• We plan on implementing a smart news feed. What this means is the ability to pull the most noteworthy headlines from trustworthy sources in the app itself. We want these to include headlines that are local to tailor the app to the user. \n\n• We are also in the midst of developing a sentiment based news feature which will allow our users to filter news based on the type (positive or negative) of news content that you would like to see.\n\n• We aim to improve the testing center feature. One goal is for the users to put in a custom location to find information for that area. When information about testing centers is more widely available, we would like a feature where you can find the nearest testing location to you on a map.\n\n• We also have other broader plans such as displaying more statistics as well as video content. If you have any other ideas on how to improve the app, please let us know!"
        }
        key="10"
      />
    </ScrollView>
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
