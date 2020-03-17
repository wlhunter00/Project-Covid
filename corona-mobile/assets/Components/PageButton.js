import * as React from "react";
import {
  Text,
  View,
  TouchableHighlight
} from "react-native";
import {
  Entypo
} from "@expo/vector-icons";
import { styles } from './../styles/styles';

export function PageButton({ navigation, title, navigationName, icon, description }) {
    return (
      <TouchableHighlight
        onPress={() => {
          navigation.navigate(navigationName);
        }}
      >
        <View style={styles.pageButton}>
          {icon}
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.pageButtonTitle}>{title}</Text>
            <Text style={styles.pageButtonDescription}>{description}</Text>
          </View>
          <View style={{ flex: 1 }} />
          <Entypo name="chevron-thin-right" />
        </View>
      </TouchableHighlight>
    );
  }