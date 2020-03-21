import * as React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import {
  TeamMemberBox,
  CompactTeamMemberBox
} from "../../components/FooterComponents";
import { defaults, styles } from "../../styles/styles";

const satvikImage = require("../../images/founders/satvik.jpg");
const willImage = require("../../images/founders/will.jpg");

export default function Team({ route, navigation }) {
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 15 }}
      style={styles.container}
    >
      <Text style={localStyles.sectionTitle}>Founders</Text>
      <TeamMemberBox
        image={satvikImage}
        profile={{
          name: "Satvik Sethi",
          position: "Founder, Strategy & Branding",
          schoolAndYear: "Binghamton University, Senior",
          bio:
            "Satvik Sethi is a senior at Binghamton University, New York. He has worked with organizations like UNICEF, World Health Organization, and Mental Health America to conduct research, create policy, and to advocate for better mental health resources and accessibility for students around the world. \n\nSatvik has been recognized as 1 of 8 inspiring mental health youth activists by Mashable, and 1 of 15 students changing collegiate mental health by Mental Health America for the impact he has carried through his advocacy. \n\nHe has also had the opportunity to give talks at events like the Millennial Summit and has been interviewed in media outlets like Vice, Arianna Huffington’s Thrive Global, Times of India, and Subconscious, for his entrepreneurial and social endeavors that have inspired and motivated people of all ages around the world. Satvik has also garnered immense professional experience, having worked with organizations like Jones Lang LaSalle, Deloitte, EY, and Mastercard.",
          socials: []
        }}
      />
      <TeamMemberBox
        image={willImage}
        profile={{
          name: "Will Hunter",
          position: "Co-Founder, Product Manager",
          schoolAndYear: "Washington University, St. Louis, Sophomore",
          bio:
            "Will Hunter is a sophomore at Washington University, St. Louis and brings to the team an expansive knowledge and know-how in technological development. \n\nWill has expertise in full-stack development and delivering products that are intuitive for the user. He has development experience in multiple languages and frameworks and strength in scoping large projects to be worked on by a team. \n\nWill has a professional background in Data Science, working on multiple predictive analytics projects and is a part of Alvarez and Marsal’s forensic technology services team. He has a passion for data security and personal privacy and seeks to find technological solutions for large global problems.",
          socials: []
        }}
      />
      <Text style={localStyles.sectionTitle}>Technology Development</Text>
      <CompactTeamMemberBox
        name="Michael Ginn"
        position="Lead Software Engineer"
        schoolAndYear="Washington University, St. Louis, Sophomore"
      />
      <CompactTeamMemberBox
        name="Giorgio Guttilla"
        position="Lead Mobile App Developer"
        schoolAndYear="Washington University, St. Louis, Junior"
      />
      <CompactTeamMemberBox
        name="Simar Kapoor"
        position="Data Scientist"
        schoolAndYear="Indiana University, Bloomington, Sophomore"
      />
      <CompactTeamMemberBox
        name="Evan Molyneaux"
        position="Mobile App Developer"
        schoolAndYear="Washington University, St. Louis, Junior"
      />
      <CompactTeamMemberBox
        name="Pryce Yebesi"
        position="Mobile App Developer"
        schoolAndYear="Washington University, St. Louis, Sophomore"
      />
      <CompactTeamMemberBox
        name="Ajah Chukwuemeka"
        position="Full Stack Developer"
        schoolAndYear="University of Nigeria, Working Professional"
      />
      <CompactTeamMemberBox
        name="Adam Jacobowitz"
        position="Back End Developer"
        schoolAndYear="Ohio State University, Working Professional"
      />
      <CompactTeamMemberBox
        name="Kevin Huang"
        position="Front End Developer"
        schoolAndYear="Harvard University, First Year"
      />
      <CompactTeamMemberBox
        name="Katie Lund"
        position="Mobile App Developer"
        schoolAndYear="Washington University, St. Louis, Sophomore"
      />
      <CompactTeamMemberBox
        name="Zach Glabman"
        position="Natural Langauge Processing"
        schoolAndYear="Washington University, St. Louis, Sophomore"
      />
      <CompactTeamMemberBox
        name="Dabid Easton"
        position="Mobile App Developer"
        schoolAndYear="Washington University, St. Louis, Junior"
      />
      <CompactTeamMemberBox
        name="Ayush Khandelwal"
        position="Full Stack Developer"
        schoolAndYear="University of Massachusetts, Amherst, Junior"
      />

      <Text style={localStyles.sectionTitle}>Research Volunteers</Text>

      <CompactTeamMemberBox
        name="Veeraj Shah"
        position="Volunteer, Health Literacy"
        schoolAndYear="University of Maryland, Junior"
      />
      <CompactTeamMemberBox
        name="Saydi Akgul"
        position="Volunteer, Information Curator"
        schoolAndYear="Binghamton University, 2nd Year Masters"
      />
      <CompactTeamMemberBox
        name="Zahraa Tounsi"
        position="Volunteer, Information Curator"
        schoolAndYear="Binghamton University, Senior"
      />
      <CompactTeamMemberBox
        name="Victor Lopez-Carmen"
        position="Volunteer, Information Curator"
        schoolAndYear="Harvard Medical School, First Year"
      />
      <CompactTeamMemberBox
        name="Brendan Eappen"
        position="Volunteer, Information Curator"
        schoolAndYear="Harvard Medical School, First Year"
      />
      <CompactTeamMemberBox
        name="Ashwath Narayanan"
        position="Volunteer, Research Curator"
        schoolAndYear="George Washington University"
      />
      <CompactTeamMemberBox
        name="Dan Sudit"
        position="Volunteer, Research Curator"
        schoolAndYear="New York University"
      />
      <CompactTeamMemberBox
        name="Parth Devalia"
        position="Twitter Content Curator"
        schoolAndYear="University of Warwick"
      />
      <CompactTeamMemberBox
        name="Javier Suarez"
        position="Graphic Designer"
        schoolAndYear="Binghamton University Working Professional"
      />
      <CompactTeamMemberBox
        name="Gus Velasquez"
        position="Research"
        schoolAndYear="Harvard Medical School"
      />
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: defaults.headercolor,
    marginBottom: 10,
    marginTop: 20
  }
});
