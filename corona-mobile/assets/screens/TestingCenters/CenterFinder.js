import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";

export default function Diagnosis({ route, navigation }) {
  const { locators } = route.params;

  return (
    <View>
      <Text>{route.params.state}</Text>
      <Text>{route.params.department}</Text>
      
      <TouchableOpacity 
        title='Call Center' 
        onPress={()=>{Linking.openURL('tel:' + route.params.tel)}}>
          <Text>Call</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        title='Website' 
        onPress={()=>{
          Linking.canOpenURL(route.params.url).then(
            canOpen => {
              if(canOpen){
                Linking.openURL(route.params.url);
              }
            }
          )}}>
          <Text>Website</Text>
      </TouchableOpacity>

    </View>
  );
}
