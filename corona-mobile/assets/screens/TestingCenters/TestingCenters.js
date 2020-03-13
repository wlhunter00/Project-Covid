import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default function TestingCenters({ navigation }) {
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Testing Centers
        </Text>

        <Button
          title="Find Center"
          onPress={() =>
            navigation.push('CenterFinder', {
              
            })
          }
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});



