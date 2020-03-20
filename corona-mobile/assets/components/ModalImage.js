import React from "react";
import { AccordionList } from "accordion-collapse-react-native";
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet
} from "react-native";

import Modal from 'react-native-modal';
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";


export class ModalImage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isVisible: false,
      scrollOffset: 0
    }
    this.scrollRef = React.createRef();
  }

  _head = item => {
    const dimensions = Dimensions.get("window");
    const imageHeight = Math.round((dimensions.width * 3) / 4);
    const imageWidth = dimensions.width;
    return (
      <View style={styles.header}>
        <ImageBackground
          source={item.image}
          style={[
            {
              width: imageWidth * 0.9,
              height: imageHeight
            },
            styles.headerImage
          ]}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={[{ top: imageHeight - 37 }, styles.headerText]}
          >
            {item.title}
          </Text>
        </ImageBackground>
      </View>
    );
  };

  _body = item => {
    const dimensions = Dimensions.get("window");
    const imageWidth = dimensions.width;
    const bulletPoints = item.body.map((text, i) => (
      <Text key={i} style={{ marginBottom: 5 }}>{text}</Text>
    ));
    return (
      <View style={styles.content}>
        {this._head(item)}
        {bulletPoints}
      </View>
      
    );
  };

  ToggleModalOff = () => {
    this.setState({isVisible: false})
  }

  ToggleModalOn = () => {
    this.setState({isVisible: true})
  }

  handleOnScroll = event => {
    this.setState({scrollOffset: event.nativeEvent.contentOffset.y});
    console.log(this.state.scrollOffset)
  }

  handleScrollTo = p => {
    if(this.scrollRef.current) {
      this.scrollRef.current.scrollTo(p);
    }
  }

  render(){
    return(
      <View>
        <TouchableWithoutFeedback onPress={this.ToggleModalOn}>
          {this._head(this.props.item)}
        </TouchableWithoutFeedback>
        <Modal 
          isVisible={this.state.isVisible} 
          propagateSwipe={true}
          onBackdropPress={this.ToggleModalOff}
          onSwipeComplete={this.ToggleModalOff}
          // swipeDirection={['left']}
          scrollTo={this.handleScrollTo}
          scrollOffset={this.state.scrollOffset}
          // scrollOffsetMax={300}
          // style={{flex:1}}
        >
          <View style={{flex: 1}}>
            <ScrollView 
              ref={this.scrollRef}
              onScroll={this.handleOnScroll}
              scrollEventThrottle={8}
              nestedScrollEnabled={true}
            >
              <View>
                <TouchableWithoutFeedback 
                  onPress={this.ToggleModalOff}
                >
                  {this._body(this.props.item)}
                </TouchableWithoutFeedback>
              </View>
            </ScrollView>
          </View>
          
        </Modal>
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
