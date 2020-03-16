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
  const sites = [
    { title: "CNN", source: "https://www.cnn.com/search?size=10&q=coronavirus" },
    { title: "BBC", source: "https://www.cnn.com/search?size=10&q=coronavirus" },
    { title: "NYT", source: "https://www.cnn.com/search?size=10&q=coronavirus" },
    { title: "ALJAZEERA", source: "https://www.cnn.com/search?size=10&q=coronavirus" },
    { title: "REUTERS", source: "https://www.cnn.com/search?size=10&q=coronavirus" },
    { title: "CNBC", source: "https://www.cnn.com/search?size=10&q=coronavirus" },
    { title: "WHO", source: "https://www.cnn.com/search?size=10&q=coronavirus" },
    { title: "SKY", source: "https://www.cnn.com/search?size=10&q=coronavirus" },
  ]
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Latest News
        </Text>

        {sites.map(site => {
          return (<Button
            title={site.title}
            onPress={() => {
              navigation.navigate('NewsScreen', {
                site: site
              }
              );
            }}
          />);
        })}

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