import React from "react";
import {
  View,
} from "react-native";

// import Modal from 'react-native-modal';
import { Modalize } from 'react-native-modalize';
import { TouchableWithoutFeedback, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

export class Modal extends React.Component{

  constructor(props){
    super(props);
    this.modalRef = React.createRef();
  }

  render(){
    return(
      <Modalize ref={this.modalRef} alwaysOpen={tru}>
        <View style={{width: 500, height: 500}}>

        </View>
      </Modalize>
    );
  }
}