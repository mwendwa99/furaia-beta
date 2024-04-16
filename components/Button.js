import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import Svg, { Path, SvgXml } from "react-native-svg";

const CustomIconButton = ({ onPress, theme }) => {
  const buttonColor = theme === "dark" ? "#002A0C" : "#fff";

  const svgXmlData = `
    <svg width="83" height="90" viewBox="0 0 83 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M36.256 1.27166C39.2886 -0.423888 42.9838 -0.423886 46.0164 1.27166L77.1526 18.6805C80.3139 20.4481 82.2724 23.7869 82.2724 27.4088V61.6773C82.2724 65.2993 80.3139 68.6381 77.1526 70.4057L46.0164 87.8145C42.9838 89.51 39.2886 89.51 36.256 87.8145L5.11982 70.4057C1.95847 68.6381 0 65.2993 0 61.6773V27.4088C0 23.7869 1.95847 20.448 5.11983 18.6805L36.256 1.27166Z" fill="${buttonColor}"/>
      <path d="M28.6362 43.0431C27.8078 43.0431 27.1362 43.7147 27.1362 44.5431C27.1362 45.3715 27.8078 46.0431 28.6362 46.0431L28.6362 43.0431ZM51.6969 45.6038C52.2827 45.018 52.2827 44.0682 51.6969 43.4824L42.1509 33.9365C41.5652 33.3507 40.6154 33.3507 40.0296 33.9365C39.4438 34.5223 39.4438 35.472 40.0296 36.0578L48.5149 44.5431L40.0296 53.0284C39.4438 53.6142 39.4438 54.5639 40.0296 55.1497C40.6154 55.7355 41.5652 55.7355 42.151 55.1497L51.6969 45.6038ZM28.6362 46.0431L50.6362 46.0431L50.6362 43.0431L28.6362 43.0431L28.6362 46.0431Z" fill="#22F029"/>
    </svg>
  `;

  return (
    <View style={styles.iconButtonContainer}>
      <IconButton
        icon={() => <SvgXml xml={svgXmlData} width={"100%"} height={"100%"} />}
        size={100}
        onPress={onPress}
        style={styles.iconButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconButtonContainer: {
    alignSelf: "center",
  },
  iconButton: {
    backgroundColor: "transparent",
  },
});

export default CustomIconButton;
