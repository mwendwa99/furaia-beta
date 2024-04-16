import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ListItem } from "../../components";

const ExploreLinks = [
  {
    title: "Reservation",
    iconLeft: "vector-square",
    iconRight: "arrow-right",
    url: "Reservation",
  },
  {
    title: "Swap Points",
    iconLeft: "recycle",
    iconRight: "arrow-right",
    url: "SwapPoints",
  },
  {
    title: "Story Yangu",
    iconLeft: "book-open-page-variant",
    iconRight: "arrow-right",
    url: "StoryYangu",
  },
];

const Explore = ({ navigation }) => {
  const listItems = ExploreLinks.map((link) => (
    <ListItem
      key={link.title}
      title={link.title}
      iconLeft={link.iconLeft}
      iconRight={link.iconRight}
      handlePressLink={() => navigation.navigate(link.url)}
    />
  ));
  return <SafeAreaView style={styles.container}>{listItems}</SafeAreaView>;
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 10,
  },
});
