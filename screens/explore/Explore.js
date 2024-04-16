import React from "react";
import { StyleSheet, View } from "react-native";

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
  return <View style={styles.container}>{listItems}</View>;
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
});
