import { StyleSheet } from "react-native";

export const defaults = {
  primarycolor: "#43a047",
  secondarycolor: "#a5d6a7",
  tertiarycolor: "#dcedc8",
  backgroundcolor: "#e2e2e2",
  borderRadius: 20,
  padding: 5
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaults.backgroundcolor
  },
  containerColumnCenter: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  containerRowCenter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  containerRowCenterShortWidth: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    width: "80%"
  },
  containerFull: {
    width: "100%",
    height: "100%"
  },
  divider: {
    height: 1,
    backgroundColor: "#e1e8ee",
    marginVertical: 10
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  boldPrimary: {
    color: defaults.primarycolor,
    fontWeight: "bold"
  },
  primaryText: {
    color: defaults.primarycolor
  },
  primaryTextBold: {
    color: defaults.primarycolor,
    fontWeight: "bold"
  },

  navButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderBottomColor: "#c8c7cc",
    borderBottomWidth: 0.5,
    borderTopColor: "#c8c7cc",
    borderTopWidth: 0.5,
    height: 78
  },
  navButtonTitle: {
    fontSize: 18,
    fontWeight: "400"
  },
  navButtonDescription: {
    color: "grey",
    marginTop: 4
  },
  actionButton: {
    backgroundColor: defaults.primarycolor,
    borderRadius: defaults.borderRadius,
    padding: 10,
    paddingBottom: 0,
    width: "45%",
    height: 40,
    margin: "1.75%"
  },
  actionButtonTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  infoViewOuterView: {
    width: "90%",
    backgroundColor: defaults.tertiarycolor,
    borderRadius: defaults.borderRadius,
    padding: 0,
    margin: 10
  },
  infoViewTitleView: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: defaults.borderRadius,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },
  infoViewBodyView: {
    margin: 10,
    flex: 1
  },
  surveyButton: {
    backgroundColor: defaults.primarycolor,
    borderRadius: 25,
    padding: 15,
    paddingBottom: 0,
    width: "85%",
    height: 50,
    margin: "1.75%",
    alignSelf: "center"
  },
  surveyButtonTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  textBox: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  linkButtonTitle: {
    color: defaults.primarycolor,
    fontSize: 16
  }
});
