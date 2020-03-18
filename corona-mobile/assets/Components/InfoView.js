import * as React from "react";
import { Text, View, TouchableHighlight, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles, defaults } from "../styles/styles";

export function InfoView({
  title,
  body,
  chevron
}) {
  return (
    <View style={styles.infoViewOuterView}>
      <View style={styles.infoViewTitleView}>
        <Text style={styles.boldPrimary}>{title}</Text>
        {chevron
          ? <Entypo name='chevron-thin-right' style={styles.boldPrimary}/>
          : <View/>
        }
      </View>
      <View style={styles.infoViewBodyView}>
        {body}
      </View>
    </View>
  );
}

// const phs = StyleSheet.create({
//   infoViewOuterView: {
//     width: '80%',
//     backgroundColor: defaults.tertiarycolor,
//     borderRadius: defaults.borderRadius,
//     padding: 0
//   },
//   infoViewTitleView: {
//     width: '100%',
//     backgroundColor: '#fff',
//     borderRadius: defaults.borderRadius,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10
//   },
//   infoViewBodyView: {
//     margin: 10,
//     height: 100
//   },
//   boldPrimary: {
//     color: defaults.primarycolor, 
//     fontWeight: 'bold'
//   }
// })

