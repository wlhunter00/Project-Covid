import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import { ActionButton } from '../../components/Buttons';
import { styles } from "../../styles/styles";
import { WebView } from 'react-native-webview';

export default function Diagnosis({ route, navigation }) {
  const { locators } = route.params;

  const call = ()=>{Linking.openURL('tel:' + route.params.tel)};

  const openUrl = ()=>{
    Linking.canOpenURL(route.params.url).then(
      canOpen => {
        if(canOpen){
          Linking.openURL(route.params.url);
        }
      }
    )};

  return (
    <View style={styles.containerFull}>
      <Text>{route.params.state}</Text>

      <Text>{route.params.department}</Text>
      <View style={styles.container}>
        <ActionButton title='Call Center' action={call}/>

        {/* <ActionButton title='Website' action={openUrl}/> */}

        <WebView
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          source={{
            uri: route.params.url
          }}
          style={styles.webView}
        />
      </View>
    </View>
  );
}
