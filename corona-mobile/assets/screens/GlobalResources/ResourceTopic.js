import React from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  ImageBackground,
} from "react-native";

import { useStyle } from "../../styles/styles";
import { ScrollView } from "react-native-gesture-handler";

export default function StyledResourceTopic(props) {
  const { styles } = useStyle("container");
  // console.log(props)
  return <ResourceTopic {...props} styles={styles} />;
}
class ResourceTopic extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log(this.props.route.params)
    console.log('asdf')
  }

  render(){
    return(
      <ScrollView>
        <ImageBackground
          source={this.props.route.params.source}
          style={[
            {
              width: 400,
              height: 400
            }
          ]}
        >
          <Text>
            {this.props.route.params.title}
          </Text>
        </ImageBackground>
        <View>
          {this.props.route.params.body}
        </View>
      </ScrollView>
    );
  }
}

const localStyles = StyleSheet.create({
  header: {
    padding: 0,
    marginBottom: 5,
    borderRadius: 50,
    borderBottomRightRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    padding: 10,
    paddingTop: 0,
    borderRadius: 5,
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
    borderRadius: 5
  }
});
