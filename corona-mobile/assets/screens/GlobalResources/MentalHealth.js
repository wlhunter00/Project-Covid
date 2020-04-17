import React from "react";
import {
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useStyle } from "../../styles/styles";
import { ImageButton } from "../../components/Buttons";
import { StandardText } from "../../components/Texts";

const data = require("../../json/Mental-Health.json");

const images = {
  "mentalHealth/image1.jpg": require("../../images/mentalHealth/image1.jpg"),
  "mentalHealth/image2.jpg": require("../../images/mentalHealth/image2.jpg"),
}

export default function MentalHealth({navigation}) {
    const { styles, colors, isDark } = useStyle("container", "resourceText", "scrollViewContent");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <StandardText style={{ marginBottom: 20 }}>Tips for keeping up a healthy mindset.</StandardText>
        {
          data.map(item => (
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

