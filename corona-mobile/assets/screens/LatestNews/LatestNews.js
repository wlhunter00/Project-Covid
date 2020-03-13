import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default function LatestNews({ navigation }) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Latest News
        </Text>
        
        <Button 
          title="CNN" 
          onPress={() => {
            navigation.navigate('NewsScreen', {
                site: 'CNN'
              }
            );
          }}
        />

        <Button 
          title="BBC" 
          onPress={() => {
            navigation.navigate('NewsScreen', {
                site: 'BBC'
              }
            );
          }}
        />

        <Button 
          title="NYT" 
          onPress={() => {
            navigation.navigate('NewsScreen', {
                site: 'NYT'
              }
            );
          }}
        />

        <Button 
          title="ALJAZEERA" 
          onPress={() => {
            navigation.navigate('NewsScreen', {
                site: 'ALJAZEERA'
              }
            );
          }}
        />

        <Button 
          title="REUTERS" 
          onPress={() => {
            navigation.navigate('NewsScreen', {
                site: 'REUTERS'
              }
            );
          }}
        />

        <Button 
          title="CNBC" 
          onPress={() => {
            navigation.navigate('NewsScreen', {
                site: 'CNBC'
              }
            );
          }}
        />

        <Button 
          title="WHO" 
          onPress={() => {
            navigation.navigate('NewsScreen', {
                site: 'WHO'
              }
            );
          }}
        />

        <Button 
          title="SKY" 
          onPress={() => {
            navigation.navigate('NewsScreen', {
                site: 'SKY'
              }
            );
          }}
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