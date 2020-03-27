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

export default function StyledResourceTopic() {
  const { styles } = useStyle("container");
  return <ResourceTopic styles={styles} />;
}
class ResourceTopic extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View></View>
    );
  }
}
