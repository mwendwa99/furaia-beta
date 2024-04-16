import { View, Text, StyleSheet } from "react-native";

const StoryYangu = ({ navigate }) => {
  return (
    <View style={styles.container}>
      <Text>StoryYangu</Text>
    </View>
  );
};

export default StoryYangu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
