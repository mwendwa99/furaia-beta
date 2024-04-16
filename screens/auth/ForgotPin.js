import { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { Button, Input, Text } from "../../components";
import { forgotPin } from "../../redux/auth/authActions";
import { danger, success, warning } from "../../utils/toast";

const ForgotPin = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const { error, otp } = useSelector((state) => state.auth);

  console.log("ResetOTP:", otp);

  // useEffect(() => {
  //   if (otp && !isVerified) {
  //     success("Enter OTP", 2000);
  //     navigation.navigate("Otp", { mobile: phone, navigateTo: "ResetPin" });
  //   }
  // }, [isVerified, otp]);

  const onPhoneNumberChange = (value) => {
    setPhone(value);
  };

  const handleResetPin = () => {
    if (phone === "") {
      warning("Enter Phone Number!", 2000);
      return;
    }

    if (phone.length !== 10) {
      danger("Enter a valid phone number!", 2000);
      return;
    }

    if (error) {
      console.log("error in forgot screen", error);
      danger("error in server", 2000);
      return;
    }

    const mobile = {
      mobile: phone,
    };

    dispatch(forgotPin(mobile));

    if (otp && !error) {
      success("Enter OTP", 2000);
      navigation.navigate("Otp", { mobile: phone, navigateTo: "ResetPin" });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/FURAIA.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.section}>
        <Text value={"forgot password"} variant={"title"} color="#fafafa" />
        <View style={styles.row}>
          <Text variant={"input"} value="Enter Phone number" />
          <Input
            defaultValue="0712345678"
            onChange={onPhoneNumberChange}
            type={"numeric"}
            inputStyle={styles.input}
          />
          <Button onPress={handleResetPin} theme="light" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002a0c",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    height: 100,
  },
  section: {
    paddingHorizontal: 20,
    flex: 1,
  },
  row: {
    position: "relative",
    flexDirection: "column",
  },
  input: {
    color: "#000000",
  },
});
