import { StyleSheet } from "react-native";
import { useColorScheme } from "react-native-appearance";

/** Hook to get style objects that take into account the device appearance (dark or light mode).
 *
 * @param {} keys an array containing what styles are needed.
 */
export const useStyle = (...keys) => {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const styles = {};
  keys.forEach(styleKey => {
    const defaultStyles = allStyles[styleKey];

    if (isDark && allStyles[styleKey + "Dark"]) {
      styles[styleKey] = { ...defaultStyles, ...allStyles[styleKey + "Dark"] };
    } else {
      styles[styleKey] = allStyles[styleKey];
    }
  });

  const colorsDynamic = isDark ? colorsDark : colors;

  return { styles, colors: colorsDynamic, isDark };
};

const colors = {
  primarycolor: "#43a047",
  secondarycolor: "#a5d6a7",
  tertiarycolor: "#dcedc8",
  backgroundcolor: "#d1dbd0",
  secondarybackgroundcolor: "white",
  tertiarybackgroundcolor: "white",
  headercolor: "#444",
  textcolor: "black",
  secondarytextcolor: "grey",
  accentcolor: "#c8c7cc"
};

const colorsDark = {
  primarycolor: "#43a047",
  secondarycolor: "#a5d6a7",
  tertiarycolor: "#dcedc8",
  backgroundcolor: "black",
  secondarybackgroundcolor: "#1C1C1E",
  tertiarybackgroundcolor: "#393933",
  headercolor: "#CCC",
  textcolor: "white",
  secondarytextcolor: "grey",
  accentcolor: "#28282A"
};

const allStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundcolor
  },
  containerDark: {
    backgroundColor: colorsDark.backgroundcolor
  },
  scrollViewContent: {
    paddingHorizontal: 15
  },
  containerRowCenter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  containerFull: {
    width: "100%",
    height: "100%"
  },
  divider: {
    height: 1,
    backgroundColor: "#e1e8ee"
  },
  dividerDark: {
    backgroundColor: colorsDark.accentcolor
  },
  homeScreenSection: {
    backgroundColor: colors.secondarybackgroundcolor,
    padding: 15,
    paddingBottom: 0,
    marginBottom: 15,
    borderColor: colors.accentcolor,
    borderWidth: 1,
  },
  shadow: {
    shadowColor: "rgba(67, 160, 71, 0.2)",
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    borderRadius: 5
  },
  homeScreenSectionDark: {
    backgroundColor: colorsDark.secondarybackgroundcolor,
    borderColor: colorsDark.accentcolor
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.headercolor,
    marginVertical: 10,
    textAlign: "center"
  },
  sectionTitleDark: {
    color: colorsDark.headercolor
  },
  normalText: {
    fontSize: 16,
    color: colors.textcolor,
  },
  normalTextDark: {
    color: colorsDark.textcolor
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondarybackgroundcolor,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.accentcolor,
    borderRadius: 5,
    minHeight: 78,
    shadowColor: "rgba(67, 160, 71, 0.2)",
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
  },
  embeddedNavButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    height: 78,
    
  },
  navButtonDark: {
    backgroundColor: colorsDark.secondarybackgroundcolor,
    borderColor: colorsDark.accentcolor,
  },
  navButtonTitle: {
    fontSize: 18,
    fontWeight: "400",
    color: colors.textcolor
  },
  navButtonTitleDark: {
    color: colorsDark.textcolor
  },
  navButtonDescription: {
    color: colors.secondarytextcolor,
    marginTop: 4
  },
  navButtonDescriptionDark: {
    color: colorsDark.secondarytextcolor
  },
  actionButton: {
    backgroundColor: colors.primarycolor,
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 16,
    alignItems: "center",
    marginVertical: 10
  },
  actionButtonTitle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  imageButtonHeader: {
    padding: 5,
    marginBottom: 5,
    borderRadius: 50,
    borderBottomRightRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  imageButtonText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    position: "relative",
    left: 9,
    textShadowColor: "black",
    textShadowRadius: 2
  },
  imageButtonImage: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    overflow: "hidden",
    resizeMode: "cover",
    borderRadius: 5
  },
  boldQuestionText: {
    color: colors.textcolor,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginHorizontal: 10
  },
  boldQuestionTextDark: {
    color: colorsDark.textcolor
  },
  surveyQuestionText: {
    color: colors.headercolor,
    fontSize: 16,
    marginHorizontal: 10
  },
  surveyQuestionTextDark: {
    color: colorsDark.headercolor
  },
  surveyQuestionTextUnderline: {
    color: colors.headercolor,
    fontSize: 16,
    marginVertical: 15,
    marginHorizontal: 10,
    textDecorationLine: "underline"
  },
  textBox: {
    fontSize: 16,
    borderWidth: 3,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 3,
    borderColor: colors.primarycolor,
    height: 40,
    shadowRadius: 2,
    elevation: 1,
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 15,
    padding: 10
  },
  textBoxDark: {
    color: colorsDark.textcolor
  },
  linkButtonTitle: {
    color: colors.primarycolor,
    fontSize: 16
  },
  boldPrimary: {
    color: colors.primarycolor,
    fontWeight: "bold"
  },
  underlineText: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "rgb(113, 113, 113)"
  },
  headerText: {
    fontSize: 16,
    color: colors.headercolor
  },
  headerTextBold: {
    color: colors.headercolor,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8
  },
  headerTextBoldDark: {
    color: colorsDark.headercolor
  },
  subtitle: {
    color: colors.headercolor,
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    marginHorizontal: 10
  },
  subtitleDark: {
    color: colorsDark.headercolor
  },
  // BOX STYLES
  boxContainer: {
    backgroundColor: colors.secondarybackgroundcolor,
    shadowColor: "rgba(67, 160, 71, 0.2)",
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15
  },
  boxContainerDark: {
    backgroundColor: colorsDark.secondarybackgroundcolor,
    borderColor: colorsDark.accentcolor,
    borderWidth: 1
  },
  sourcesBox: {
    backgroundColor: colors.tertiarycolor,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15
  },
  sourcesBoxDark: {
    backgroundColor: colorsDark.tertiarybackgroundcolor
  },
  profileImages: {
    height: 100,
    width: 66,
    resizeMode: "contain"
  },
  compactNameSmall: {
    fontSize: 18
  },
  compactNameSmallDark: {
    color: colorsDark.textcolor
  },
  positionText: {
    fontSize: 16,
    fontWeight: "700",
    color: "grey"
  },
  schoolText: {
    fontSize: 16,
    fontWeight: "500",
    color: "grey",
    flexShrink: 1
  },
  bioText: {
    color: "#000",
    fontSize: 16,
    color: "grey"
  },
  resourceText: {
    color: "#000",
    fontSize: 16,
    color: "grey",
    marginBottom: 10
  },
  tosText: {
    color: "#000",
    fontSize: 16,
    color: "grey",
    marginBottom: 20
  },
  tosBold: {
    color: "#000",
    fontSize: 16,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold"
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    flexShrink: 1
  },
  answerText: {
    fontSize: 16,
    color: "grey",
    marginTop: 10
  },
  expandableItem: {
    marginBottom: 8,
    padding: 15,
    backgroundColor: colors.secondarybackgroundcolor,
    shadowColor: "rgba(67, 160, 71, 0.2)",
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    borderRadius: 5
  },
  expandableItemDark: {
    backgroundColor: colorsDark.secondarybackgroundcolor,
    borderBottomColor: colorsDark.accentcolor,
    borderBottomWidth: 1,
    borderTopColor: colorsDark.accentcolor,
    borderTopWidth: 1
  }
});
