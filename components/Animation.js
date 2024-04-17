import { View } from "react-native";
import LottieView from "lottie-react-native";
import Text from "./Text";

export default function Animation({ animation, message }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView
        source={animation}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />
      <Text value={message} variant={"important"} color={"#002a0c"} />
    </View>
  );
}
