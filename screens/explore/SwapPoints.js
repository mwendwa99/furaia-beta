import { View, Text, StyleSheet } from "react-native";

const SwapPoints = ({ navigate }) => {
  return (
    <View style={styles.container}>
      <Text>SwapPoints</Text>
    </View>
  );
};

export default SwapPoints;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
