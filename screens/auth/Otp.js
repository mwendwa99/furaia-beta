import { useState, useEffect } from "react";
import { View, StyleSheet, Image, Pressable, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Button, Input, Text } from "../../components";
import { getUser, requestOtp, verifyOtp } from "../../redux/auth/authActions";
import { danger, success, warning } from "../../utils/toast";

const Otp = ({ route, navigation }) => {
  const mobile = route?.params?.mobile || "";
  const navigateTo = route?.params?.navigateTo || "";
  const { otp, error, isVerified } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [userOtp, setUserOtp] = useState("");
  // console.log("navigateTo", navigateTo);

  useEffect(() => {
    if (isVerified) {
      success("OTP Verified", 2000);
      alert("OTP Verified");
      console.log("otp verified");
      navigation.navigate(navigateTo, { mobile: mobile });
    }
  }, [isVerified]);

  console.log("OTP:", otp);

  if (error) {
    danger("error", 2000);
  }

  const onChangeOtp = (value) => {
    setUserOtp(value);
  };

  const handleVerifyOtp = () => {
    if (userOtp === "") {
      warning("Enter OTP!", 2000);
      alert("Enter OTP");
      console.log("enter otp");
      return;
    }

    if (userOtp.length !== 6) {
      warning("OTP should be 6 numbers", 2000);
      alert("OTP should be 6 numbers");
      console.log("otp should be 6 numbers");
      return;
    }

    if (userOtp.toString() !== otp.toString()) {
      warning("Invalid OTP!", 2000);
      alert("Invalid OTP");
      console.log("userOtp", userOtp);
      console.log("otp", otp);
      console.log("invalid otp");
      return;
    }

    const otpData = { otp: userOtp };
    dispatch(verifyOtp(otpData));
  };

  const handleRequestOtp = () => {
    warning("Please wait", 2000);
    dispatch(requestOtp({ mobile: mobile }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/FURAIA.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.section}>
          <Text value="Enter otp" variant="title" />
          <View style={styles.row}>
            <Input
              type="numeric"
              defaultValue="123456"
              onChange={onChangeOtp}
            />
            <Pressable onPress={handleRequestOtp}>
              <Text variant="input" value="Resend OTP" />
            </Pressable>
          </View>
        </View>
        <Button onPress={handleVerifyOtp} theme="light" />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Otp;

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
    flex: 1,
  },
  input: {
    color: "#000000",
  },
});
