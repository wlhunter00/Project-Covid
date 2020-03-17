import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5FCFF"
    },
    title: {
      fontSize: 20,
      textAlign: "center",
      margin: 10
    },
    pageButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
      padding: 15,
      borderBottomColor: "#c8c7cc",
      borderBottomWidth: 0.5
    },
    pageButtonTitle: {
      fontSize: 18,
      fontWeight: "400"
    },
    pageButtonDescription: {
      color: "grey",
      marginTop: 4
    }
  });