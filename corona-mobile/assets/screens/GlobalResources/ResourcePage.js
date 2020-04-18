import React, { useEffect } from "react";
import {
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useStyle } from "../../styles/styles";
import { ImageButton } from "../../components/Buttons";
import { StandardText } from "../../components/Texts";

export const ResourceNames = {
    informationalToolkit: "informationalToolkit",
    mentalHealth: "mentalHealth",
    preventativePractices: "preventativePractices",
    studentResources: "preventativePractices"
}

const resources = {
    informationalToolkit: require("../../json/Informational-Toolkit.json"),
    mentalHealth: require("../../json/Mental-Health.json"),
    preventativePractices: require("../../json/Preventative-Practices.json"),
    studentResources: require("../../json/Student-Resources.json"),
};

const images = {
  "informationalToolkit/image1.jpg": require("../../images/informationalToolkit/image1.jpg"),
  "informationalToolkit/image2.jpg": require("../../images/informationalToolkit/image2.jpg"),
  "informationalToolkit/image3.jpg": require("../../images/informationalToolkit/image3.jpg"),
  "informationalToolkit/image4.jpg": require("../../images/informationalToolkit/image4.jpg"),
  "mentalHealth/image1.jpg": require("../../images/mentalHealth/image1.jpg"),
  "mentalHealth/image2.jpg": require("../../images/mentalHealth/image2.jpg"),
  "preventativePractice/handwash.png": require("../../images/preventativePractice/handwash.png"),
  "preventativePractice/image3.gif": require("../../images/preventativePractice/image3.gif"),
  "preventativePractice/image2.jpg": require("../../images/preventativePractice/image2.jpg"),
  "preventativePractice/image4.jpg": require("../../images/preventativePractice/image4.jpg"),
  "preventativePractice/image5C.jpg": require("../../images/preventativePractice/image5C.jpg"),
  "preventativePractice/image6.jpg": require("../../images/preventativePractice/image6.jpg"),
  "studentResources/image1.jpg": require("../../images/studentResources/image1.jpg"),
  "studentResources/image2.jpg": require("../../images/studentResources/image2.jpg"),
};

export default function ResourcePage({ navigation, route }) {
    const { styles, colors, isDark } = useStyle("container", "resourceText", "scrollViewContent");

    const { resourceName } = route.params;
    const resource = resources[resourceName];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <StandardText style={{ marginBottom: 20 }}>{resource.description}</StandardText>
        {
          resource.data.map(item => (
            <ImageButton
              title={item.title}
              image={images[item.image]}
              body={{ content: item.content, sources: item.sources }}
              navigation={navigation}
            />
          ))
        }
      </ScrollView>
    </View>
  );
}

